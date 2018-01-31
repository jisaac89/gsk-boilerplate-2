
import * as React from 'react';

import { Layer,Open, Emerge, Stepper,Loading, Table, Button, Wizard, Toolbar, Dropdown, DatePicker, Toggle, Input } from '../../../../recoil/src/index';

import { observer } from 'mobx-react';

import { appStore, prescribeStore, patientsStore } from '../../../stores/_GlobalStore';

@observer
export default class Intro extends React.Component<{}, {}> {

    gotoSlideIndex(n: number){
        prescribeStore.gotoSlideIndex(n);
    }

    render() {

        return (
            <Layer fill  flexCenter>
                <Emerge if={!appStore.menu}>
                    <Layer className="p20">
                        <i className="material-icons super-xl mb20 floatL">highlight</i>
                        <h2 className="mb20">Prescribe medication</h2>
                        <h1 className="mb20">
                            <small>This wizard will take you through the process of prescribing a medication to a patient.</small>
                        </h1>
                        
                        <Toolbar block size="large" className="mt20">
                            <Button onClick={this.gotoSlideIndex.bind(this, 1)} icon="chevron-right" outline theme="error">Get Started</Button>
                        </Toolbar>
                    </Layer>
                </Emerge>
            </Layer>
        )
    }
} 
