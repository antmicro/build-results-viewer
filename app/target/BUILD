load("@npm_bazel_typescript//:index.bzl", "ts_library")

package(default_visibility = ["//visibility:public"])

ts_library(
    name = "target",
    srcs = glob(["**/*.tsx"]),
    deps = [
        "//app/auth",
        "//app/format",
        "//app/router",
        "//proto:build_event_stream_ts_proto",
        "//proto:invocation_ts_proto",
        "@npm//@types/react",
        "@npm//react",
    ],
)
