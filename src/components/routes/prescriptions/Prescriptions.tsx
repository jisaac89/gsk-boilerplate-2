import * as React from 'react';

import { Layer,Open, Emerge, Stepper,Loading,SlideIn,Transform, Table, Button, Wizard, Toolbar, Dropdown, DatePicker, Toggle, Input } from '../../../../recoil/src/index';

import { observer } from 'mobx-react';

import { appStore, prescriptionsStore, prescribeStore} from '../../../stores/_GlobalStore';
import { PrescriptionsStore } from '../../../stores/PrescriptionsStore';

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

    toggleViewHistory(){
        prescriptionsStore.toggleViewHistory();
    }

    cancelSelectPrescription(){
        prescriptionsStore.cancelSelectPrescription();
    }
 
    render() {

        let {selectedPrescription, viewHistory} = prescriptionsStore;

        let menuTemplate = (item, index) => {
            return (
                <Toolbar block>
                    <Button onClick={this.selectPrescription.bind(this, item)} icon="chevron-right" right theme="error" outline></Button>
                </Toolbar>
            )
        }
        
        let defaultColumns = [{name: 'drug', width: 100}, {name: 'owner'}, {template: menuTemplate}];
        let mobileColumns = [{name: 'drug'} ,{template: menuTemplate}];

        let mobile = appStore.mobile;

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
                                <div className="w100 ps20 center-width text-left">
                                    <Table searchTitle={'Search by drug name or patient.'} searchableKeys={['drug', 'patient']} columns={!appStore.mobile ? defaultColumns : mobileColumns} dataSource={prescribeStore.list.reverse()} />
                                </div>
                            </Layer>
                        </Emerge>
                    </Layer>
                    <Layer fill>
                        <Layer fill>
                           {selectedPrescription ? 
                                <Layer fill>
                                    <Transform fill push="right" amount={"50%"} if={prescriptionsStore.viewHistory === true && !mobile}>
                                        <Layer flexCenter={!mobile} scrollY={mobile} fill className="border-right">
                                            <Layer>
                                                <img height={175} width={175} src="https://www.qrstuff.com/images/default_qrcode.png" />
                                                <h2 className="mb20">Prescription ID : 0x210958102985108</h2>
                                                <h1 className="mb20">
                                                    <small>Patient: <strong>{selectedPrescription.owner}</strong></small>
                                                </h1>
                                                <h1 className="mb20">
                                                    <small>Prescription: <strong>{selectedPrescription.drug} {selectedPrescription.dose} {selectedPrescription.issueUnit}</strong></small>
                                                </h1>
                                                <h1 className="mb20">
                                                    <small>Inscription: <strong>{selectedPrescription.inscription}</strong></small>
                                                </h1>
                                                <Toolbar textCenter vertical spacing block size="large" className="mt20 w300px center-width">
                                                    <Button theme={viewHistory ? "primary" : "default"} block onClick={this.toggleViewHistory.bind(this)} materialIcon icon="list">View History</Button>
                                                    <Button block onClick={this.cancelSelectPrescription.bind(this)} icon="chevron-left">Go Back</Button>
                                                </Toolbar>
                                            </Layer>
                                        </Layer>
                                    </Transform>
                                    <SlideIn className={mobile ? "w100 h100 z5" : "w50 h100"} from="right" if={prescriptionsStore.viewHistory}>
                                        
                                        <Layer theme="light" flexCenter={!mobile} fill scrollY={mobile}>
                                            
                                            
                                            <Layer className="text-left ps20 calen center-width">
                                                <h2 className="mb40">January 2018</h2>
                                                <Stepper className="timeline" vertical stepIndex={3}>
                                                    <Toolbar>
                                                        <Button outline>1/17/2018</Button>
                                                        <Button className="w200px text-left" simple>Created</Button>
                                                    </Toolbar>
                                                    
                                                    <Toolbar>
                                                        <Button outline>1/18/2018</Button>
                                                        <Button className="w200px text-left" simple>Patient Recieved</Button>
                                                    </Toolbar>
                                                    
                                                    <Toolbar>
                                                        <Button outline>1/23/2018</Button>
                                                        <Button className="w200px text-left" simple>Requested Refill</Button>
                                                    </Toolbar>
                                                    
                                                    <Toolbar>
                                                        <Button outline>1/24/2018</Button>
                                                        <Button className="w200px text-left" simple>Refill Aprroved</Button>
                                                    </Toolbar>
                                                </Stepper>
                                            </Layer>
                                        </Layer>
                                    </SlideIn>
                                </Layer>
                            : null}
                        </Layer>
                    </Layer>
                </Wizard>
            </Layer>
        )
    }
}