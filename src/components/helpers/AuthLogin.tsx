import * as React from 'react';
import { Redirect } from 'react-router-dom'

import {observer} from 'mobx-react';

import { Button, IButtonProps, Toolbar, Input } from '../../../recoil/src/index';

import {authStore, appStore} from '../../stores/_GlobalStore';

interface IAuthProps{
    location?: any;
    state ?: any;
    pathname: any;
}

@observer
export default class AuthLogin extends React.Component<IAuthProps, {}>{

    login = () => {
        authStore.authenticate(() => {
            authStore.redirectToReferrer = true;
        })
    }

    setEmail(value){
        authStore.setEmail(value);
    }

    setPassword(password){
        authStore.setPassword(password);
    }

    render() {
        const { from } = this.props.location.state || { from: { pathname: '/' } }
        const { redirectToReferrer, user, password } = authStore;

        if (redirectToReferrer === true) {
            <Redirect to={from} />
        }

        return (
            <Toolbar textCenter block vertical spacing>

                <Input onChange={this.setEmail.bind(this)} block placeholder="Username" />
                <Input advanced required={user && user.email !== '' && password === ''} onChange={this.setPassword.bind(this)} block placeholder="Password" />

                <Button disabled={user && user.email === '' || password === ''} theme={user && user.email === '' || password === '' ? "default" : "primary"} className="mb20" loading={authStore.loading} block onClick={this.login}>Log in</Button>

                <Button block outline size="small">Forgot your password?</Button>
                <Button block outline size="small">Not a member? Join Today</Button>

            </Toolbar>
        )
    }
}