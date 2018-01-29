export interface IAuthStore{
    isAuthenticated : boolean;
    authenticate(cb) : void;
    signout(cb) : void;
}