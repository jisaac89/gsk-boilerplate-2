import {IPrescriptionsStore} from '../../stores/IPrescriptionsStore';
import {IAppStore} from '../../stores/IAppStore';
import {IPrescribeStore} from '../../stores/IPrescribeStore';

export interface IPrescriptionsProps{
    prescriptionsStore ?: IPrescriptionsStore;
    appStore ?: IAppStore;
    prescribeStore ?: IPrescribeStore;
}