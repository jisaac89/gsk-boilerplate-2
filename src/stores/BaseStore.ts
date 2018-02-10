import {observable, computed, ObservableMap, toJS} from 'mobx';

export default abstract class BaseStore{
    ref: string;
    @observable list : Array<Object> = [];
    @observable listItem : ObservableMap<Object> = new ObservableMap({});
    @observable loading : boolean = true;
}