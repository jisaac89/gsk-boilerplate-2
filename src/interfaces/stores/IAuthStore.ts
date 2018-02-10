import { IDoctor } from "../data/IDoctor";

export interface IAuthStore{
    user : IDoctor;
    loading: boolean;
    //
    redirectToReferrer: boolean;
    isAuthenticated : boolean;
    authenticate(cb) : void;
    signout(cb) : void;
    // register
    isRegistered: boolean;
    isRegistering : boolean;
    register(): void;
    toggleRegistering(): void;
    //
    setCompanyCode(companyCode: string) : void;
    setEmail(email: string) : void;
    setPassword(password: string) : void;
}