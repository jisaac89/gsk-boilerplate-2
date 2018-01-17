interface IPatient{

}

export interface IPrescription{
    drug?: string;
    dose?: string;
    issueUnit?: string;
    startDate?: Date;
    endDate?: Date;
    refill?: boolean;
    patient?: IPatient;
    inscription?: string;
}