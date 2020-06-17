import React from 'react';
import InvocationModel from '../invocation_model';

interface Props {
  hash: string,
  model: InvocationModel,
}

export default class DenseInvocationTabsComponent extends React.Component {
  props: Props;

  isPrivateInstance() {
    const jobId = this.props.model.getJobId();
    const jobUrl = this.props.model.getJobUrl();
    if(jobId && jobUrl) {
      return true;
    } else {
      return false;
    }
  }

  render() {
    return <div className="tabs">
      <a href="#targets" className={`tab ${(this.props.hash == '#targets' || this.props.hash == '') && 'selected'}`}>
        TARGETS
      </a>
      <a href="#log" className={`tab ${this.props.hash == '#log' && 'selected'}`}>
        BUILD LOGS
      </a>
      <a href="#details" className={`tab ${this.props.hash == '#details' && 'selected'}`}>
        INVOCATION DETAILS
      </a>
      <a href="#artifacts" className={`tab ${this.props.hash == '#artifacts' && 'selected'}`}>
        ARTIFACTS
      </a>
      <a href="#timing" hidden className={`tab ${this.props.hash == '#timing' && 'selected'}`}>
        TIMING
      </a>
      <a href="#raw" style={this.isPrivateInstance() ? {} : { display: 'none' }} className={`tab ${this.props.hash == '#raw' && 'selected'}`}>
        RAW LOG
      </a>
    </div>
  }
}
