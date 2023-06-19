# Build Results Viewer

This repository contains the code of an application for storing and viewing structured build data uploaded using [Build Event Protocol](https://bazel.build/remote/bep).
It can be used in conjunction with any BES-capable client, e.g. [Bazel](https://bazel.build/) or [distant-bes](https://github.com/antmicro/distant-bes).

The codebase is derived from [BuildBuddy](https://github.com/buildbuddy-io/buildbuddy).

## Running the application

In order to run the application, please make sure that [Bazel](http://bazel.build/) is installed and run the following command: `bazel run -c opt server:buildbuddy`.
By default, the application uses `config/buildbuddy.local.yaml` file as configuration.
