import {observable, computed, autorun} from 'mobx';

import {appStore} from '../stores/_GlobalStore';

import BaseStore from './BaseStore';

import {IPrescription} from '../interfaces/data/IPrescription';

export class PrescriptionsStore {

    @observable slideIndex: number = 0;
    @observable prescriptions : IPrescription[] = [];
    @observable selectedPrescription : IPrescription = []
  
    constructor(){
       
    }

    gotoSlideIndex(n: number){
        this.slideIndex = n;
    }

    selectPrescription(prescription){
        this.selectedPrescription = prescription;
    }

}

export const prescriptionsStore = new PrescriptionsStore();