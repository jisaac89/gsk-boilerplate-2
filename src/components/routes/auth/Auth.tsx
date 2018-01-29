import * as React from 'react';
import {
    Redirect
  } from 'react-router-dom'

import {authStore} from '../../../stores/_GlobalStore';
import { AuthButton } from '../../helpers/AuthButton';

import {Toolbar, Layer, Emerge} from '../../../../recoil/src/index';

interface IAuthProps{
    location?: any;
}

import {observer} from 'mobx-react';

@observer
export default class Auth extends React.Component<IAuthProps, {}>{
    render() {

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