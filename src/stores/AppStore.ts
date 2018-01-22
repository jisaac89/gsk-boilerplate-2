import {observable, computed} from 'mobx';

import {IAppStore} from '../interfaces/stores/IAppStore';

import {patientsStore} from './_GlobalStore';
import { PatientsStore } from './PatientsStore';

export class AppStore implements IAppStore {
    
    @observable nightmode = false;
    @observable mobile = false;
    @observable menu = false;
    @observable loading = false;

    constructor() {
        const self = this;
    }

    initializeApp() {
        patientsStore.init();
    }

    toggleNightmode(){
        this.nightmode = !this.nightmode;
    }

    toggleMenu(){
        this.menu = !this.menu;
    }

    onMobile(isMobile: boolean){
        this.mobile = isMobile;
    }

}

export const appStore = new AppStore();