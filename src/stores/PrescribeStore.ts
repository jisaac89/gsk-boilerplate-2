import {observable, computed, autorun, action} from 'mobx';

import {appStore, patientsStore, prescriptionsStore} from '../stores/_GlobalStore';
import {IPrescribeStore} from '../interfaces/stores/IPrescribeStore';
import BaseStore from './BaseStore';

import api from '../api';

export class PrescribeStore implements IPrescribeStore {
    
    @observable slideIndex : number = 0;
    @observable formIndex : number = 0;
    @observable prescribeIndex : number = 0;
    @observable loading : boolean = false;

    //Prescription Object

    @observable selectedDrug : any = null;
    @observable selectedDose : string = '';
    @observable selectedIssueUnit : any = null;
    @observable selectedStartDate : Date = null;
    @observable selectedEndDate : Date = null;
    @observable hasEndDate : boolean = false;
    @observable refill : boolean = false;
    @observable selectedPatient : string = '';
    @observable selectedInscription : string = '';

    //

    @observable prescriptionComplete: boolean = false;
    @observable selectStartDateOpen : boolean = false;
    @observable selectEndDateOpen : boolean = false;

    test = autorun(()=>{
        if (!!this.selectedDrug && !this.selectedIssueUnit) {
            this.formIndex = 1;
        } else if (!!this.selectedDrug && !!this.selectedIssueUnit){
            this.formIndex = 2;
        } else {
            this.formIndex = 0
        }
    })

    gotoSlideIndex(n: number){
        this.slideIndex = n;
    }

    gotoFormIndex(n: number){
        this.formIndex = n;
    }

    selectDrug(drug){
        this.selectedDrug = drug;
    }

    selectIssueUnit(issueUnit){
        this.selectedIssueUnit = issueUnit;
    }

    selectStartDate(date) {
        this.selectedStartDate = date;
        setTimeout(() => {
            this.selectStartDateOpen = false;         
        }, 300);
    }

    selectEndDate(date) {
        this.selectedEndDate = date;
        setTimeout(() => {
            this.selectEndDateOpen = false;         
        }, 300);
    }

    toggleEndDate(){
        this.hasEndDate = !this.hasEndDate;
    }

    toggleRefill(){
        this.refill = !this.refill;
    }

    selectPatient(patient) {
        this.selectedPatient = patient;
    }

    gotoPrescribeIndex(index : number) {
        this.prescribeIndex = index;
    }

    updateInscription(inscription){
        this.selectedInscription = inscription;
    }

    confirmPrescription(){

        const self = this;

        this.gotoSlideIndex(3);

        setTimeout(() => {
            self.prescriptionComplete = true;
            this.gotoSlideIndex(4);
            this.gotoPrescribeIndex(0);
            this.gotoFormIndex(0);
        }, 8000);

        this.create();

    }

    resetPrescriptionForm(){
        this.selectedDrug = '';
        this.selectedIssueUnit = '';
        this.selectedStartDate = null;
        this.selectedEndDate = null;
        this.hasEndDate = false;
        this.refill = false;
        this.selectedPatient = '';
        this.selectedInscription = '';
        this.selectedDose = '';
        this.prescribeIndex = 0;
        this.formIndex = 0;
        this.slideIndex = 0;
    }

    toggleStartDateDropdown(){
        this.selectStartDateOpen = !this.selectStartDateOpen;
    }

    toggleEndDateDropdown(){
        this.selectEndDateOpen = !this.selectEndDateOpen;
    }

    selectDose(value: string){
        this.selectedDose = value;
    }

    addObject(){

        let generatedId = Math.random().toString();
        
        let prescription = {
            prescriptionuuid: generatedId, 
            drug : this.selectedDrug,
            dose: this.selectedDose,
            issueUnit: this.selectedIssueUnit,
            creationdate: this.selectedStartDate,
            expirationdate: this.selectedStartDate,
            refill : this.refill,
            owner : this.selectedPatient,
            prescriber: 'Dr.',
            inscription : this.selectedInscription,
            "$class": 'cloud.aperio.viiv.Prescription',
            "description": this.selectedInscription,
            "creatorreferencenumber": 'sample ref',
            "pharmaitemuuid": '`' + generatedId + '`',
            "refillinstructions": 'sample refill',
            "substitutions": this.selectedInscription,
            "notes": 'sample notes',
            "electronicsignature": 'sample sig'
        }

        return prescription;
    }

    @action create() {
        this.loading = true;
        return api.Prescriptions.create(this.addObject()).then((data) => {
            if (data) {
                this.loading = false;
                prescriptionsStore.load();
            }
        }).catch((data) => {
            this.loading = false;
            alert('An error occured.');
            console.log(data);
        });
    }
}

export const prescribeStore = new PrescribeStore();