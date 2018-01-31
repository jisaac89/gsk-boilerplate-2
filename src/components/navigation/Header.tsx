import * as React from 'react';

import {Toolbar, Button, Layer} from '../../../recoil/src/index';

import {observer, inject} from 'mobx-react';

@inject('appStore')
@observer
export default class Header extends React.Component<any, any> {

    toggleNightmode(){
        this.props.appStore.toggleNightmode();
    }

    toggleMenu(){
        this.props.appStore.toggleMenu();
    }

    render() {
        return (
            <Layer className="z5">
                <Toolbar flex block textCenter spacing className="p10">
                    <Button materialIcon simple icon={"menu"} onClick={this.toggleMenu.bind(this)}>
                    </Button>   
                    <Button materialIcon simple icon={"album"} onClick={this.toggleNightmode.bind(this)}>
                    </Button>
                </Toolbar>
            </Layer>
            )
        } 
} 