import React from 'react';
import authService, { User } from '../auth/auth_service';
import capabilities from '../capabilities/capabilities';

interface Props {
  children?: any;
  user: User;
  showHamburger: boolean;
  theme: string;
}

export default class MenuComponent extends React.Component {
  props: Props;

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
        <div hidden className="menu" data-theme={this.props.theme}>
          <div className="container">
            <div>
	      { this.props.theme && <a href="/results/"><div className="title"><img src={this.logoUrl} /></div></a> }
            </div>
          </div>
        </div>
      </div>
    );
  }
}
