export interface IAuthStore{
    isAuthenticated : boolean;
    authenticate(cb) : void;
    signout(cb) : void;
    toggleRegistering(): void;
    loading: boolean;
    register() : void;
    isRegistered: boolean;
    isRegistering : boolean;
}