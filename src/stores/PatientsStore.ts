import {observable, computed, autorun} from 'mobx';

import {appStore} from '../stores/_GlobalStore';

interface IPatient {
    Id: number;
    name: string;
}

export class PatientsStore {

    @observable patients : IPatient[] = [];

    constructor(){
        // init
    }

    init(){
        // grab a list of patients 
        fetch('url').then(function(response) {
            console.log(response)
        }).then(function(data) {
            console.log(data)
        });
    }
}

export const patientsStore = new PatientsStore();