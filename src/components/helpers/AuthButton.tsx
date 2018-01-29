import * as React from "react";
import {withRouter} from "react-router-dom";

import { authStore } from '../../stores/_GlobalStore';

import AuthLogin from './AuthLogin';

export const AuthButton = withRouter(({ history }) => (
    authStore.isAuthenticated ? (
        <button onClick={() => {
            authStore.signout(() => history.push('/'))
        }}>Sign out</button>
    ) : (
        <AuthLogin />
    )
  ))