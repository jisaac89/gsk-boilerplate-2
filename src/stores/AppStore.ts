import {observable, computed, reaction, action} from 'mobx';

import {IAppStore} from '../interfaces/stores/IAppStore';

import {patientsStore, prescribeStore, prescriptionsStore} from './_GlobalStore';

export class AppStore implements IAppStore {
    
    @observable nightmode = false;
    @observable mobile = false;
    @observable menu = false;
    @observable loading = false;

    //

    @observable appName = 'Prescription Prototype';
    @observable token = window.localStorage.getItem('jwt');
    @observable appLoaded = false;

    initializeApp() {
        patientsStore.load();
        prescriptionsStore.load();
    }
  
    constructor() {
      reaction(
        () => this.token,
        token => {
          if (token) {
            window.localStorage.setItem('jwt', token);
          } else {
            window.localStorage.removeItem('jwt');
          }
        }
      );
    }

    @action setToken(token) {
        this.token = token;
      }
    
    @action setAppLoaded() {
        this.appLoaded = true;
    }    

    //

    @action toggleNightmode(){
        this.nightmode = !this.nightmode;
    }

    @action toggleMenu(){
        this.menu = !this.menu;
    }

    @action onMobile(isMobile: boolean){
        this.mobile = isMobile;
    }

}

export const appStore = new AppStore();