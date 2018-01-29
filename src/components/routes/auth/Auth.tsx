import * as React from 'react';
import {
    Redirect
  } from 'react-router-dom'

import {authStore} from '../../../stores/_GlobalStore';
import { AuthButton } from '../../helpers/AuthButton';

import {Toolbar} from '../../../../recoil/src/index';

interface IAuthProps{
    location?: any;
}

export default class Auth extends React.Component<IAuthProps, {}>{
    render() {

        return (
            <Toolbar block textCenter className="p10">
                <AuthButton />
            </Toolbar>
        )
    }
}