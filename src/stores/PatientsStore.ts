import {observable, computed, autorun, action} from 'mobx';

import {appStore} from '../stores/_GlobalStore';

import {IPatient} from '../interfaces/data/IPatient';

import BaseStore from './BaseStore';

import api from '../api';

export class PatientsStore extends BaseStore {

    @observable patients : IPatient[] = this.list;

    @action load() {
        this.loading = true;
        return api.Patients.all().then((data) => {
            if (data) {
                this.loading = false;
                this.list = data;
            }
        }).catch((data) => {
            this.loading = false;
            alert('An error occured.');
            console.log(data);
        });
    }
}

export const patientsStore = new PatientsStore();