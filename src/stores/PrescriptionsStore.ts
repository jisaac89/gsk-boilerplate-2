import {observable, computed, autorun, action} from 'mobx';

import api from '../api';

import {appStore} from '../stores/_GlobalStore';

import BaseStore from './BaseStore';

import {IPrescription} from '../interfaces/data/IPrescription';

import {IPrescriptionsStore} from '../interfaces/stores/IPrescriptionsStore';

export class PrescriptionsStore extends BaseStore implements IPrescriptionsStore {

    @observable slideIndex: number = 0;
    @observable selectedPrescription : IPrescription = {}
    @observable viewHistory : boolean = false;

    gotoSlideIndex(n: number){
        this.slideIndex = n;
    }

    selectPrescription(prescription : IPrescription){
        this.selectedPrescription = prescription;
        this.slideIndex = 1;
    }

    cancelSelectPrescription(){
        this.selectedPrescription = {};
        this.slideIndex = 0;
        this.viewHistory = false;
    }

    toggleViewHistory(){
        this.viewHistory = !this.viewHistory;
    }

    @action load() {
        const self = this;
        this.loading = true;
        return api.Prescriptions.all().then((data) => {
            if (data) {
                self.loading = false;
                self.list = data;
            }
        }).catch((data) => {
            this.loading = false;
            alert('An error occured.');
            console.log(data);
        });
    }

    deleteAllPrescriptions(){
        const context = this;
        this.list.forEach((element: any, index) => {
            api.Prescriptions.delete(element.prescriptionuuid).then(function(response) {
              return response;
            }).then(function(data) {
                if (index === context.list.length - 1){
                    context.load();
                }
            });
        });
    }

}

export const prescriptionsStore = new PrescriptionsStore();