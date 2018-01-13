import * as React from "react";
import {withRouter} from "react-router-dom";

import { Recoil, Table, Button, IButtonProps, Toolbar, Input, Emerge, Layer, SlideIn, Loading, Open, Checkbox } from '../../../recoil/src/index';
import { observer } from 'mobx-react';
import { appStore } from '../../stores/_GlobalStore';

interface IRouterButton extends IButtonProps{
    history: any;
    route: string;
    title?: string;
}

@observer
class RouterButton extends React.Component<IRouterButton, any> {

  gotoRoute(route) {
    appStore.menu = false;
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
