import React from 'react';
import MenuComponent from '../menu/menu';
import InvocationComponent from '../invocation/invocation';
import capabilities from '../capabilities/capabilities'
import router, { Path } from '../router/router';
import authService, { AuthService } from '../auth/auth_service';
import { User } from '../auth/auth_service';
import { app_config } from '../../proto/app_config_ts_proto';
import rpcService from '../service/rpc_service';

const denseModeKey = "VIEW_MODE";
const denseModeValue = "DENSE";

interface State {
  user: User;
  hash: string;
  path: string;
  search: URLSearchParams;
  denseMode: boolean;
  appConfig: app_config.GetAppConfigResponse;
}

export default class RootComponent extends React.Component {
  state: State = {
    user: null,
    hash: window.location.hash,
    path: window.location.pathname,
    search: new URLSearchParams(window.location.search),
    denseMode: window.localStorage.getItem(denseModeKey) == denseModeValue || false,
    appConfig: null
  };

  componentWillMount() {
    capabilities.register("BuildBuddy Community Edition", [Path.invocationPath]);
    authService.register();
    router.register(this.handlePathChange.bind(this));
    authService.userStream.addListener(AuthService.userEventName, (user: User) => {
      this.setState({ ...this.state, user })
    })
    let request = new app_config.GetAppConfigRequest();
    rpcService.service.getAppConfig(request).then((response: app_config.GetAppConfigResponse) => {
      console.log(response);
      this.setState({...this.state, appConfig: response})
    });
  }

  handlePathChange() {
    this.setState({
      hash: window.location.hash,
      path: window.location.pathname,
      search: new URLSearchParams(window.location.search)
    });
  }

  handleToggleDenseClicked() {
    let newDenseMode = !this.state.denseMode;
    this.setState({ ...this.state, denseMode: newDenseMode });
    window.localStorage.setItem(denseModeKey, newDenseMode ? denseModeValue : "");
  }

  render() {
    let invocationId = router.getInvocationId(this.state.path);
    return (
      <div className="dense root">
        <MenuComponent theme={this.state.appConfig?.theme} user={this.state.user} showHamburger={true} denseModeEnabled={this.state.denseMode} handleDenseModeToggled={this.handleToggleDenseClicked.bind(this)} />
        {invocationId && <InvocationComponent invocationId={invocationId} hash={this.state.hash} search={this.state.search} denseMode={true} appConfig={this.state.appConfig} />}
      </div>
    );
  }
}
