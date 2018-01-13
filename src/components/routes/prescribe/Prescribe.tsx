
import * as React from 'react';

import { Layer,Open, Emerge, Stepper,Loading, Table, Button, Wizard, Toolbar, Dropdown, DatePicker, Toggle, Input } from '../../../../recoil/src/index';

import { observer } from 'mobx-react';

import { appStore, prescribeStore } from '../../../stores/_GlobalStore';

import {IPrescribeProps} from '../../../interfaces/views/IPrescribeProps';

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
        prescribeStore.selectPatient(patient);
    }

    gotoPrescribeIndex(index) {
        prescribeStore.gotoPrescribeIndex(index);
    }

    render() {

        let {formIndex, selectedDrug, prescribeIndex, selectedIssueUnit,selectedPatient, selectedStartDate, hasEndDate, refill} = prescribeStore;

        let columnsTemplate = (item, index) =>{
            return <Button className="ps20" block simple size="large">{item}</Button>;
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
                                    <small>Lets start by selecting a patient:</small>
                                </h2>
                                <Table onRowSelect={this.selectPatient.bind(this)} rowIsSelectable="single" className="h100" hideHeader fill flex hideFooter dataSource={arrayOfNames} columns={[{name: '_Array', template: columnsTemplate}]} pageSize={arrayOfNames.length} />
                            </Layer>
                            <Open className="border-top" if={selectedPatient !== ''} openToHeight={'86px'}>
                             <Button className="w400px center-width mtb20" onClick={this.gotoSlideIndex.bind(this, 2)} outline theme="error" size={"large"}>Prescribe for {selectedPatient}</Button>
                            </Open>
                        </Layer>
                        <Layer fill flexCenter>


                                <Wizard fill slideIndex={prescribeIndex}>
                                    <Layer flexCenter fill>
                                        <div className="w400px center-width">
                                            <Button onClick={this.gotoPrescribeIndex.bind(this, 1)} className="mb20" outline block theme="error" size="large" icon="plus">Create new prescription</Button>

                                            <h2 className="mb20 text-left">
                                                <small>Prescription(s) for {selectedPatient}:</small>
                                            </h2>
                                           
                                            <div className="border-bottom mb10 border-all pt10 text-left">
                                                <div className="ps10"><strong>Advil</strong> - 200mg - Pills</div>
                                                <div className="ps10 mb10"><small>10/22/2018</small></div>
                                                <Toolbar noRadius block>
                                                    <Button block icon="autorenew" materialIcon>Refill</Button>   
                                                </Toolbar>                                        
                                            </div>

                                            <div className="border-bottom border-all pt10 text-left">
                                                <div className="ps10"><strong>Zoloft</strong> - 20mg - Bottle</div>
                                                <div className="ps10 mb10"><small>1/2/2018</small></div>
                                                <Toolbar noRadius block>
                                                    <Button block icon="autorenew" materialIcon>Refill</Button>   
                                                </Toolbar>                                        
                                            </div>
                                        </div>
                                    </Layer>

                                    <Layer fill flexCenter>
                                        <div className="w400px center-width">
                                            <h2 className="mb20 text-center">
                                                <small>Create a prescription:</small>
                                              </h2>

                                            <Toolbar block flex className="mb20 w400px" flush>
                                                <Dropdown block hideDropdownHeader hideHeader title={selectedDrug ? selectedDrug :  'Drug'} theme={selectedDrug ? "primary" : null} onChange={this.selectDrug.bind(this)} selectedElements={[selectedDrug]} size={"large"} dataSource={['Advil', 'Omprezole', 'Cadvil', 'Zelle']} />
                                                <Input block className="text-center w100px dinblock" size="large" placeholder={"Dose"} />
                                                <Dropdown block theme={selectedIssueUnit ? "primary" : null} hideDropdownHeader hideHeader onChange={this.selectIssueUnit.bind(this)} size={"large"} dataSource={['Pill(s)', 'Tab(s)', 'Bottle(s)', 'Oz', 'mg', 'g', 'Ea']} title={selectedIssueUnit ? selectedIssueUnit : 'Unit'} />
                                            </Toolbar>
    
                                            {selectedIssueUnit ? <DatePicker mobile onSelect={this.selectStartDate.bind(this)} size={"large"} className="mb20" title={selectedStartDate ?  selectedStartDate.toDateString() : 'Start Date'} />: null}
                                            {selectedStartDate ? <Toolbar flex spacing block><Button block theme={refill ? "primary" : "default"} onClick={this.toggleRefill.bind(this)} checked={refill} advanced size="large">Refillable</Button><Button block advanced theme={hasEndDate ? "primary" : "default"} checked={hasEndDate} size="large" onClick={this.toggleEndDate.bind(this)}>End date</Button></Toolbar>: null}
                                            {hasEndDate ? <DatePicker mobile size={"large"} className="mtb20 w300px" title={'End Date'} />: null}
                                            {selectedStartDate ? <Input block size="large" className="mtb20" type="text" placeholder="Inscription" />: null}                                
                                            {selectedStartDate ? <Button onClick={this.gotoSlideIndex.bind(this, 3)} outline theme="error" size={"large"} className="mtb20 w300px">Submit Prescription</Button>: null}
                                
                                        
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
                    </Wizard> 
                </Layer>
                <Layer className="p10 border-top w1000px center-width">
                    <Stepper stepIndex={prescribeStore.slideIndex}>
                        <Button advanced checked={prescribeStore.slideIndex === 0} onClick={this.gotoSlideIndex.bind(this, 0)} outline size="small">Intro</Button>
                        <Button advanced checked={prescribeStore.slideIndex === 1} onClick={this.gotoSlideIndex.bind(this, 1)} outline size="small">Assign</Button>
                        <Button advanced checked={prescribeStore.slideIndex === 2} onClick={this.gotoSlideIndex.bind(this, 2)} outline size="small">Prescription</Button>
                        <Button advanced checked={prescribeStore.slideIndex === 3} onClick={this.gotoSlideIndex.bind(this, 3)} outline size="small">Confirm</Button>
                    </Stepper>
                </Layer>
            </Layer>
        )
    }
} 

let arrayOfNames = [
'Abbott',
'Acevedo',
'Acosta',
'Adams',
'Adkins',
'Aguilar',
'Aguirre',
'Albert',
'Alexander',
'Alford',
'Allen',
'Allison',
'Alston',
'Alvarado',
'Alvarez',
'Anderson',
'Andrews',
'Anthony',
'Armstrong',
'Arnold',
'Ashley',
'Atkins',
'Atkinson',
'Austin',
'Avery',
'Avila',
'Ayala',
'Ayers',
'Bailey',
'Baird',
'Baker',
'Baldwin',
'Ball',
'Ballard',
'Banks',
'Barber',
'Barker',
'Barlow',
'Barnes',
'Barnett',
'Barr',
'Barrera',
'Barrett',
'Barron',
'Barry',
'Bartlett',
'Barton',
'Bass',
'Bates',
'Battle',
'Bauer',
'Baxter',
'Beach',
'Bean',
'Beard',
'Beasley',
'Beck',
'Becker',
'Bell',
'Bender',
'Benjamin',
'Bennett',
'Benson',
'Bentley',
'Benton',
'Berg',
'Berger',
'Bernard',
'Berry',
'Best',
'Bird',
'Bishop',
'Black',
'Blackburn',
'Blackwell',
'Blair',
'Blake',
'Blanchard',
'Blankenship',
'Blevins',
'Bolton',
'Bond']



// <div className="border-bottom border-top ptb10">
// <Button size="small" simple block className="mb10 dblock text-left">Start date: <strong>10/22/2018</strong> , End date: <strong>till consumed</strong></Button>

// <Toolbar block flush flex textCenter>
//     <Button outline block> <strong>Advil</strong> - 200mg - Pills</Button>
//     <Button icon="autorenew" materialIcon block>Refill</Button>
// </Toolbar>
// </div>
// <div className="border-bottom ptb10">
// <Button size="small" simple block className="mb10 dblock text-left">Start date: <strong>10/22/2018</strong> , End date: <strong>till consumed</strong></Button>

// <Toolbar block flush flex textCenter>
//     <Button outline block> <strong>Zoloft</strong> - 10oz - Bottle</Button>
//     <Button icon="autorenew" materialIcon block>Refill</Button>
// </Toolbar>
// </div>



