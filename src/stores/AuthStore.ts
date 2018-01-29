import {observable, computed, autorun} from 'mobx';

import {appStore} from '../stores/_GlobalStore';

import {IAuthStore} from '../interfaces/stores/IAuthStore';

export class AuthStore implements IAuthStore {

    @observable isAuthenticated : boolean = false;
    
}

export const authStore = new AuthStore();