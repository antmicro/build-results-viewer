import React from 'react';
import InvocationModel from './invocation_model'
import { TerminalComponent } from '../terminal/terminal'
import { app_config } from '../../proto/app_config_ts_proto';

interface Props {
  model: InvocationModel,
  expanded: boolean
  appConfig: app_config.GetAppConfigResponse;
}

export default class BuildLogsCardComponent extends React.Component {
  props: Props;

  render() {
    return <div className={`card dark ${this.props.expanded ? "expanded" : ""}`} data-theme={this.props.appConfig?.theme}>
      <img className="icon" src="/results/image/log-circle-light.svg" />
      <div className="content">
        <div className="title">Build logs </div>
        <div className="details">
          <TerminalComponent value={this.props.model.consoleBuffer} appConfig={this.props.appConfig} />
        </div>
      </div>
    </div>
  }
}
