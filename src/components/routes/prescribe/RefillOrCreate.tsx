
import * as React from 'react';

import { Layer, Open, Emerge, Stepper, Loading, Table, Button, Wizard, Toolbar, Dropdown, DatePicker, Toggle, Input } from '../../../../recoil/src/index';

import { observer } from 'mobx-react';

import { appStore, prescribeStore, patientsStore } from '../../../stores/_GlobalStore';

import { IPrescribeProps } from '../../../interfaces/views/IPrescribeProps';

import SignatureCanvas from 'react-signature-canvas';

import Intro from './Intro';
import SelectPatient from './SelectPatient';

@observer
export default class RefillOrCreate extends React.Component<{}, {}> {

  constructor(props) {
    super(props);
  }

  gotoSlideIndex(n: number) {
    prescribeStore.gotoSlideIndex(n);
  }

  selectDrug(drug) {
    prescribeStore.selectDrug(drug);
  }

  selectIssueUnit(issueUnit) {
    prescribeStore.selectIssueUnit(issueUnit);
  }

  selectStartDate(date) {
    prescribeStore.selectStartDate(date);
  }

  selectEndDate(date) {
    prescribeStore.selectEndDate(date);
  }

  toggleEndDate() {
    prescribeStore.toggleEndDate();
  }

  toggleRefill() {
    prescribeStore.toggleRefill();
  }

  gotoPrescribeIndex(index) {
    prescribeStore.gotoPrescribeIndex(index);
  }

  updateInscription(inscription) {
    prescribeStore.updateInscription(inscription);
  }

  confirmPrescription() {
    prescribeStore.confirmPrescription();
  }

  toggleStartDateDropdown() {
    prescribeStore.toggleStartDateDropdown();
  }

  toggleEndDateDropdown() {
    prescribeStore.toggleEndDateDropdown();
  }

  selectDose(value) {
    prescribeStore.selectDose(value)
  }

  goBackToDashboard() {
    prescribeStore.resetPrescriptionForm();
    appStore.toggleMenu();
  }

  render() {

    let { formIndex, selectedDrug, prescribeIndex, selectedDose, selectEndDateOpen, selectedIssueUnit, selectedPatient, selectedInscription, selectedStartDate, selectStartDateOpen, hasEndDate, refill } = prescribeStore;
    let mobile = appStore.mobile;

    let menuTemplate = (item, index) => {
      return (
        <Toolbar block>
          <Button right materialIcon icon="autorenew" iconLocation="left" theme="error" outline size="small">refill</Button>
        </Toolbar>
      )
    }
    return (
      <Layer fill flexCenter scrollY>

        <Wizard fill slideIndex={prescribeIndex}>
          <Layer flexCenter fill className="p10">
            <div className="w500px center-width">

              <h2 className="mb20 text-center">
                <small>{selectedPatient}</small>
              </h2>

              <Button onClick={this.gotoPrescribeIndex.bind(this, 1)} className="mb20" outline block theme="error" size="large" icon="plus">Create new prescription</Button>

              <h1 className="text-left">
                <small>Active prescriptions</small>
              </h1>

              <div className="w500px border-top mt20 center-width text-left">
                <Table searchTitle={'Search by startDate or patient.'} searchableKeys={['drug', 'startDate']} columns={[{ name: 'drug', width: 100 }, { name: 'startDate' }, { template: menuTemplate }]} dataSource={arrayOfPast} />
              </div>

            </div>
          </Layer>

          <Layer fill flexCenter className="p10">
            <div className="w500px center-width">

              <i className="material-icons super-xl mb20 floatL">highlight</i>

              <h2 className="mb20 text-center">
                <small>Create a prescription</small>
              </h2>

              <Toolbar block flex className="mb20 w500px" spacing>
                <Dropdown mobile={mobile} className="w200px" block hideDropdownHeader hideHeader title={selectedDrug ? selectedDrug : 'Drug'} theme={selectedDrug ? "primary" : null} onChange={this.selectDrug.bind(this)} selectedElements={[selectedDrug]} size={"large"} dataSource={['Tivicay', 'Advil', 'Omprezole', 'Celebrex', 'Cadvil', 'Zelle']} />
                <Input advanced error={!selectedDose} onChange={this.selectDose.bind(this)} focusOnMount={selectedDrug} block className="text-center w100px dinblock" size="large" placeholder={"Dose"} />
                <Dropdown mobile={mobile} className="w200px" block theme={selectedIssueUnit ? "primary" : null} hideDropdownHeader hideHeader onChange={this.selectIssueUnit.bind(this)} size={"large"} dataSource={['Pill(s)', 'Tab(s)', 'Bottle(s)', 'Oz', 'mg', 'g', 'Ea']} title={selectedIssueUnit ? selectedIssueUnit : 'Unit'} />
              </Toolbar>

              {selectedIssueUnit ? <DatePicker onClick={this.toggleStartDateDropdown.bind(this)} open={selectStartDateOpen} block mobile onSelect={this.selectStartDate.bind(this)} size={"large"} className="mb20" title={selectedStartDate ? selectedStartDate.toDateString() : 'Start Date'} /> : null}
              {selectedStartDate ? <Toolbar flex spacing block><Button block theme={refill ? "primary" : "default"} onClick={this.toggleRefill.bind(this)} checked={refill} advanced size="large">Refillable</Button><Button block advanced theme={hasEndDate ? "primary" : "default"} checked={hasEndDate} size="large" onClick={this.toggleEndDate.bind(this)}>End date</Button></Toolbar> : null}
              {hasEndDate ? <DatePicker onClick={this.toggleEndDateDropdown.bind(this)} open={selectEndDateOpen} onSelect={this.selectEndDate.bind(this)} block mobile size={"large"} className="mt20" title={'End Date'} /> : null}
              {selectedStartDate ? <Input advanced error={selectedInscription === ''} onChange={this.updateInscription.bind(this)} block size="large" className="mtb20" type="text" placeholder="Inscription" /> : null}
              {selectedStartDate ?
                <Toolbar noRadius block className="border-all">
                  <Button block>Must Sign Below:</Button>
                  <SignatureCanvas penColor='black' canvasProps={{ width: 500, height: 100, className: 'sigCanvas' }} />
                </Toolbar> : null}
              {selectedStartDate ? <Button disabled={!selectedDrug || !selectedIssueUnit || !selectedDose || selectedInscription === ''} block onClick={this.confirmPrescription.bind(this)} outline theme="error" size={"large"} className="mtb20">Submit Prescription</Button> : null}

            </div>
          </Layer>
        </Wizard>

      </Layer>
    )
  }
}


let arrayOfPast = [
  {
    drug: 'Advil',
    startDate: '1/1/2018'
  },
  {
    drug: 'Zoloft',
    startDate: '1/2/2018'
  }
];
