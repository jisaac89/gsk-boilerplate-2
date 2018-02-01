import * as React from 'react';

import {Recoil, Table, Button, Toolbar, Input, Emerge, Layer, SlideIn, Loading, Open, Checkbox} from '../../../../recoil/src/index';

import {observer, inject} from 'mobx-react';

import { AuthButton } from '../../helpers/AuthButton';

import {IRegisterProps} from '../../../interfaces/views/IRegisterProps';


@inject('prescribeStore', 'authStore')
@observer
export default class Register extends React.Component<IRegisterProps, any> {
    deleteAllPrescriptions(){
        this.props.prescribeStore.deleteAllPrescriptions();
    }

    toggleRegistering(){
        this.props.authStore.toggleRegistering();
    }

    register(){
        this.props.authStore.register();
    }

    onChangeCompanyCode(companyCode){
        this.props.authStore.onChangeCompanyCode(companyCode);
    }

    onChangeEmail(email){
        this.props.authStore.onChangeEmail(email);
    }

    onChangePassword(password){
        this.props.authStore.onChangePassword(password);
    }

    render() {

        let authStore = this.props.authStore;
        let {history} = this.props;
        let {isRegistered} = authStore;

        return (
            <SlideIn className="z5" if={authStore.isRegistering} from="top" fill>
                <Layer flexCenter className="text-center pt50" fill theme="dark">
                    <Emerge if={authStore.isRegistering}>
                        <div className="p10">
                            <h2>{!isRegistered ? "Create a new account!" : "You have registered!"}</h2>
                            <h3 className="mb50">{!isRegistered ? "We just need a know a few things first!" : "Please check your email to confirm"}</h3>
                            <Toolbar textCenter block className="w300px center-width" spacing vertical>
                                {!isRegistered ? <Input onChange={this.onChangeCompanyCode.bind(this)} advanced placeholder="Company Code" block /> : null}
                                {!isRegistered ? <Input onChange={this.onChangeEmail.bind(this)} advanced placeholder="Email" block />: null}
                                {!isRegistered ? <Input onChange={this.onChangePassword.bind(this)} advanced placeholder="Password" type="password" block />: null}
                                {!isRegistered ? <Button loading={authStore.loading} onClick={this.register.bind(this)} block size="large" theme="primary">Sign Up</Button>: null}
                                <Button size="small" onClick={this.toggleRegistering.bind(this)} block outline>Cancel</Button>                          
                            </Toolbar>
                        </div>
                    </Emerge>
                </Layer>
            </SlideIn>
        )
    } 
}  