import * as React from 'react';

import { Layer, Open, Emerge, Stepper, Loading, Table, Button, Wizard, Toolbar, Dropdown, DatePicker, Toggle, Input } from '../../../../recoil/src/index';

import { observer } from 'mobx-react';

import { appStore, prescribeStore, patientsStore } from '../../../stores/_GlobalStore';

import { IPrescribeProps } from '../../../interfaces/views/IPrescribeProps';

import SignatureCanvas from 'react-signature-canvas';

import Intro from './Intro';
import SelectPatient from './SelectPatient';
import RefillOrCreate from './RefillOrCreate';
import Saving from './Saving';
import Completed from './Completed';

import Steps from './Steps';

@observer
export default class Prescribe extends React.Component<IPrescribeProps, {}> {

  render() {
    return (
      <Layer fill flex>
        <Wizard fill flex slideIndex={prescribeStore.slideIndex}>
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