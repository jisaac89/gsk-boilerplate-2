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

    // register

    @observable isRegistering : boolean = false;
    @observable isRegistered : boolean = false;

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
        this.user.email = '';
        this.password = '';

        setTimeout(cb, 100)
    }

    setEmail(email){
        this.user.email = email;
    }

    setPassword(password){
        this.password = password;
    }

    toggleRegistering(){
        this.isRegistering = !this.isRegistering;
        this.resetRegisterUser();
    }

    resetRegisterUser(){
        this.user.email = '';
        this.password = '';
        this.isRegistered = false;
    }

    register() {
        
        this.loading = true;
        
        setTimeout(()=>{
            this.isRegistered = true;
            this.loading = false;
        }, 1000);
    }
}

export const authStore = new AuthStore();