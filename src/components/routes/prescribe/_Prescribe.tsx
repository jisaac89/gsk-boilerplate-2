import * as React from 'react';

import { Layer, Open, Emerge, Stepper, Loading, Table, Button, Wizard, Toolbar, Dropdown, DatePicker, Toggle, Input } from '../../../../recoil/src/index';

import { observer, inject } from 'mobx-react';

import { IPrescribeProps } from '../../../interfaces/views/prescribe/IPrescribeProps';

import SignatureCanvas from 'react-signature-canvas';

import Intro from './Intro';
import SelectPatient from './SelectPatient';
import RefillOrCreate from './RefillOrCreate';
import Saving from './Saving';
import Completed from './Completed';

import Steps from './Steps';

@inject('prescribeStore')
@observer
export default class Prescribe extends React.Component<IPrescribeProps, {}> {

  render() {
    return (
      <Layer fill flex>
        <Wizard fill flex slideIndex={this.props.prescribeStore.slideIndex}>
          <Intro />
          <SelectPatient />
          <RefillOrCreate />
          <Saving />
          <Completed />
        </Wizard>
        <Steps />
      </Layer>
    )
  }
} 