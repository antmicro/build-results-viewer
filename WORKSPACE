#gazelle:repository_macro deps.bzl%install_buildbuddy_dependencies
workspace(
    name = "buildbuddy",
    managed_directories = {"@npm": ["node_modules"]},
)

load("@bazel_tools//tools/build_defs/repo:http.bzl", "http_archive")

# Go

http_archive(
    name = "io_bazel_rules_go",
    sha256 = "e6a6c016b0663e06fa5fccf1cd8152eab8aa8180c583ec20c872f4f9953a7ac5",
    urls = [
        "https://mirror.bazel.build/github.com/bazelbuild/rules_go/releases/download/v0.22.1/rules_go-v0.22.1.tar.gz",
        "https://github.com/bazelbuild/rules_go/releases/download/v0.22.1/rules_go-v0.22.1.tar.gz",
    ],
)

http_archive(
    name = "bazel_gazelle",
    sha256 = "86c6d481b3f7aedc1d60c1c211c6f76da282ae197c3b3160f54bd3a8f847896f",
    urls = [
        "https://github.com/bazelbuild/bazel-gazelle/releases/download/v0.19.1/bazel-gazelle-v0.19.1.tar.gz",
    ],
)

load("@io_bazel_rules_go//go:deps.bzl", "go_register_toolchains", "go_rules_dependencies")

go_rules_dependencies()

go_register_toolchains()

load("@bazel_gazelle//:deps.bzl", "gazelle_dependencies", "go_repository")

gazelle_dependencies()

# Node

http_archive(
    name = "build_bazel_rules_nodejs",
    sha256 = "9473b207f1c5a61b603442cbfeeea8aaf2aa62870673fce2a1c52087f6ff4dc9",
    urls = ["https://github.com/bazelbuild/rules_nodejs/releases/download/1.2.4/rules_nodejs-1.2.4.tar.gz"],
)

load("@build_bazel_rules_nodejs//:index.bzl", "yarn_install")

yarn_install(
    name = "npm",
    package_json = "//:package.json",
    yarn_lock = "//:yarn.lock",
)

load("@npm//:install_bazel_dependencies.bzl", "install_bazel_dependencies")

install_bazel_dependencies()

# Typescript

load("@npm_bazel_typescript//:index.bzl", "ts_setup_workspace")

ts_setup_workspace()

# Docker

http_archive(
    name = "io_bazel_rules_docker",
    sha256 = "b1e80761a8a8243d03ebca8845e9cc1ba6c82ce7c5179ce2b295cd36f7e394bf",
    urls = ["https://github.com/bazelbuild/rules_docker/releases/download/v0.25.0/rules_docker-v0.25.0.tar.gz"],
)

load(
    "@io_bazel_rules_docker//toolchains/docker:toolchain.bzl",
    docker_toolchain_configure = "toolchain_configure",
)

docker_toolchain_configure(
    name = "docker_config",
)

load(
    "@io_bazel_rules_docker//repositories:repositories.bzl",
    container_repositories = "repositories",
)

container_repositories()

load(
    "@io_bazel_rules_docker//go:image.bzl",
    _go_image_repos = "repositories",
)

_go_image_repos()

# Kubernetes

http_archive(
    name = "io_bazel_rules_k8s",
    sha256 = "cc75cf0d86312e1327d226e980efd3599704e01099b58b3c2fc4efe5e321fcd9",
    strip_prefix = "rules_k8s-0.3.1",
    urls = ["https://github.com/bazelbuild/rules_k8s/releases/download/v0.3.1/rules_k8s-v0.3.1.tar.gz"],
)

load("@io_bazel_rules_k8s//k8s:k8s.bzl", "k8s_repositories")

k8s_repositories()

load("@io_bazel_rules_k8s//k8s:k8s_go_deps.bzl", k8s_go_deps = "deps")

k8s_go_deps()

load("@io_bazel_rules_k8s//k8s:k8s.bzl", "k8s_defaults")

k8s_defaults(
    name = "k8s_deploy",
    kind = "deployment",
)

# Proto

# NB: The name must be "com_google_protobuf".
http_archive(
    name = "com_google_protobuf",
    sha256 = "1672819a0baf3c57e2ab96bc7cd9935f8b58c0172317c44aa44722d4b1b30f8b",
    strip_prefix = "protobuf-3.11.2",
    urls = ["https://github.com/protocolbuffers/protobuf/releases/download/v3.11.2/protobuf-all-3.11.2.zip"],
)

load("@com_google_protobuf//:protobuf_deps.bzl", "protobuf_deps")

protobuf_deps()

load(":deps.bzl", "install_buildbuddy_dependencies")

install_buildbuddy_dependencies()
