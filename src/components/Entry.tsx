import * as React from 'react';

import {Recoil, Layer} from '../../recoil/src/index';

import {observer, inject} from 'mobx-react';

import {BrowserRouter as Router, Route } from 'react-router-dom';

import {PrivateRoute} from './helpers/PrivateRoute';

import Header from './navigation/Header';
import LoadingPane from './navigation/LoadingPane';
import MenuPane from './navigation/MenuPane';

import Login from './routes/auth/Login';
import Register from './routes/auth/Register';
import Dashboard from './routes/dashboard/Dashboard';
import Prescribe from './routes/prescribe/_Prescribe';
import Prescriptions from './routes/prescriptions/_Prescriptions';

import {IEntryProps} from '../interfaces/views/IEntryProps';

@inject('appStore', 'authStore')
@observer
export default class Entry extends React.Component<IEntryProps, any> {

    constructor(props) {
        super(props);
    }

    componentDidMount(){
        this.props.appStore.initializeApp();
    }

    onMobile(isMobile){
        this.props.appStore.onMobile(isMobile);
    }

    render() {

    let appStore = this.props.appStore;
    let isAuthenticated = this.props.authStore.isAuthenticated;
        
    let styles = {
        overflow : true,
        fill : true
    }

    return (
        <Router>
            <Recoil onMobile={this.onMobile.bind(this)} nightmode={appStore.nightmode} {...styles}>
                <Layer {...styles}>
                    <Layer flex {...styles}>
                        {isAuthenticated ? <Header /> : null}
                        <PrivateRoute exact path="/" component={Dashboard} />
                        <PrivateRoute path="/prescribe" component={Prescribe} />
                        <PrivateRoute path="/prescriptions" component={Prescriptions} />
                        <Route path="/login" component={Login}/>
                    </Layer>
                    {isAuthenticated ? <MenuPane history={this.props.history} /> : null}
                    {!isAuthenticated ? <Register history={this.props.history} /> : null}
                </Layer>
            </Recoil>
        </Router>
        )
    } 
}