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
                    <Button materialIcon icon="forward" iconLocation="right" right theme="error" outline size="small">View</Button>
                </Toolbar>
            )
        }
        
        return (
            <Layer fill flexCenter>
                <Emerge className="e-fill" if={!appStore.menu}>
                    <Layer>
                        <i className="material-icons super-xl mb20 floatL">sort</i>
                        <h2 className="mb20">Prescriptions</h2>
                        <h1 className="mb20">
                            <small>Select a patient to view a prescription in depth.</small>
                        </h1>
                        <div className="w500px center-width text-left">
                            <Table searchTitle={'Search by drug name or patient.'} searchableKeys={['drug', 'patient']} columns={[{name: 'drug', width: 100}, {name: 'patient'}, {template: menuTemplate}]} dataSource={prescriptionsStore.prescriptions} />
                        </div>
                    </Layer>
                </Emerge>
            </Layer>
        )
    }
}