
import * as React from 'react';

import { Layer,Open, Emerge, Stepper,Loading, Table, Button, Wizard, Toolbar, Dropdown, DatePicker, Toggle, Input } from '../../../../recoil/src/index';

import { observer, inject } from 'mobx-react';

@inject('prescribeStore')
@observer
export default class Steps extends React.Component<any, {}> {

    gotoSlideIndex(n: number){
        this.props.prescribeStore.gotoSlideIndex(n);
    }

    render() {

        let prescribeStore = this.props.prescribeStore;

        return (
            <Layer className="p10 dark border-top w100 center-width">
                <Stepper stepIndex={prescribeStore.slideIndex}>
                    <Button advanced checked={prescribeStore.slideIndex === 0} onClick={this.gotoSlideIndex.bind(this, 0)} simple size="small">Intro</Button>
                    <Button advanced checked={prescribeStore.slideIndex === 1} onClick={this.gotoSlideIndex.bind(this, 1)} simple size="small">Assign</Button>
                    <Button advanced checked={prescribeStore.slideIndex === 2} onClick={this.gotoSlideIndex.bind(this, 2)} simple size="small">Prescription</Button>
                    <Button advanced checked={prescribeStore.slideIndex === 3} onClick={this.gotoSlideIndex.bind(this, 3)} simple size="small">Confirm</Button>
                </Stepper>
            </Layer>
        )
    }
} 
