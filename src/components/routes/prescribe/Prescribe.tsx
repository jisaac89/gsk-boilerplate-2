
import * as React from 'react';

import { Layer,Open, Emerge, Stepper,Loading, Table, Button, Wizard, Toolbar, Dropdown, DatePicker, Toggle, Input } from '../../../../recoil/src/index';

import { observer } from 'mobx-react';

import { appStore, prescribeStore } from '../../../stores/_GlobalStore';

import {IPrescribeProps} from '../../../interfaces/views/IPrescribeProps';

import SignatureCanvas from 'react-signature-canvas';

@observer
export default class Prescribe extends React.Component<IPrescribeProps, {}> {

    constructor(props) {
        super(props);
    }

    gotoSlideIndex(n: number){
        prescribeStore.gotoSlideIndex(n);
    }

    selectDrug(drug) {
        prescribeStore.selectDrug(drug);
    }

    selectIssueUnit(issueUnit){
        prescribeStore.selectIssueUnit(issueUnit);
    }

    selectStartDate(date){
        prescribeStore.selectStartDate(date);
    } 
    
    toggleEndDate() { 
        prescribeStore.toggleEndDate();
    }

    toggleRefill(){
        prescribeStore.toggleRefill();
    }

    selectPatient(patient){
        prescribeStore.selectPatient(patient.name.first);
    }

    gotoPrescribeIndex(index) {
        prescribeStore.gotoPrescribeIndex(index);
    }

    updateInscription(inscription){
        prescribeStore.updateInscription(inscription);
    }

    confirmPrescription(){
        prescribeStore.confirmPrescription();
    }

    toggleStartDateDropdown(){
        prescribeStore.toggleStartDateDropdown();
    }

    selectDose(value){
      prescribeStore.selectDose(value)
    }

    goBackToDashboard(){
      prescribeStore.resetPrescriptionForm(); 
      appStore.toggleMenu();
    }

    render() {

        let {formIndex, selectedDrug, prescribeIndex, selectedIssueUnit,selectedPatient,selectedInscription, selectedStartDate, selectStartDateOpen, hasEndDate, refill} = prescribeStore;

        let columnsTemplate = (item, index) =>{
            return <Button className="ps20" block simple size="large">{item.name.first}</Button>;
        }
        let menuTemplate = (item, index) => {
          return (
              <Toolbar block>
                  <Button right materialIcon icon="autorenew" iconLocation="left" theme="error" outline size="small">refill</Button>
              </Toolbar>
          )
      }
        return (
            <Layer fill flex>
                <Layer fill flex>
                    <Wizard fill flex slideIndex={prescribeStore.slideIndex}>
                        <Layer fill  flexCenter>
                            <Emerge if={!appStore.menu}>
                                <Layer className="p20">
                                    <i className="material-icons super-xl mb20 floatL">highlight</i>
                                    <h2 className="mb20">Prescribe medication</h2>
                                    <h1 className="mb20">
                                        <small>This wizard will take you through the process of assigning a medication to a patient.</small>
                                    </h1>
                                    
                                    <Toolbar block size="large" className="mt20">
                                        <Button onClick={this.gotoSlideIndex.bind(this, 1)} icon="chevron-right" outline theme="error">Get Started</Button>
                                    </Toolbar>
                                </Layer>
                            </Emerge>
                        </Layer>
                        <Layer fill flex overflow>
                            <Layer fill overflow>
                                <h2 className="p10 border-top border-bottom">
                                    <small>Start by selecting a patient</small>
                                </h2>
                                <Table focusOnMount={selectedPatient === ''} searchableKeys={['name.first']} searchTitle="Search by Name or ID" onRowSelect={this.selectPatient.bind(this)} rowIsSelectable="single" className="h100" hideHeader fill flex hideFooter dataSource={arrayOfNames} columns={[{name: 'name.first', template: columnsTemplate}]} pageSize={arrayOfNames.length} />
                            </Layer>
                            <Open className="border-top ps10" if={selectedPatient !== ''} openToHeight={'86px'}>
                                <Button className="w400px center-width mtb20" onClick={this.gotoSlideIndex.bind(this, 2)} outline theme="error" size={"large"}>Select {selectedPatient}</Button>
                            </Open>
                        </Layer>
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
                                                <Table searchTitle={'Search by startDate or patient.'} searchableKeys={['drug', 'startDate']} columns={[{name: 'drug', width: 100}, {name: 'startDate'}, {template: menuTemplate}]} dataSource={arrayOfPast} />
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
                                                <Dropdown className="w200px" block hideDropdownHeader hideHeader title={selectedDrug ? selectedDrug :  'Drug'} theme={selectedDrug ? "primary" : null} onChange={this.selectDrug.bind(this)} selectedElements={[selectedDrug]} size={"large"} dataSource={['Tivicay', 'Advil', 'Omprezole', 'Celebrex', 'Cadvil', 'Zelle']} />
                                                <Input onChange={this.selectDose.bind(this)} focusOnMount={selectedDrug} block className="text-center w100px dinblock" size="large" placeholder={"Dose"} />
                                                <Dropdown className="w200px" block theme={selectedIssueUnit ? "primary" : null} hideDropdownHeader hideHeader onChange={this.selectIssueUnit.bind(this)} size={"large"} dataSource={['Pill(s)', 'Tab(s)', 'Bottle(s)', 'Oz', 'mg', 'g', 'Ea']} title={selectedIssueUnit ? selectedIssueUnit : 'Unit'} />
                                            </Toolbar>
    
                                            {selectedIssueUnit ? <DatePicker onClick={this.toggleStartDateDropdown.bind(this)} open={selectStartDateOpen} block mobile onSelect={this.selectStartDate.bind(this)} size={"large"} className="mb20" title={selectedStartDate ?  selectedStartDate.toDateString() : 'Start Date'} />: null}
                                            {selectedStartDate ? <Toolbar flex spacing block><Button block theme={refill ? "primary" : "default"} onClick={this.toggleRefill.bind(this)} checked={refill} advanced size="large">Refillable</Button><Button block advanced theme={hasEndDate ? "primary" : "default"} checked={hasEndDate} size="large" onClick={this.toggleEndDate.bind(this)}>End date</Button></Toolbar>: null}
                                            {hasEndDate ? <DatePicker block mobile size={"large"} className="mt20" title={'End Date'} />: null}
                                            {selectedStartDate ? <Input advanced onChange={this.updateInscription.bind(this)} block size="large" className="mtb20" type="text" placeholder="Inscription" />: null}                                
                                            {selectedStartDate ?  
                                            <Toolbar noRadius block className="border-all">
                                              <Button block>Must Sign Below:</Button>
                                              <SignatureCanvas penColor='black' canvasProps={{width: 500, height:100, className: 'sigCanvas'}} />
                                            </Toolbar> : null}
                                            {selectedStartDate ? <Button block onClick={this.confirmPrescription.bind(this)} outline theme="error" size={"large"} className="mtb20">Submit Prescription</Button>: null}
                                
                                        </div>
                                    </Layer>
                                </Wizard>

                        </Layer>
                        <Layer fill flex overflow>
                            <Layer fill overflow flexCenter>
                                <Loading if={true} size="xlarge" />
                                <h1 className="mt20">
                                    <Emerge delay={2500} enter={"fadeIn"}>
                                        <small className="mb20 dblock">Please wait...</small>
                                        <small className="mb20 dblock">Storing prescription to private blockchain.</small>
                                        <small>Sending secure form to patient.</small>
                                    </Emerge>
                                </h1>
                            </Layer>
                        </Layer>
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
                    </Wizard> 
                </Layer>
                <Layer className="p10 dark border-top w100 center-width">
                    <Stepper stepIndex={prescribeStore.slideIndex}>
                        <Button advanced checked={prescribeStore.slideIndex === 0} onClick={this.gotoSlideIndex.bind(this, 0)} simple size="small">Intro</Button>
                        <Button advanced checked={prescribeStore.slideIndex === 1} onClick={this.gotoSlideIndex.bind(this, 1)} simple size="small">Assign</Button>
                        <Button advanced checked={prescribeStore.slideIndex === 2} onClick={this.gotoSlideIndex.bind(this, 2)} simple size="small">Prescription</Button>
                        <Button advanced checked={prescribeStore.slideIndex === 3} onClick={this.gotoSlideIndex.bind(this, 3)} simple size="small">Confirm</Button>
                    </Stepper>
                </Layer>
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

let arrayOfNames = [
  {
    "name": {
      "first": "Hurst Todd"
    },
    "_id": "5a5bd19ebfc1244cb7ab7577"
  },
  {
    "name": {
      "first": "Bell Blake"
    },
    "_id": "5a5bd19e6db66f8a5ef59e60"
  },
  {
    "name": {
      "first": "Pauline Knowles"
    },
    "_id": "5a5bd19eecaf8711d315970f"
  },
  {
    "name": {
      "first": "Elinor Blevins"
    },
    "_id": "5a5bd19e8c2cc15803ad6c0e"
  },
  {
    "name": {
      "first": "Weber Sosa"
    },
    "_id": "5a5bd19effea4e01f06fb89f"
  },
  {
    "name": {
      "first": "Jenny Richardson"
    },
    "_id": "5a5bd19e3eddddd1d4d48bd2"
  },
  {
    "name": {
      "first": "Morris Morin"
    },
    "_id": "5a5bd19e27b871384a1dd295"
  },
  {
    "name": {
      "first": "Dena Velez"
    },
    "_id": "5a5bd19ef0186cb0b8722b98"
  },
  {
    "name": {
      "first": "Nichols Bates"
    },
    "_id": "5a5bd19e9bbbd4e05981cabb"
  },
  {
    "name": {
      "first": "England Hansen"
    },
    "_id": "5a5bd19eb57b944ccc126f86"
  },
  {
    "name": {
      "first": "Payne Wallace"
    },
    "_id": "5a5bd19eb66645f27e6ad59b"
  },
  {
    "name": {
      "first": "Rhea Strong"
    },
    "_id": "5a5bd19efa7a73fc3851d2d3"
  },
  {
    "name": {
      "first": "Clarke Sears"
    },
    "_id": "5a5bd19e03eea9f92ad32108"
  },
  {
    "name": {
      "first": "Nelda Short"
    },
    "_id": "5a5bd19e8704240d46f2ce37"
  },
  {
    "name": {
      "first": "Hopkins Henry"
    },
    "_id": "5a5bd19e6be690159ba218fb"
  },
  {
    "name": {
      "first": "Lawanda Glass"
    },
    "_id": "5a5bd19e17ad6aa7c5704346"
  },
  {
    "name": {
      "first": "Ophelia Horton"
    },
    "_id": "5a5bd19edb333f96f244dfdb"
  },
  {
    "name": {
      "first": "Flossie Avery"
    },
    "_id": "5a5bd19e16198555743226fd"
  },
  {
    "name": {
      "first": "Pacheco Leblanc"
    },
    "_id": "5a5bd19e5ce9cd31ed118202"
  },
  {
    "name": {
      "first": "Mara Andrews"
    },
    "_id": "5a5bd19e61bc44429a7f4761"
  },
  {
    "name": {
      "first": "Janna Oneill"
    },
    "_id": "5a5bd19e1bfcf79ba43eecca"
  },
  {
    "name": {
      "first": "Cornelia Brewer"
    },
    "_id": "5a5bd19e4982d2e7f8bf0373"
  },
  {
    "name": {
      "first": "Georgina Herman"
    },
    "_id": "5a5bd19e52f82f911d73ca92"
  },
  {
    "name": {
      "first": "Robbins Ballard"
    },
    "_id": "5a5bd19ee74d0a17a7424876"
  },
  {
    "name": {
      "first": "Owen Cole"
    },
    "_id": "5a5bd19e08fbea1b8009d73b"
  },
  {
    "name": {
      "first": "Lesley Rowe"
    },
    "_id": "5a5bd19ee7d5dd0522416337"
  },
  {
    "name": {
      "first": "Beck Simpson"
    },
    "_id": "5a5bd19e49023a78217013b4"
  },
  {
    "name": {
      "first": "Salas Mayer"
    },
    "_id": "5a5bd19e1c258d4e57531629"
  },
  {
    "name": {
      "first": "Lynette Cunningham"
    },
    "_id": "5a5bd19e8ef1937e85d8c82e"
  },
  {
    "name": {
      "first": "Effie Perez"
    },
    "_id": "5a5bd19ec76511a53fc0709d"
  },
  {
    "name": {
      "first": "Jannie Nash"
    },
    "_id": "5a5bd19e44d41c50e6e1c7bb"
  },
  {
    "name": {
      "first": "Zimmerman Cherry"
    },
    "_id": "5a5bd19ef678297a6c2549eb"
  },
  {
    "name": {
      "first": "Ilene Bowers"
    },
    "_id": "5a5bd19e52e4430cb3b55a09"
  },
  {
    "name": {
      "first": "Elnora Blackburn"
    },
    "_id": "5a5bd19ed85d12a8df59643f"
  },
  {
    "name": {
      "first": "Kathleen Chavez"
    },
    "_id": "5a5bd19ec32c606a4f49409c"
  },
  {
    "name": {
      "first": "Vance Fitzpatrick"
    },
    "_id": "5a5bd19e707e80f65531758a"
  },
  {
    "name": {
      "first": "Gay Blackwell"
    },
    "_id": "5a5bd19ec59e7d48523bcde2"
  },
  {
    "name": {
      "first": "Wagner Miller"
    },
    "_id": "5a5bd19e5778ce9c3ca8a995"
  },
  {
    "name": {
      "first": "Letha Hutchinson"
    },
    "_id": "5a5bd19e5acbf1ce56f2d560"
  },
  {
    "name": {
      "first": "Yolanda Carver"
    },
    "_id": "5a5bd19e816a4c67105f4f8c"
  },
  {
    "name": {
      "first": "Hernandez Frost"
    },
    "_id": "5a5bd19e043f0972ab767da4"
  },
  {
    "name": {
      "first": "Georgia Porter"
    },
    "_id": "5a5bd19ee0a1f9e6d51da015"
  },
  {
    "name": {
      "first": "Gilbert Atkins"
    },
    "_id": "5a5bd19e19b35f7411a0f2ed"
  },
  {
    "name": {
      "first": "Maureen Cruz"
    },
    "_id": "5a5bd19e7425a5509e1289e6"
  },
  {
    "name": {
      "first": "Bobbi Dominguez"
    },
    "_id": "5a5bd19e63c46ef2860091c6"
  },
  {
    "name": {
      "first": "Glenda Lindsay"
    },
    "_id": "5a5bd19eb0106a50625f08c2"
  },
  {
    "name": {
      "first": "Fry Young"
    },
    "_id": "5a5bd19e059cd40fd0f810cc"
  },
  {
    "name": {
      "first": "Medina Kane"
    },
    "_id": "5a5bd19ee546ff613cb56448"
  },
  {
    "name": {
      "first": "Reid Fuentes"
    },
    "_id": "5a5bd19e00fb7319020b5a34"
  },
  {
    "name": {
      "first": "Justine Rosario"
    },
    "_id": "5a5bd19eedb1763700ad6814"
  }
]


{/* <div className="border-bottom mb10 border-all pt10 text-left">
<small className="ps10"><strong>Advil</strong> - 200mg - Pills</small>
<div className="ps10 mb10"><small>10/22/2018</small></div>
<Toolbar noRadius block>
    <Button block icon="autorenew" materialIcon>Refill</Button>   
</Toolbar>                                        
</div>

<div className="border-bottom border-all pt10 text-left">
<small className="ps10"><strong>Zoloft</strong> - 20mg - Bottle</small>
<div className="ps10 mb10"><small>1/2/2018</small></div>
<Toolbar noRadius block>
    <Button block icon="autorenew" materialIcon>Refill</Button>   
</Toolbar>                                        
</div> */}