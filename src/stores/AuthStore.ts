import {observable, computed, autorun} from 'mobx';

import {appStore} from '../stores/_GlobalStore';

import {IAuthStore} from '../interfaces/stores/IAuthStore';

export class AuthStore implements IAuthStore {

    @observable isAuthenticated : boolean = false;
    @observable redirectToReferrer : boolean = false;
    @observable loading : boolean = false;

    authenticate(cb) {
        
        this.loading = true;
        
        setTimeout(()=>{
            this.isAuthenticated = true;
            this.loading = false;
            cb();
            appStore.menu = true;
        }, 1000);
    }

    signout(cb) {
        this.isAuthenticated = false
        setTimeout(cb, 100)
    }
}

export const authStore = new AuthStore();