import {observable, computed} from 'mobx';

import {IAppStore} from '../interfaces/stores/IAppStore';


export class AppStore implements IAppStore {
    
    @observable nightmode = false;
    @observable mobile = false;
    @observable menu = false;
    @observable loading = false;

    constructor() {
        const self = this;
    }

    initializeApp() {

    }

    toggleNightmode(){
        this.nightmode = !this.nightmode;
    }

    toggleMenu(){
        this.menu = !this.menu;
    }

}

export const appStore = new AppStore();