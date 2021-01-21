import React, {useState} from "react";
import {OptionsObject, SnackbarKey, SnackbarMessage, withSnackbar} from "notistack";
import {getData} from "../../shared/services/api.service";
import {networkCheckInterval} from "../../shared/services/config.service";

class NetworkCheck extends React.Component<{
    enqueueSnackbar: (message: SnackbarMessage, options?: OptionsObject) => SnackbarKey;
},{}>{
    constructor(props) {
        super(props);
        if (networkCheckInterval) setInterval(this.checkNetwork, networkCheckInterval*1000);
    }
    hasNetwork = true;
    checkNetwork = ()=>{
        getData('/me?fields=id')
            .then((result)=>{
                if (!this.hasNetwork) {
                    this.props.enqueueSnackbar(`You're back online`, {variant:'success'});
                    this.hasNetwork = true;
                }
            })
            .catch(()=>{
                if (this.hasNetwork) {
                    this.props.enqueueSnackbar(`You're now offline`, {variant:'error', persist: true});
                    this.hasNetwork = false;
                }
            })
    }
    render(){
        return null;
    }
}

export default withSnackbar(NetworkCheck);