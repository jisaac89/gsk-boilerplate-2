import {observable, computed, autorun} from 'mobx';

import {appStore} from '../stores/_GlobalStore';

import {IAuthStore} from '../interfaces/stores/IAuthStore';

export class AuthStore implements IAuthStore {

    @observable isAuthenticated : boolean = false;
    @observable redirectToReferrer : boolean = false;

    authenticate(cb) {
        this.isAuthenticated = true;
        appStore.menu = true;
        setTimeout(cb, 100);
    }

    signout(cb) {
        this.isAuthenticated = false
        setTimeout(cb, 100)
    }
}

export const authStore = new AuthStore();