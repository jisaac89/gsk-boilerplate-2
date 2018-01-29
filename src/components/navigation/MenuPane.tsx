import * as React from 'react';

import {Recoil, Table, Button, Toolbar, Input, Emerge, Layer, SlideIn, Loading, Open, Checkbox} from '../../../recoil/src/index';

import {observer} from 'mobx-react';

import {appStore, prescribeStore, prescriptionsStore} from '../../stores/_GlobalStore';

import RouterButton from '../helpers/RouterButton';
import {AuthButton} from '../helpers/AuthButton';

@observer
export default class MenuPane extends React.Component<any, any> {
    deleteAllPrescriptions(){
        prescribeStore.deleteAllPrescriptions();
    }
    render() {

        let {history} = this.props;

        return (
            <SlideIn className="z5" if={appStore.menu} from="top" fill>
                <Layer flexCenter className="text-center pt50" fill theme="dark">
                    <Emerge if={appStore.menu}>
                        <div className="p10">
                            <h2>Welcome <strong>Dr. Iveth</strong></h2>
                            <h3 className="mb50">Start prescribing to get started!</h3>
                            <div className="mb50">
                                <img onClick={this.deleteAllPrescriptions.bind(this)} className="profile-pic" height={132} width={102} src={'http://www.apollonion.com/assets/image/imagesplashdoc/women-img0001.png'} />
                            </div>
                            <Toolbar textCenter block className="w300px center-width" spacing vertical>
                                <RouterButton block materialIcon size="large" theme="primary" history={history} icon="highlight" route="/prescribe" title="Prescribe medication" />
                                {prescribeStore.list.length ? <RouterButton block materialIcon size="large" history={history} icon="sort" route="/prescriptions" title={prescribeStore.list.length + " Prescription(s)"} /> : null}
                                <AuthButton buttonProps={{block: true, theme: 'default'}} />                            
                            </Toolbar>
                        </div>
                    </Emerge>
                </Layer>
            </SlideIn>
        )
    } 
}  