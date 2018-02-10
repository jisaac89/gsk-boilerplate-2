import { observable, computed, autorun, action } from 'mobx';

import { appStore } from '../stores/_GlobalStore';

import { IAuthStore } from '../interfaces/stores/IAuthStore';

import * as passwordHash from 'password-hash';

import { IDoctor } from '../interfaces/data/IDoctor';

import userStore from './UserStore';

import api from '../api';

export class AuthStore implements IAuthStore {

    @observable user: IDoctor = {
        email: '',
        password: '',
        group: 'admin',
        companyCode: ''
    }
    
    @observable loading: boolean = false;

    // login && logout

    @observable isAuthenticated: boolean = false;
    @observable redirectToReferrer: boolean = false;

    authenticate(cb) {

        this.loading = true;

        setTimeout(() => {
            this.isAuthenticated = true;
            this.loading = false;
            cb();
            appStore.menu = true;
            appStore.initializeApp();
        }, 1000);
    }

    signout(cb?: () => void) {
        this.isAuthenticated = false
        this.user.email = '';
        this.user.password = '';

        cb ? setTimeout(cb, 100) : null;
    }

    // register

    @observable isRegistering: boolean = false;
    @observable isRegistered: boolean = false;

    @action toggleRegistering() {
        this.isRegistering = !this.isRegistering;
        this.resetRegisterUser();
    }

    @action resetRegisterUser() {
        this.user.email = '';
        this.user.password = '';
        this.isRegistered = false;
    }

    @action register() {
        this.loading = true;
        return api.Auth.register(this.user.email, passwordHash.generate(this.user.password)).then((data) => {
            // this.isAuthenticated = true;
            // this.loading = false;
            // appStore.menu = true;
            if (data) {
                this.isRegistered = true;
                this.loading = false;
                console.log(data);
            }
        }).catch((data) => {
            // catch errors and array of ids.
            // auth store should also have a register store.
            this.loading = false;
            alert('Please check username/password');
            console.log(data);
        });
    }

    //

    @action setEmail(email) {
        this.user.email = email;
    }

    @action setPassword(password) {
        this.user.password = password;
    }

    @action setCompanyCode(companyCode) {
        this.user.companyCode = companyCode;
    }

    // 

    @action logina() {
        this.loading = true;
        return api.Auth.login(this.user.email, this.user.password);
    }

    @action logouta() {
        appStore.setToken(undefined);
        userStore.forgetUser();
        return Promise.resolve();
    }

}

export const authStore = new AuthStore();