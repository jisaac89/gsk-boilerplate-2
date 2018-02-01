
import * as React from 'react';

import { Layer,Open, Emerge, Stepper,Loading, Table, Button, Wizard, Toolbar, Dropdown, DatePicker, Toggle, Input } from '../../../../recoil/src/index';

import { observer, inject } from 'mobx-react';

@inject('appStore', 'prescribeStore')
@observer
export default class Intro extends React.Component<any, {}> {

    gotoSlideIndex(n: number){
        this.props.prescribeStore.gotoSlideIndex(n);
    }

    render() {

        return (
            <Layer fill  flexCenter>
                <Emerge if={!this.props.appStore.menu}>
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
