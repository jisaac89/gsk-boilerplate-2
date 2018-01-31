import * as React from 'react';

import { Layer, Open, Emerge, Stepper, Loading, Table, Button, Wizard, Toolbar, Dropdown, DatePicker, Toggle, Input } from '../../../../recoil/src/index';

import { observer } from 'mobx-react';

import { appStore, prescribeStore, patientsStore, prescriptionsStore } from '../../../stores/_GlobalStore';

@observer
export default class PrescriptionsList extends React.Component<{}, {}> {

    selectPrescription(prescription) {
        prescriptionsStore.selectPrescription(prescription);
    }

    render() {

        let menuTemplate = (item, index) => {
            return (
                <Toolbar block>
                    <Button onClick={this.selectPrescription.bind(this, item)} icon="chevron-right" right theme="error" outline></Button>
                </Toolbar>
            )
        }

        let defaultColumns = [{ name: 'drug', width: 100 }, { name: 'owner' }, { template: menuTemplate }];
        let mobileColumns = [{ name: 'drug' }, { template: menuTemplate }];

        let mobile = appStore.mobile;

        return (
            <Layer fill flexCenter={!mobile} scrollY={mobile} >
                <Emerge className="e-fill" if={!appStore.menu}>
                    <Layer>
                        <i className="material-icons super-xl mb20 floatL">sort</i>
                        <h2 className="mb20">Prescriptions</h2>
                        <h1 className="mb20">
                            <small>Select a patient to view a prescription in depth.</small>
                        </h1>
                        <div className="w100 ps20 center-width text-left">
                            <Table searchTitle={'Search by drug name or patient.'} searchableKeys={['drug', 'patient']} columns={!appStore.mobile ? defaultColumns : mobileColumns} dataSource={prescribeStore.list.reverse()} />
                        </div>
                    </Layer>
                </Emerge>
            </Layer>
        )
    }
} 
