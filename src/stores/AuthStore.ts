import {observable, computed, autorun} from 'mobx';

import {appStore} from '../stores/_GlobalStore';

import {IAuthStore} from '../interfaces/stores/IAuthStore';

export interface IUser{
    email: string;
}

export class AuthStore implements IAuthStore {

    @observable user : IUser = {
        email: ''
    }

    @observable password : string = '';

    //

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

    setEmail(email){
        this.user.email = email;
    }

    setPassword(password){
        this.password = password;
    }
}

export const authStore = new AuthStore();