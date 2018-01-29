import * as React from 'react';
import {
    Redirect
  } from 'react-router-dom'

import {authStore} from '../../../stores/_GlobalStore';
import { AuthButton } from '../../helpers/AuthButton';

interface IAuthProps{
    location?: any;
}

export default class Auth extends React.Component<IAuthProps, {}>{
    render() {

        return (
            <div>
                <p>You must log in to view the page</p>
                <AuthButton />
            </div>
        )
    }
}