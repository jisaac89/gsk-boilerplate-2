import * as React from 'react';

import {Recoil, Table, Button, Toolbar, Input, Emerge, Layer, SlideIn, Loading, Open, Checkbox} from '../../../../recoil/src/index';

import {observer} from 'mobx-react';

import { AuthButton } from '../../helpers/AuthButton';

import {appStore, prescribeStore, prescriptionsStore} from '../../../stores/_GlobalStore';
import { authStore } from '../../../stores/AuthStore';

@observer
export default class Register extends React.Component<any, any> {
    deleteAllPrescriptions(){
        prescribeStore.deleteAllPrescriptions();
    }

    toggleRegistering(){
        authStore.toggleRegistering();
    }

    render() {

        let {history} = this.props;

        return (
            <SlideIn className="z5" if={authStore.isRegistering} from="top" fill>
                <Layer flexCenter className="text-center pt50" fill theme="dark">
                    <Emerge if={authStore.isRegistering}>
                        <div className="p10">
                            <h2>Create a new account!</h2>
                            <h3 className="mb50">We just need a know a few things first!</h3>
                            <Toolbar textCenter block className="w300px center-width" spacing vertical>
                                <Input advanced placeholder="Company Code" block />
                                <Input advanced placeholder="Email" block />
                                <Input advanced placeholder="Password" type="password" block />
                                <Button block size="large" theme="primary">Sign Up</Button>
                                <Button size="small" onClick={this.toggleRegistering.bind(this)} block outline>Cancel</Button>                          
                            </Toolbar>
                        </div>
                    </Emerge>
                </Layer>
            </SlideIn>
        )
    } 
}  