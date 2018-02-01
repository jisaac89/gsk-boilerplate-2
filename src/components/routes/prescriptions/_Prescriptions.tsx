import * as React from 'react';

import { Layer,Open, Emerge, Stepper,Loading,SlideIn,Transform, Table, Button, Wizard, Toolbar, Dropdown, DatePicker, Toggle, Input } from '../../../../recoil/src/index';

import { observer, inject } from 'mobx-react';

import PrescriptionsList from './PrescriptionsList';
import SelectedPrescription from './SelectedPrescription';

import {IPrescriptionsProps} from '../../../interfaces/views/prescriptions/IPrescriptionsProps';

@inject('prescriptionsStore')
@observer
export default class _Prescriptions extends React.Component<IPrescriptionsProps, {}> {

    constructor(props) {
        super(props);
    }

    gotoSlideIndex(n: number){
        this.props.prescriptionsStore.gotoSlideIndex(n);
    }
 
    render() {

        let prescriptionsStore = this.props.prescriptionsStore;

        let {selectedPrescription, viewHistory} = prescriptionsStore;

        return (
            <Layer fill flexCenter>
                <Wizard fill slideIndex={prescriptionsStore.slideIndex}>
                    <PrescriptionsList />
                    <SelectedPrescription />
                </Wizard>
            </Layer>
        )
    }
}