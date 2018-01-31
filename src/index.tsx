import * as React from "react";
import * as ReactDOM from "react-dom";
import 'core-js';

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

ReactDOM.render(
    <Provider {...stores}>
        <Entry />
    </Provider>,
    document.getElementById("root")
); 