import {observable, computed, autorun} from 'mobx';

import {appStore} from '../stores/_GlobalStore';

import {IAuthStore} from '../interfaces/stores/IAuthStore';

import * as passwordHash from 'password-hash';

import { IUser } from '../interfaces/data/IUser';

export class AuthStore implements IAuthStore {

    @observable user : IUser = {
        email: '',
        password: '',
        group: null,
        companyCode: ''
    }

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
        this.user.password = '';

        setTimeout(cb, 100)
    }

    setEmail(email){
        this.user.email = email;
    }

    setPassword(password){
        this.user.password = password;
    }

    // register



    toggleRegistering(){
        this.isRegistering = !this.isRegistering;
        this.resetRegisterUser();
    }

    resetRegisterUser(){
        this.user.email = '';
        this.user.password = '';
        this.isRegistered = false;
    }

    register() {
        
        let context = this;
        this.loading = true;
        let urlString = '';
        
        // setTimeout(()=>{
        //     this.isRegistered = true;
        //     this.loading = false;
        // }, 1000);

        this.user.password = passwordHash.generate(this.user.password);

        var request = new Request(`${urlString}`, {
            method: 'POST', 
            mode: 'cors', 
            redirect: 'follow',
            body: JSON.stringify(context.user),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        });

        fetch(request).then(function(response) {
          return response.json();
        }).then(function(data) {
            console.log(data);
            context.loading = false;
        });

    }

    onChangeCompanyCode(companyCode){
        this.user.companyCode = companyCode;
    }

    onChangeEmail(email){
        this.user.email = email;
    }

    onChangePassword(password){
        this.user.password = password;
    }

    async login() {
        let data = {
            username: this.user.email,
            password: this.user.password
        };

        let urlString = '';

        let headers = new Headers();
        headers.append('Content-Type', "application/x-www-form-urlencoded");
        headers.append('Accept', 'application/json');

        let url = `${urlString}`;
        let result = await fetch(url, {
            method: "POST",
            headers: headers,
            //  mode: 'cors',
            credentials: "omit",
            body: JSON.stringify(data)
        });
        let body = await result.json();
        if (body && body.refresh_token) {
            sessionStorage.setItem('login', JSON.stringify(body));
            this.isAuthenticated = true;
        }else{
            alert('username or password incorrect');
        }
    }
}

export const authStore = new AuthStore();