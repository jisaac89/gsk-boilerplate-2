import {IPrescription} from '../data/IPrescription';

export interface IPrescriptionsStore{
    selectedPrescription: IPrescription;
    viewHistory: boolean;
    slideIndex: number;
    prescriptions: IPrescription[];
    gotoSlideIndex(n: number) : void;
    selectPrescription(prescription : IPrescription) : void;
    toggleViewHistory(): void;
    cancelSelectPrescription(): void;
}