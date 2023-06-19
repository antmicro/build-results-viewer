import React from 'react';
import format from '../format/format'
import CacheCodeComponent from '../docs/cache_code'

import { invocation } from '../../proto/invocation_ts_proto';
import { build_event_stream } from '../../proto/build_event_stream_ts_proto';


interface Props {
  testResult: invocation.InvocationEvent,
}

interface State {
  testLog: string;
  cacheEnabled: boolean;
}

export default class TargetTestResultCardComponent extends React.Component {
  props: Props;

  state: State = {
    testLog: '',
    cacheEnabled: true
  }

  componentDidMount() {
    this.fetchTestLog();
  }

  componentDidUpdate(prevProps: Props) {
    if (this.props.testResult !== prevProps.testResult) {
      this.fetchTestLog();
    }
  }

  fetchTestLog() {
    let testLogUrl = this.props.testResult.buildEvent.testResult.testActionOutput.find((log: any) => log.name == "test.log")?.uri;

    if (!testLogUrl) {
      return;
    }

    if (!testLogUrl.startsWith("bytestream://")) {
      this.setState({ ...this.state, cacheEnabled: false });
      return;
    }

    if (this.state.testLog) {
      // Already fetched
      return;
    }

    var request = new XMLHttpRequest();
    request.open('GET', "/results/file/download?filename=test.log&bytestream_url=" + encodeURIComponent(testLogUrl), true);

    let card = this;
    request.onload = function () {
      if (this.status >= 200 && this.status < 400) {
        card.setState({...card.state, testLog: this.response});
      } else {
        card.setState({...card.state, testLog: "Error loading bytestream test log!"});
      }
    };

    request.onerror = function () {
      card.setState({...card.state, testLog: "Error loading bytestream test log!"});
    };

    request.send();
  }

  handleArtifactClicked() {
    let testLogUrl = this.props.testResult.buildEvent.testResult.testActionOutput.find((log: any) => log.name == "test.log")?.uri;

    if (testLogUrl.startsWith("file://")) {
      window.prompt("Copy artifact path to clipboard: Cmd+C, Enter", testLogUrl);
    } else if (testLogUrl.startsWith("bytestream://")) {
       let downloadUri = "/results/file/download?" + "filename=test.log&bytestream_url=" + testLogUrl;
       window.open(downloadUri);
    }
  }

  getStatusTitle(status: build_event_stream.TestStatus) {
    switch (status) {
      case build_event_stream.TestStatus.PASSED:
        return "Passed";
      case build_event_stream.TestStatus.FLAKY:
        return "Failed (non-critical)";
      case build_event_stream.TestStatus.TIMEOUT:
        return "Timeout";
      case build_event_stream.TestStatus.FAILED:
        return "Failed";
      case build_event_stream.TestStatus.INCOMPLETE:
        return "Incomplete";
      case build_event_stream.TestStatus.REMOTE_FAILURE:
        return "Remote failure";
      case build_event_stream.TestStatus.FAILED_TO_BUILD:
        return "Failed to build";
      case build_event_stream.TestStatus.TOOL_HALTED_BEFORE_TESTING:
        return "Halted before testing";
      default:
        return "Skipped";
    }
  }

  getStatusClass(status: build_event_stream.TestStatus) {
    switch (status) {
      case build_event_stream.TestStatus.PASSED:
        return "card-success";
      case build_event_stream.TestStatus.FLAKY:
        return "card-non-critical";
      case build_event_stream.TestStatus.NO_STATUS:
        return "card-skipped";
      default:
      return "card-failure";
    }
  }

  render() {
    return <div className={`card artifacts ${this.getStatusClass(this.props.testResult.buildEvent.testResult.status)}`}>
      <img className="icon" src="/results/image/log-circle.svg" />
      <div className="content">
        <div className="title">Test log</div>
        <div className="test-subtitle">{this.getStatusTitle(this.props.testResult.buildEvent.testResult.status)} in {format.durationMillis(this.props.testResult.buildEvent.testResult.testAttemptDurationMillis)} on Shard {this.props.testResult.buildEvent.id.testResult.shard} (Run {this.props.testResult.buildEvent.id.testResult.run}, Attempt {this.props.testResult.buildEvent.id.testResult.attempt})</div>
        {!this.state.cacheEnabled && 
          <div className="empty-state">
            Test log uploading isn't enabled for this invocation.<br /><br />
            To enable test log uploading you must add GRPC remote caching. You can do so by adding the following line to your <b>.bazelrc</b> and re-run your invocation:
            <CacheCodeComponent />
          </div>}
        <div className="test-log">{this.state.testLog}</div>
      </div>
    </div>
  }
}
