import * as React from 'react';

import {Recoil, Table, Button, Toolbar, Input, Emerge, Layer, SlideIn, Loading, Open, Checkbox} from '../../../recoil/src/index';

import {observer, inject} from 'mobx-react';

import RouterButton from '../helpers/RouterButton';
import {AuthButton} from '../helpers/AuthButton';

import {IMenuPane} from '../../interfaces/components/navigation/IMenuPane';

@inject('authStore', 'appStore', 'prescriptionsStore')
@observer
export default class MenuPane extends React.Component<IMenuPane, any> {
    deleteAllPrescriptions(){
        this.props.prescriptionsStore.deleteAllPrescriptions();
    }
    render() {

        let {history} = this.props;
        let appStore = this.props.appStore;
        let user = this.props.authStore.user;
        let prescriptionsStore = this.props.prescriptionsStore;

        return (
            <SlideIn className="z5" if={appStore.menu} from="top" fill>
                <Layer flexCenter className="text-center pt50" fill theme="dark">
                    <Emerge if={appStore.menu}>
                        <div className="p10">
                            <h2>Welcome back <strong>{user.email}</strong></h2>
                            <h3 className="mb50">Start prescribing to get started!</h3>
                            <div className="mb50">
                                <img onClick={this.deleteAllPrescriptions.bind(this)} className="profile-pic" height={132} width={102} src={'http://dermamedicalgroup.com/wp-content/uploads/2014/05/MDoc.jpg'} />
                            </div>
                            <Toolbar textCenter block className="w300px center-width" spacing vertical>
                                <RouterButton block materialIcon size="large" theme="primary" history={history} icon="highlight" route="/prescribe" title="Prescribe medication" />
                                {prescriptionsStore.list.length ? <RouterButton block materialIcon size="large" history={history} icon="sort" route="/prescriptions" title={prescriptionsStore.list.length + " Prescription(s)"} /> : null}
                                <AuthButton buttonProps={{block: true, theme: 'default'}} />                            
                            </Toolbar>
                        </div>
                    </Emerge>
                </Layer>
            </SlideIn>
        )
    }
}