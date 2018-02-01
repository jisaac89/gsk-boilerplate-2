
import * as React from 'react';

import { Layer, Emerge, Loading } from '../../../../recoil/src/index';

import { observer } from 'mobx-react';

@observer
export default class Saving extends React.Component<{}, {}> {

    render() {

        return (
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
        )
    }
} 
