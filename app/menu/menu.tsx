import React from 'react';
import authService, { User } from '../auth/auth_service';
import capabilities from '../capabilities/capabilities';

interface Props {
  children?: any;
  denseModeEnabled: boolean;
  handleDenseModeToggled: VoidFunction;
  user: User;
  showHamburger: boolean;
  theme: string;
}
interface State {
  menuExpanded: boolean;
}

export default class MenuComponent extends React.Component {
  props: Props;

  state: State = {
    menuExpanded: false
  };

  handleShadeClicked() {
    this.setState({ menuExpanded: false });
  }

  handleMenuClicked() {
    this.setState({ menuExpanded: !this.state.menuExpanded });
  }

  handleToggleDenseModeClicked() {
    this.props.handleDenseModeToggled();
  }

  handleLoginClicked() {
    authService.login();
  }

  handleLogoutClicked() {
    authService.logout();
  }

  get logoUrl() {
    return `/results/image/logo_${this.props.theme}.svg`;
  }

  render() {
    return (
      <div>
        {this.state.menuExpanded && <div className="side-menu-shade" onClick={this.handleShadeClicked.bind(this)}></div>}
        <div hidden className="menu" data-theme={this.props.theme}>
          <div className="container">
            <div>
              <a href="/results/"><div className="title"><img src={this.logoUrl} /></div></a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
