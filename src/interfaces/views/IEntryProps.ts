import {IAppStore} from '../stores/IAppStore';
import {IAuthStore} from '../stores/IAuthStore';

export interface IEntryProps{
    appStore ?: IAppStore;
    authStore ?: IAuthStore; 
    history?: Object;
}