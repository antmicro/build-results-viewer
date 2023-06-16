package static

import (
	"net/http"
	"path/filepath"
	"strings"

	"github.com/bazelbuild/rules_go/go/tools/bazel"
)

const NotFoundPath = "/results/invocations/404"

type interceptResponseWriter struct {
	http.ResponseWriter
	statusCode int
	skipCode   int
}

func newInterceptResponseWriter(w http.ResponseWriter, skipCode int) *interceptResponseWriter {
	return &interceptResponseWriter{w, http.StatusOK, skipCode}
}

func (irw *interceptResponseWriter) Write(b []byte) (int, error) {
	if irw.statusCode != irw.skipCode {
		return irw.ResponseWriter.Write(b)
	}
	return 0, nil
}

func (irw *interceptResponseWriter) WriteHeader(code int) {
	irw.statusCode = code

	if code != irw.skipCode {
		irw.ResponseWriter.WriteHeader(code)
	}
}

// StaticFileServer implements a static file http server that serves static
// files out of the runfiles bundled with this application.
type StaticFileServer struct {
	handler http.Handler
}

// NewStaticFileServer returns a new static file server that will serve the
// content in relpath, optionally stripping the prefix.
func NewStaticFileServer(relPath string, rootPaths []string) (*StaticFileServer, error) {
	// Figure out where our runfiles (static content bundled with the binary) live.
	rfp, err := bazel.RunfilesPath()
	if err != nil {
		return nil, err
	}
	// Handle "/static/*" requests by serving those static files out of the bundled runfiles.
	pkgStaticDir := filepath.Join(rfp, relPath)
	handler := wrapHandler(http.FileServer(http.Dir(pkgStaticDir)))
	if len(rootPaths) > 0 {
		handler = handleRootPaths(rootPaths, handler)
	}
	return &StaticFileServer{
		handler: handler,
	}, nil
}

// ServeHTTP implements the HTTP HandlerFunc interface.
func (s *StaticFileServer) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	s.handler.ServeHTTP(w, r)
}

func wrapHandler(wrappedHandler http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		irw := newInterceptResponseWriter(w, 404)
		wrappedHandler.ServeHTTP(irw, r)
		if irw.statusCode == irw.skipCode {
			http.Redirect(irw, r, NotFoundPath, 301)
		}
	})
}

func handleRootPaths(rootPaths []string, h http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		// Forbid direct requests to index.html
		if r.URL.Path == "/" {
			r.URL.Path = NotFoundPath
		}

		for _, rootPath := range rootPaths {
			if strings.HasPrefix(r.URL.Path, rootPath) {
				r.URL.Path = "/"
			}
		}

		h.ServeHTTP(w, r)
	})
}
