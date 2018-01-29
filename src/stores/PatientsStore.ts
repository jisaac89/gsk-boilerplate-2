import {observable, computed, autorun} from 'mobx';

import {appStore} from '../stores/_GlobalStore';

import {IPatient} from '../interfaces/data/IPatient';

import BaseStore from './BaseStore';

export class PatientsStore extends BaseStore {

    @observable patients : IPatient[] = this.list;

    constructor(){
        super('Patient');
    }
    
    addObject(){
        return null;
    }
}

export const patientsStore = new PatientsStore();