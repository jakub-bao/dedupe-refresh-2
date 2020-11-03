import React from "react";
import {render} from "react-dom";
import {baseUrl} from "./sharedModules/shared/services/config.service";
import ThemeWrapper from "./sharedModules/boot/components/themeWrapper.component";
import "./index.css";
import {Provider} from "@dhis2/app-runtime";
import {HeaderBar} from '@dhis2/ui'
import FloatClear from "./sharedModules/shared/components/floatClear.component";
import Main from "./modules/main/components/main.component";

function Index(){
    return <Provider config={{baseUrl: baseUrl, apiVersion: 33}}>
        <div id='dhis2HeaderBar'>
            <HeaderBar/>
        </div>
        <ThemeWrapper>
            <Main/>
        </ThemeWrapper>
        <FloatClear/>
        <br/>
    </Provider>;
}

render(<Index/>, document.getElementById('root'));
