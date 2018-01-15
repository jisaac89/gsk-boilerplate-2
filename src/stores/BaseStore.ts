import {observable, computed, ObservableMap, toJS} from 'mobx';

import Store from './_Store';

export default abstract class BaseStore extends Store{

    ref: string;

    @observable list : Array<Object> = [];
    @observable listItem : ObservableMap<Object> = new ObservableMap({});

    @observable loading : boolean = true;

    constructor(ref : string) {
        super(ref);
        this.ref = ref;
    }

    init() {
        const self = this;
        self.loadNewPage();
    }

    loadNewPage() {
        const context = this;
        let urlString = this.ref;
        fetch(urlString).then(function(response) {
            if (response){
                response.json().then((data)=>{
                   context.loading = false;
                   context.list = data;
                   console.log(context.list);
                })
            }
        });
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