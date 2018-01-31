
import * as React from 'react';

import { Layer, Open, Emerge, Stepper, Loading, Table, Button, Wizard, Toolbar, Dropdown, DatePicker, Toggle, Input } from '../../../../recoil/src/index';

import { observer } from 'mobx-react';

import { appStore, prescribeStore, patientsStore } from '../../../stores/_GlobalStore';

@observer
export default class Completed extends React.Component<{}, {}> {
    goBackToDashboard(){
        prescribeStore.resetPrescriptionForm(); 
        appStore.toggleMenu();
    }
    render() {

        return (
            <Layer flexCenter fill>
                <div className="w500px center-width">
                    <i className="material-icons super-xl mb20 floatL">done</i>

                    <h2 className="mb20 text-center">
                        <small>Prescription Sent!</small>
                    </h2>

                    <Toolbar block className="mb20 text-center" spacing>
                        <Button onClick={this.goBackToDashboard.bind(this)}>Go back to dashboard</Button>
                    </Toolbar>
                </div>
            </Layer>
        )
    }
} 
