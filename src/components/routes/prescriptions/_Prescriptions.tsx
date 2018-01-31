import * as React from 'react';

import { Layer,Open, Emerge, Stepper,Loading,SlideIn,Transform, Table, Button, Wizard, Toolbar, Dropdown, DatePicker, Toggle, Input } from '../../../../recoil/src/index';

import { observer } from 'mobx-react';

import { appStore, prescriptionsStore, prescribeStore} from '../../../stores/_GlobalStore';
import { PrescriptionsStore } from '../../../stores/PrescriptionsStore';

import PrescriptionsList from './PrescriptionsList';
import SelectedPrescription from './SelectedPrescription';

@observer
export default class Prescribe extends React.Component<{}, {}> {

    constructor(props) {
        super(props);
    }

    gotoSlideIndex(n: number){
        prescriptionsStore.gotoSlideIndex(n);
    }
 
    render() {

        let {selectedPrescription, viewHistory} = prescriptionsStore;

        let mobile = appStore.mobile;

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