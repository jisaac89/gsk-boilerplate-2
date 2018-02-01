import * as React from "react";
import {withRouter} from "react-router-dom";

import { Button, IButtonProps } from '../../../recoil/src/index';
import { observer, inject } from 'mobx-react';

import {IAppStore} from '../../interfaces/stores/IAppStore';

interface IRouterButton extends IButtonProps{
    appStore: IAppStore;
    history: any;
    route: string;
    title?: string;
}

@inject('appStore')
@observer
class RouterButton extends React.Component<IRouterButton, any> {

  gotoRoute(route) {
    this.props.appStore.menu = false;
    this.props.history.push(route);
  }
  render(){
      const {route, title} = this.props;
      return (
          <Button {...this.props}  onClick={this.gotoRoute.bind(this, route)}>
            {title}
          </Button>
      )
  }
}
export default withRouter(RouterButton);
