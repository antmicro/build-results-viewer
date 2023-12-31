import React from 'react';
import InvocationModel from '../invocation_model'
import router from '../../router/router';

interface Props {
  model: InvocationModel,
  invocationId: string
}
export default class DenseInvocationOverviewComponent extends React.Component {
  props: Props;

  handleUserClicked() {
    //router.navigateToUserHistory(this.props.model.getUser(false));
    void(0);
  }

  handleHostClicked() {
    //router.navigateToHostHistory(this.props.model.getHost());
    void(0);
  }

  htmlDecode(input: string) {
    var doc = new DOMParser().parseFromString(input, "text/html");
    return doc.documentElement.textContent;
  }

  getJobString() {
    const jobId = this.props.model.getJobId();
    const jobUrl = this.props.model.getJobUrl();
    console.log(jobId);
    console.log(jobUrl);
    if(jobId && jobUrl) {
        return <a href={jobUrl} style={{textDecoration: "underline"}}>(job #{jobId})</a>
    } else {
        return ""
    }
  }

  render() {
    return <div className="container">
      <div className="dense-invocation">
        <div className="dense-invocation-title">Invocation {this.getJobString()}</div>
        <div className="dense-invocation-invocation-id">{this.props.invocationId} ({this.props.model.getStartDate()}, {this.props.model.getStartTime()})</div>
      </div>
      <div className={`dense-invocation-status-bar ${this.props.model.getStatus() == "Succeeded" && `succeeded`} ${this.props.model.getStatus() == "Failed" && `failed`}`}>
        <div>
          {this.props.model.targets.length} {this.props.model.targets.length == 1 ? "target" : "targets"} evaluated on&nbsp;
          {this.props.model.getStartDate()} at {this.props.model.getStartTime()} for <span title={this.props.model.getDurationSeconds()}>{this.props.model.getTiming()}</span>
        </div>
        <div>
          Evaluation started by <b>{this.props.model.getUser(false)}</b> on <b>{this.props.model.getHost()}</b>
        </div>
      </div>
      <div className="dense-invocation-overview-grid">
        <div className="dense-invocation-overview-grid-chunk">
          <div className="dense-invocation-overview-grid-title">
            Invocation
          </div>
          <div className="dense-invocation-overview-grid-value">
            {this.props.model.getStatusIcon()}
            {this.props.model.getStatus()}
          </div>
        </div>
        <div className="dense-invocation-overview-grid-chunk">
          <div className="dense-invocation-overview-grid-title">
            Targets affected
          </div>
          <div className="dense-invocation-overview-grid-value">
            {this.props.model.targets.length}
          </div>
        </div>
        <div className="dense-invocation-overview-grid-chunk">
          <div className="dense-invocation-overview-grid-title">
            Broken
          </div>
          <div className="dense-invocation-overview-grid-value">
            {this.props.model.broken.length}
          </div>
        </div>
        <div className="dense-invocation-overview-grid-chunk">
          <div className="dense-invocation-overview-grid-title">
            Failed
          </div>
          <div className="dense-invocation-overview-grid-value">
            {this.props.model.failed.length}
          </div>
        </div>
        <div className="dense-invocation-overview-grid-chunk">
          <div className="dense-invocation-overview-grid-title">
            Failed (non-critical)
          </div>
          <div className="dense-invocation-overview-grid-value">
            {this.props.model.flaky.length}
          </div>
        </div>
        <div className="dense-invocation-overview-grid-chunk">
          <div className="dense-invocation-overview-grid-title">
            Successful
          </div>
          <div className="dense-invocation-overview-grid-value">
            {this.props.model.succeeded.length}
          </div>
        </div>
      </div>
    </div>
  }
}
