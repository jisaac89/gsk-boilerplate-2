import { IAppStore } from "../../stores/IAppStore";
import { IPrescriptionsStore } from "../../stores/IPrescriptionsStore";
import { IAuthStore } from "../../stores/IAuthStore";

export interface IMenuPane{
    appStore?: IAppStore;
    prescriptionsStore?: IPrescriptionsStore;
    authStore?: IAuthStore;
    history: Object;
}