import {IPrescription} from '../data/IPrescription';

export interface IPrescriptionsStore{
    list : Array<any>;

    slideIndex: number;
    selectedPrescription: IPrescription;
    viewHistory: boolean;

    gotoSlideIndex(n: number) : void;
    selectPrescription(prescription : IPrescription) : void;
    cancelSelectPrescription(): void;
    toggleViewHistory(): void;

    deleteAllPrescriptions(): void;
}