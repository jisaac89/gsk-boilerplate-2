export interface IDoctor{
    email: string;
    password: string;
    group: 'doctor' | 'admin' | null;
    companyCode: string;
}