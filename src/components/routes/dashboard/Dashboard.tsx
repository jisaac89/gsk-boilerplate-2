import * as React from 'react';

import {Recoil, Layer} from '../../../../recoil/src/index';

import {observer, inject} from 'mobx-react';

@inject('appStore')
@observer
export default class Dashboard extends React.Component<any, any> {

    constructor(props) {
        super(props);
    }

    componentDidMount(){
        this.props.appStore.menu = true;
    }

    render() {
        return null;
    } 
}