import * as React from 'react';
import {
    Redirect
  } from 'react-router-dom'

import {authStore} from '../../../stores/_GlobalStore';
import { AuthButton } from '../../helpers/AuthButton';

import {Toolbar, Layer, Emerge} from '../../../../recoil/src/index';

import {ILoginProps} from '../../../interfaces/views/auth/ILoginProps';

import {observer, inject} from 'mobx-react';

@inject('authStore')
@observer
export default class Login extends React.Component<ILoginProps, {}>{
    render() {

        let authStore = this.props.authStore;

        return (
            <Layer flexCenter className="text-center pt50" fill theme="light">
                <Emerge if={!authStore.isAuthenticated}>
                    <div className="p10">
                        <div className="mb50">
                            <img className="profile-pic" height={132} width={102} src={'http://dermamedicalgroup.com/wp-content/uploads/2014/05/MDoc.jpg'} />
                        </div>
                        <Toolbar textCenter block className="w300px center-width" spacing vertical>
                            <AuthButton />                            
                        </Toolbar>
                    </div>
                </Emerge>
            </Layer>
        )
    }
}