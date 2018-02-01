export interface IAuthStore{
    isAuthenticated : boolean;
    authenticate(cb) : void;
    signout(cb) : void;
    toggleRegistering(): void;
    loading: boolean;
    //
    register() : void;
    isRegistered: boolean;
    isRegistering : boolean;
    onChangeCompanyCode(companyCode: string) : void;
    onChangeEmail(email: string) : void;
    onChangePassword(password: string) : void;
}