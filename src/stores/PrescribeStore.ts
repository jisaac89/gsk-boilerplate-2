import {observable, computed, autorun} from 'mobx';

import {IPrescribeStore} from '../interfaces/stores/IPrescribeStore';

interface Prescription {
    drug: string;
    issueUnit: string;
    startDate: Date;
    endDate: Date;
    refill : boolean;
    patient: string;
    inscription: string;
}


export class PrescribeStore implements IPrescribeStore {
    
    @observable slideIndex : number = 0;
    @observable formIndex : number = 0;
    @observable prescribeIndex : number = 0;

    //Inscription Object

    @observable selectedDrug : any = null;
    @observable selectedIssueUnit : any = null;
    @observable selectedStartDate : Date = null;
    @observable selectedEndDate : Date = null;
    @observable hasEndDate : boolean = false;
    @observable refill : boolean = false;
    @observable selectedPatient : string = '';
    @observable selectedInscription : string = '';

    //

    @observable prescriptions : Prescription[] = []

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
    }

    selectEndDate(date) {
        this.selectedEndDate = date;
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

        let prescription = {
            drug : this.selectedDrug,
            issueUnit: this.selectedIssueUnit,
            startDate: this.selectedStartDate,
            endDate: this.selectedEndDate,
            refill : this.refill,
            patient : this.selectedPatient,
            inscription : this.selectedInscription
        }

        this.prescriptions.push(prescription);

        console.log(this.prescriptions)
    }
}

export const prescribeStore = new PrescribeStore();