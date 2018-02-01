import {IAuthStore} from '../../stores/IAuthStore';
import {IPrescribeStore} from '../../stores/IPrescribeStore';

export interface IRegisterProps {
    authStore ?: IAuthStore;
    prescribeStore ?: IPrescribeStore;
    history?: Object;
}