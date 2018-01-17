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

    selectPrescription(prescription){
        prescriptionsStore.selectPrescription(prescription);
    }
 
    render() {

        let {selectedPrescription} = prescriptionsStore;

        let menuTemplate = (item, index) => {
            return (
                <Toolbar block>
                    <Button onClick={this.selectPrescription.bind(this, item)} icon="chevron-right" right theme="error" outline></Button>
                </Toolbar>
            )
        }
        
        return (
            <Layer fill flexCenter>
                <Wizard fill slideIndex={prescriptionsStore.slideIndex}>
                    <Layer fill flexCenter >
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
                    <Layer fill>
                        <Layer flexCenter fill>
                           {selectedPrescription ? 
                                <Layer>
                                    <img height={175} width={175} src="https://www.qrstuff.com/images/default_qrcode.png" />
                                    <h2 className="mb20">Prescription ID : 0x210958102985108</h2>
                                    <h1 className="mb20">
                                        <small>Patient: <strong>{selectedPrescription.patient}</strong></small>
                                    </h1>
                                    <h1 className="mb20">
                                        <small>Prescription: <strong>{selectedPrescription.drug} {selectedPrescription.dose} {selectedPrescription.issueUnit}</strong></small>
                                    </h1>
                                    <h1 className="mb20">
                                        <small>Inscription: <strong>{selectedPrescription.inscription}</strong></small>
                                    </h1>
                                    <Toolbar textCenter vertical spacing block size="large" className="mt20 w300px center-width">
                                        <Button block onClick={this.gotoSlideIndex.bind(this, 2)} materialIcon icon="list">View History</Button>
                                        <Button block onClick={this.gotoSlideIndex.bind(this, 0)} icon="chevron-left">Go Back</Button>
                                    </Toolbar>
                                </Layer>
                            : null}
                        </Layer>
                    </Layer>
                </Wizard>
            </Layer>
        )
    }
}