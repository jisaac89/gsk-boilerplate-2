import * as React from 'react';
import {
    Redirect
  } from 'react-router-dom'

import {authStore} from '../../../stores/_GlobalStore';

interface IAuthProps{
    location?: any;
}

export default class Auth extends React.Component<IAuthProps, {}>{
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
            <div>
            <p>You must log in to view the page</p>
            <button onClick={this.login}>Log in</button>
            </div>
        )
    }
}