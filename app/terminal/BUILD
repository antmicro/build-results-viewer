load("@npm_bazel_typescript//:index.bzl", "ts_library")

package(default_visibility = ["//visibility:public"])

ts_library(
    name = "terminal",
    srcs = glob(["*.tsx"]),
    deps = [
        "//proto:app_config_ts_proto",
        "@npm//protobufjs",
        "@npm//@types/react",
        "@npm//@types/react-lazylog",
        "@npm//@types/react-virtualized",
        "@npm//react",
        "@npm//react-lazylog",
        "@npm//react-virtualized",
    ],
)
