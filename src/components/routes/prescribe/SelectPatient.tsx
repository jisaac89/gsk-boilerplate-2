
import * as React from 'react';

import { Layer,Open, Emerge, Stepper,Loading, Table, Button, Wizard, Toolbar, Dropdown, DatePicker, Toggle, Input } from '../../../../recoil/src/index';

import { observer, inject } from 'mobx-react';

import {IPatient} from '../../../interfaces/data/IPatient';

@inject('prescribeStore', 'patientsStore')
@observer
export default class SelectPatient extends React.Component<any, {}> {
    
    selectPatient(patient: IPatient){
        this.props.prescribeStore.selectPatient(patient.firstName);
    }

    gotoSlideIndex(n: number){
        this.props.prescribeStore.gotoSlideIndex(n);
    }

    render() {
        let prescribeStore = this.props.prescribeStore;
        let patientsStore = this.props.patientsStore;
        let {selectedPatient} = prescribeStore;
        let columnsTemplate = (item, index) =>{
            return <Button className="ps20" block simple size="large">{item.firstName}</Button>;
        }
        return (
            <Layer fill>
                <Layer fill flex overflow>
                    <Layer fill overflow>
                        <h2 className="p10 border-top border-bottom">
                            <small>Start by selecting a patient</small>
                        </h2>
                        <Table focusOnMount={selectedPatient === ''} searchableKeys={['firstName']} searchTitle="Search by Name or ID" onRowSelect={this.selectPatient.bind(this)} rowIsSelectable="single" className="h100" hideHeader fill flex hideFooter dataSource={patientsStore.list} columns={[{name: 'firstName', template: columnsTemplate}]} pageSize={patientsStore.list.length} />
                    </Layer>
                    <Open className="border-top ps10" if={selectedPatient !== ''} openToHeight={'86px'}>
                        <Button className="w400px center-width mtb20" onClick={this.gotoSlideIndex.bind(this, 2)} outline theme="error" size={"large"}>Select {selectedPatient}</Button>
                    </Open>
                </Layer>
            </Layer>
        )
    }
} 
