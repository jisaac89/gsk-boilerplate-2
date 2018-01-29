import * as React from 'react';

import {Recoil, Layer} from '../../recoil/src/index';

import {observer} from 'mobx-react';

import {appStore} from '../stores/_GlobalStore';

import {BrowserRouter as Router, Route } from 'react-router-dom';

import {PrivateRoute} from './helpers/PrivateRoute';

import Header from './navigation/Header';
import LoadingPane from './navigation/LoadingPane';
import MenuPane from './navigation/MenuPane';

import Dashboard from './routes/dashboard/Dashboard';
import Prescribe from './routes/prescribe/Prescribe';
import Prescriptions from './routes/prescriptions/Prescriptions';

const Public = () => <h3>Public</h3>
const Protected = () => <h3>Protected</h3>

@observer
export default class Entry extends React.Component<any, any> {

    constructor(props) {
        super(props);
    }

    componentDidMount(){
        appStore.initializeApp();
    }

    onMobile(isMobile){
        appStore.onMobile(isMobile);
    }

    render() {
        
    let styles = {
        overflow : true,
        fill : true
    }

    return (
        <Router>
            <Recoil onMobile={this.onMobile.bind(this)} nightmode={appStore.nightmode} {...styles}>
                <Layer {...styles}>
                    <Layer flex {...styles}>
                        <Header />
                        <Route exact path="/" component={Dashboard} />
                        <Route path="/prescribe" component={Prescribe} />
                        <Route path="/prescriptions" component={Prescriptions} />
                        <PrivateRoute path='/protected' component={Protected} />
                    </Layer>
                    <MenuPane history={this.props.history} />
                </Layer>
            </Recoil>
        </Router>
        )
    } 
}