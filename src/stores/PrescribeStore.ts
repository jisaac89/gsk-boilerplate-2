import {observable, computed, autorun} from 'mobx';

import {IPrescribeStore} from '../interfaces/stores/IPrescribeStore';


export class PrescribeStore implements IPrescribeStore {
    
    @observable slideIndex : number = 0;
    @observable formIndex : number = 0;
    @observable prescribeIndex : number = 0;

    //Inscription form

    @observable selectedDrug : any = null;
    @observable selectedIssueUnit : any = null;
    @observable selectedStartDate : Date = null;
    @observable hasEndDate : boolean = false;
    @observable refill : boolean = false;
    @observable selectedPatient : string = '';
    @observable selectedInscription : string = '';

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
}

export const prescribeStore = new PrescribeStore();