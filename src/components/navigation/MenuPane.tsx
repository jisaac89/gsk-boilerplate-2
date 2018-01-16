import * as React from 'react';

import {Recoil, Table, Button, Toolbar, Input, Emerge, Layer, SlideIn, Loading, Open, Checkbox} from '../../../recoil/src/index';

import {observer} from 'mobx-react';

import {appStore, prescribeStore, prescriptionsStore} from '../../stores/_GlobalStore';

import RouterButton from '../helpers/RouterButton';

@observer
export default class MenuPane extends React.Component<any, any> {
    render() {

        let {history} = this.props;

        return (
            <SlideIn className="z5" if={appStore.menu} from="top" fill>
                <Layer flexCenter className="text-center pt50" fill theme="dark">
                    <Emerge enter="fadeIn" if={appStore.menu}>
                        <div>
                            <h2>Welcome <strong>Dr. Iveth lujan</strong></h2>
                            <h3 className="mb50">Start prescribing to get started!</h3>
                            <div className="mb50">
                                <img className="profile-pic" height={132} width={102} src={'http://www.apollonion.com/assets/image/imagesplashdoc/women-img0001.png'} />
                            </div>
                            <Toolbar block className="w300px center-width" spacing vertical>
                                <RouterButton block materialIcon size="large" theme="primary" history={history} icon="highlight" route="/prescribe" title="Prescribe medication" />
                                {prescriptionsStore.prescriptions.length ? <RouterButton block materialIcon size="large" history={history} icon="sort" route="/prescriptions" title={prescriptionsStore.prescriptions.length + " Prescription(s)"} /> : null}
                            </Toolbar>
                        </div>
                    </Emerge>
                </Layer>
            </SlideIn>
        )
    } 
}  