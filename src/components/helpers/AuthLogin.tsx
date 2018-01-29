import * as React from 'react';
import { Redirect } from 'react-router-dom'

import { Button, IButtonProps } from '../../../recoil/src/index';

import {authStore} from '../../stores/_GlobalStore';

interface IAuthProps{
    location?: any;
    state ?: any;
    pathname: any;
}

export default class AuthLogin extends React.Component<IAuthProps, {}>{
    state = {
        redirectToReferrer: false
    }
    login = () => {
        authStore.authenticate(() => {
            this.setState(() => ({
                redirectToReferrer: true
            }))
        })
    }
    render() {
        const { from } = this.props.location.state || { from: { pathname: '/' } }
        const { redirectToReferrer } = this.state

        if (redirectToReferrer === true) {
            <Redirect to={from} />
        }

        return (
            <Button block onClick={this.login}>Log in</Button>
        )
    }
}