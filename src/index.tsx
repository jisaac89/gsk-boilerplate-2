import * as React from "react";
import * as ReactDOM from "react-dom";
import 'core-js';

import * as promiseFinally from 'promise.prototype.finally';

import { Provider } from 'mobx-react';

import {appStore, authStore, prescribeStore, prescriptionsStore,patientsStore} from './stores/_GlobalStore'

import Entry from './components/Entry';

const stores = {
 appStore,
 authStore,
 prescribeStore,
 prescriptionsStore,
 patientsStore
};

// debug
window['stores'] = stores;

promiseFinally.shim();

ReactDOM.render(
    <Provider {...stores}>
        <Entry />
    </Provider>,
    document.getElementById("root")
); 