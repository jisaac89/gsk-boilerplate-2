import * as React from 'react';

import { Layer,Open, Emerge, Stepper,Loading, Table, Button, Wizard, Toolbar, Dropdown, DatePicker, Toggle, Input } from '../../../../recoil/src/index';

import { observer } from 'mobx-react';

import { appStore, prescriptionsStore } from '../../../stores/_GlobalStore';

@observer
export default class Prescribe extends React.Component<{}, {}> {

    constructor(props) {
        super(props);
    }

    gotoSlideIndex(n: number){
        prescriptionsStore.gotoSlideIndex(n);
    }

    render() {

        let menuTemplate = (item, index) => {
            return (
                <Toolbar block>
                    <Button right theme="primary" size="small">View</Button>
                </Toolbar>
            )
        }
        
        return (
            <Layer fill flex>
               <Table columns={[{name: 'drug', width: 100}, {name: 'patient'}, {template: menuTemplate}]} dataSource={prescriptionsStore.prescriptions} />
            </Layer>
        )
    }
}

