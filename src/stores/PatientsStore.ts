import {observable, computed, autorun} from 'mobx';

import {appStore} from '../stores/_GlobalStore';

import BaseStore from './BaseStore';

interface IPatient {
}

export class PatientsStore extends BaseStore {

    @observable patients : IPatient[] = this.list;

    constructor(){
        super('Patient');
    }
    
    addObject(){
        return {
            "$class": "org.acme.sample.SampleAsset",
            "assetId": "as",
            "owner": "resource:org.acme.sample.SampleParticipant#P1",
            "value": "as"
        }
    }
}

export const patientsStore = new PatientsStore();