import {observable, computed, ObservableMap, toJS} from 'mobx';

import Store from './_Store';

export default abstract class BaseStore extends Store{

    ref: string;

    @observable list : Array<Object> = [];
    @observable listItem : ObservableMap<Object> = new ObservableMap({});

    @observable loading : boolean = true;

    constructor(ref : string) {
        super(ref);
    }

    init() {
        const self = this;
        self.loadNewPage();
    }

    loadNewPage() {
        const self = this;
        // load the database ref with this.ref here
        // set json data to this.list

        this.loading = false;
    }

    async add() : Promise<any> {

    };

    async update(id : string, object: Object) {

    };

    async del(id : string) {

    };

    async clearAll(){

    }

}