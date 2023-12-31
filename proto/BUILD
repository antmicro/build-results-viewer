load("@io_bazel_rules_go//go:def.bzl", "go_library")
load("@io_bazel_rules_go//proto:def.bzl", "go_grpc_library", "go_proto_library")
load("//rules:typescript_proto_library.bzl", "ts_proto_library")

package(default_visibility = ["//visibility:public"])

proto_library(
    name = "build_status_proto",
    srcs = [
        "build_status.proto",
    ],
    deps = [
        "@com_google_protobuf//:any_proto",
    ],
)

proto_library(
    name = "build_events_proto",
    srcs = [
        "build_events.proto",
    ],
    deps = [
        ":build_status_proto",
        "@com_google_protobuf//:any_proto",
        "@com_google_protobuf//:timestamp_proto",
    ],
)

proto_library(
    name = "publish_build_event_proto",
    srcs = [
        "publish_build_event.proto",
    ],
    deps = [
        ":build_events_proto",
        "@com_google_protobuf//:duration_proto",
        "@com_google_protobuf//:empty_proto",
        "@go_googleapis//google/api:annotations_proto",
    ],
)

proto_library(
    name = "build_event_stream_proto",
    srcs = ["build_event_stream.proto"],
    deps = [
        ":command_line_proto",
        ":invocation_policy_proto",
    ],
)

proto_library(
    name = "invocation_policy_proto",
    srcs = ["invocation_policy.proto"],
)

proto_library(
    name = "command_line_proto",
    srcs = ["command_line.proto"],
    deps = [
        ":option_filters_proto",
    ],
)

go_proto_library(
    name = "build_status_go_proto",
    importpath = "proto/build_status",
    proto = ":build_status_proto",
)

go_proto_library(
    name = "build_events_go_proto",
    importpath = "proto/build_events",
    proto = ":build_events_proto",
    deps = [
        ":build_status_go_proto",
    ],
)

proto_library(
    name = "option_filters_proto",
    srcs = ["option_filters.proto"],
)

proto_library(
    name = "invocation_proto",
    srcs = ["invocation.proto"],
    deps = [
        ":build_event_stream_proto",
        ":command_line_proto",
        ":context_proto",
        "@com_google_protobuf//:timestamp_proto",
    ],
)

proto_library(
    name = "user_proto",
    srcs = [
        "user.proto",
        "user_id.proto",
    ],
    deps = [
        ":group_proto",
    ],
)

proto_library(
    name = "group_proto",
    srcs = [
        "grp.proto",
    ],
    deps = [],
)

proto_library(
    name = "context_proto",
    srcs = ["context.proto"],
    deps = [
        "user_proto",
    ],
)

proto_library(
    name = "buildbuddy_service_proto",
    srcs = ["buildbuddy_service.proto"],
    deps = [
        ":bazel_config_proto",
        ":invocation_proto",
        ":user_proto",
        ":app_config_proto",
    ],
)

proto_library(
    name = "semver_proto",
    srcs = ["semver.proto"],
)

proto_library(
    name = "remote_execution_proto",
    srcs = ["remote_execution.proto"],
    deps = [
        ":semver_proto",
        "@com_google_protobuf//:duration_proto",
        "@com_google_protobuf//:timestamp_proto",
        "@go_googleapis//google/api:annotations_proto",
        "@go_googleapis//google/longrunning:longrunning_proto",
        "@go_googleapis//google/rpc:status_proto",
    ],
)

proto_library(
    name = "bazel_config_proto",
    srcs = ["bazel_config.proto"],
    deps = [
        ":context_proto",
    ],
)

proto_library(
    name = "app_config_proto",
    srcs = ["app_config.proto"],
)

# Go proto rules below here

go_grpc_library(
    name = "publish_build_event_go_proto",
    importpath = "proto/publish_build_event",
    proto = ":publish_build_event_proto",
    deps = [
        ":build_events_go_proto",
        "@go_googleapis//google/api:annotations_go_proto",
    ],
)

go_proto_library(
    name = "build_event_stream_go_proto",
    importpath = "proto/build_event_stream",
    proto = ":build_event_stream_proto",
    deps = [
        ":command_line_go_proto",
        ":invocation_policy_go_proto",
    ],
)

go_proto_library(
    name = "invocation_policy_go_proto",
    importpath = "proto/blaze.invocation_policy",
    proto = ":invocation_policy_proto",
)

go_proto_library(
    name = "command_line_go_proto",
    importpath = "proto/command_line",
    proto = ":command_line_proto",
    deps = [
        ":option_filters_go_proto",
    ],
)

go_proto_library(
    name = "option_filters_go_proto",
    importpath = "proto/options",
    proto = ":option_filters_proto",
)

go_proto_library(
    name = "invocation_go_proto",
    importpath = "proto/invocation",
    proto = ":invocation_proto",
    deps = [
        ":build_event_stream_go_proto",
        ":command_line_go_proto",
        ":context_go_proto",
    ],
)

go_grpc_library(
    name = "buildbuddy_service_go_proto",
    importpath = "proto/buildbuddy_service",
    proto = ":buildbuddy_service_proto",
    deps = [
        ":bazel_config_go_proto",
        ":invocation_go_proto",
        ":user_go_proto",
        ":app_config_go_proto",
    ],
)

go_proto_library(
    name = "semver_go_proto",
    importpath = "proto/semver",
    proto = ":semver_proto",
)

go_proto_library(
    name = "user_go_proto",
    importpath = "proto/user",
    proto = ":user_proto",
    deps = [
        ":group_go_proto",
    ],
)

go_proto_library(
    name = "group_go_proto",
    importpath = "proto/group",
    proto = ":group_proto",
)

go_proto_library(
    name = "context_go_proto",
    importpath = "proto/context",
    proto = ":context_proto",
    deps = [
        ":user_go_proto",
    ],
)

go_proto_library(
    name = "bazel_config_go_proto",
    importpath = "proto/bazel_config",
    proto = ":bazel_config_proto",
    deps = [
        ":context_go_proto",
    ],
)

go_grpc_library(
    name = "remote_execution_go_proto",
    importpath = "proto/remote_execution",
    proto = ":remote_execution_proto",
    deps = [
        ":semver_go_proto",
        "@go_googleapis//google/api:annotations_go_proto",
        "@go_googleapis//google/longrunning:longrunning_go_proto",
        "@go_googleapis//google/rpc:status_go_proto",
    ],
)

go_proto_library(
    name = "app_config_go_proto",
    importpath = "proto/app_config",
    proto = ":app_config_proto",
)

# TypeScript proto rules below here

ts_proto_library(
    name = "bazel_config_ts_proto",
    deps = [":bazel_config_proto"],
)

ts_proto_library(
    name = "build_event_stream_ts_proto",
    deps = [":build_event_stream_proto"],
)

ts_proto_library(
    name = "command_line_ts_proto",
    deps = [":command_line_proto"],
)

ts_proto_library(
    name = "context_ts_proto",
    deps = [":context_proto"],
)

ts_proto_library(
    name = "invocation_ts_proto",
    deps = [":invocation_proto"],
)

ts_proto_library(
    name = "group_ts_proto",
    deps = [":group_proto"],
)

ts_proto_library(
    name = "user_ts_proto",
    deps = [":user_proto"],
)

ts_proto_library(
    name = "buildbuddy_service_ts_proto",
    deps = [":buildbuddy_service_proto"],
)

ts_proto_library(
    name = "app_config_ts_proto",
    deps = [":app_config_proto"],
)
