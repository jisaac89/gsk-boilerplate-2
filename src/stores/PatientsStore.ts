import {observable, computed, autorun} from 'mobx';

import {appStore} from '../stores/_GlobalStore';

import BaseStore from './BaseStore';

interface IPatient {
}

export class PatientsStore extends BaseStore {

    @observable patients : IPatient[] = this.list;

    constructor(){
        super('http://ec2-54-173-242-99.compute-1.amazonaws.com:3000/api/org.acme.sample.SampleAsset');
    }
}

export const patientsStore = new PatientsStore();