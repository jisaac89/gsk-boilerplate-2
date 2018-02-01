import * as React from 'react';

import { Layer, Open, Emerge, Stepper, Loading, SlideIn, Transform, Table, Button, Wizard, Toolbar, Dropdown, DatePicker, Toggle, Input } from '../../../../recoil/src/index';

import { observer, inject } from 'mobx-react';

import {IPrescriptionsProps} from '../../../interfaces/views/prescriptions/IPrescriptionsProps';

@inject('prescriptionsStore', 'appStore', 'prescribeStore')
@observer
export default class SelectedPrescription extends React.Component<IPrescriptionsProps, {}> {

    toggleViewHistory() {
        this.props.prescriptionsStore.toggleViewHistory();
    }

    cancelSelectPrescription() {
        this.props.prescriptionsStore.cancelSelectPrescription();
    }
    render() {
        let mobile = this.props.appStore.mobile;
        let prescriptionsStore = this.props.prescriptionsStore;

        let { selectedPrescription, viewHistory } = this.props.prescriptionsStore;

        return (
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
                                        <Stepper className="timeline mtb20 mb100" vertical stepIndex={3}>
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
                                    {mobile ?
                                        <SlideIn fixed if={true} from="bottom" className="w100">
                                            <Toolbar block textCenter className="p10">
                                                <Button size="large" icon="chevron-left" onClick={this.toggleViewHistory.bind(this)} block>
                                                    Cancel
                                        </Button>
                                            </Toolbar>
                                        </SlideIn> : null}
                                </Layer>
                            </SlideIn>
                        </Layer>
                        : null}
                </Layer>
            </Layer>
        )
    }
} 
