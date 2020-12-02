import React from "react";
import Filters from "../../filters/components/filters.component";
import {DataType, DedupeType, FiltersModel, FilterType} from "../../filters/models/filters.model";
import FilterOptionsProvider from "../../filters/services/filterOptionsProvider.service";
import {DedupeModel, DedupeResolutionMethodValue, InternalStatus} from "../../results/models/dedupe.model";
import fetchDedupes from "../../results/services/dedupeDataProvider.service";
import Results from "../../results/components/results.component";
import {FiltersUiModel} from "../../filters/components/filtersUi.model";
import Header from "../../header/components/header.component";
import ContentWrapper from "./contentWrapper.component";
import Loading from "../../../sharedModules/shared/components/loading.component";
import NetworkError from "../../../sharedModules/boot/components/networkError.component";
import PleaseSelect, {PleaseSelectType} from "../../../sharedModules/mainPage/components/pleaseSelect.component";
import {
    ChangeResolutionMethod,
    SetResolutionValue
} from "../../resolutionMethodCell/components/resolutionMethodCell.component";
import {changeResolutionMethod, setResolutionValue} from "../services/dedupeData.service";
import {resolveDedupe} from "../services/saveDedupe.service";
import {OptionsObject, SnackbarKey, SnackbarMessage, withSnackbar} from "notistack";
import {Typography} from "@material-ui/core";
import {UnresolveConfirm} from "./unresolveConfirm.component";


class Main extends React.Component<{
    enqueueSnackbar: (message: SnackbarMessage, options?: OptionsObject) => SnackbarKey;
    closeSnackbar: (key?: SnackbarKey) => void;
}, {
    selectedFilters:FiltersModel,
    results: {
        dedupes: DedupeModel[],
        selectedFilters: FiltersModel
    }
    ui: {
        filtersOpen: boolean,
        unresolveConfirmOpen: boolean,
        error: {
            filters?: boolean,
            results?: boolean
        },
        loading: {
            filters?: boolean,
            results?: boolean,
        }
    },
}> {
    filterOptionsProvider:FilterOptionsProvider = new FilterOptionsProvider();
    filtersUi:FiltersUiModel;
    constructor(props) {
        super(props);
        this.state = {
            selectedFilters: {
                dedupeType: DedupeType.pure,
                operatingUnit: null,
                dataType: null,
                period: null,
                agency: null,
                technicalArea: null,
                includeResolved: false,
            },
            results: {
                dedupes: null,
                selectedFilters: null
            },
            ui: {
                filtersOpen: true,
                error: {},
                loading:{
                    filters: true
                },
                unresolveConfirmOpen: false
            },
        };
        this.filterOptionsProvider.init().then(()=>{
            this.updateUi({filters: false}, {filters: false});
        }).catch(()=>{
            this.updateUi({filters: false}, {filters: true});
        });
        this.filtersUi = {
            filtersOpen: null,
            closeFilters: ()=>this.uiSetFiltersOpen(false),
            collapseFilters: ()=>this.uiSetFiltersOpen(!this.state.ui.filtersOpen),
            openFilters: ()=>this.uiSetFiltersOpen(true)
        };
    }

    updateUi = (loading:{filters?:boolean, results?:boolean}, error: {filters?:boolean, results?:boolean},filtersOpen?:boolean, unresolveConfirmOpen?:boolean)=>{
        let ui = this.state.ui;
        if (loading) ui.loading = loading;
        if (error) ui.error = error;
        if (typeof filtersOpen==='boolean') ui.filtersOpen = filtersOpen;
        if (typeof unresolveConfirmOpen==='boolean') ui.unresolveConfirmOpen = unresolveConfirmOpen;
        this.setState({ui});
    }

    onSearchClick = ()=>{
        this.updateUi({results: true}, {results: false});
        let selectedFilters = {...this.state.selectedFilters};
        fetchDedupes(this.state.selectedFilters).then(dedupes=>{
            this.setState({results: {dedupes, selectedFilters}});
            this.updateUi({results: false}, {results: false});
        }).catch(()=>{
            this.setState({results: {dedupes: null, selectedFilters}});
            this.updateUi({results: false}, {results: true});
        });
    };

    onFiltersSelect = (filterType:FilterType, filterValue:string|boolean):void=>{
        if (this.state.selectedFilters[filterType]===filterValue) return;
        let selectedFilters = {...this.state.selectedFilters};
        // @ts-ignore
        selectedFilters[filterType] = filterValue;
        this.setState({selectedFilters});
    };

    updateDedupes = (dedupes:DedupeModel[])=>{
        this.setState({results:{dedupes, selectedFilters: this.state.results.selectedFilters}});
    }

    changeResolutionMethod:ChangeResolutionMethod = (dedupeId:number, resolvedBy:DedupeResolutionMethodValue)=>{
        this.updateDedupes(changeResolutionMethod(this.state.results.dedupes, dedupeId, resolvedBy));
    };

    setResolutionValue:SetResolutionValue = (dedupeId:number, customValue)=>{
        this.updateDedupes(setResolutionValue(this.state.results.dedupes, dedupeId, customValue));
    };

    renderResults(){
        if (this.state.ui.loading.results) return <Loading message={'Searching duplicates...'} margin={100} />;
        if (this.state.ui.error.results) return <NetworkError/>;
        if (!this.state.results.dedupes) return <PleaseSelect type={PleaseSelectType.ou}/>;
        return <Results
            filteredDedupes={this.state.results.dedupes}
            setResolutionValue={this.setResolutionValue}
            changeResolutionMethod={this.changeResolutionMethod}
            resolveDedupe={this.resolveDedupe}
            unresolveDedupe={this.unresolveDedupe}
        />;
    }

    resolveDedupe = (id:number)=>{
        let dedupe:DedupeModel = this.state.results.dedupes[id-1];
        resolveDedupe(dedupe).then((worked:boolean)=>{
            this.props.enqueueSnackbar(`Resolved`);
            dedupe.resolution.original_resolutionMethodValue = JSON.parse(JSON.stringify(dedupe.resolution.resolutionMethodValue));
            dedupe.status = InternalStatus.resolvedOnServer;
            this.setState({results:this.state.results});
        });
    }

    uiSetFiltersOpen = (open:boolean)=>{
        // let ui = {...this.state.ui};
        // ui.filtersOpen = open;
        // this.setState({ui})
        this.updateUi(null,null,open,null);
    };

    onUnresolveDialogClose = (confirmed:boolean)=>{
        console.log('confirmed?',confirmed);
        this.updateUi(null,null,null,false);
    }

    unresolveDedupe = (id:number)=>{
        console.log(id);
        // let ui = this.state.ui;
        // ui.unresolveConfirmOpen = true;
        // this.setState({ui});
        this.updateUi(null,null,null,true);
    }

    renderPreselect(){
        if(process.env.NODE_ENV === 'production') return null;
        if(this.state.results.dedupes) return null;
        return <div style={{position: 'fixed', top: 50, right: 10}}>
            <Typography onClick={()=>this.preselect('XtxUYCsDWrR','2020Q4', DedupeType.pure)}>1.Rwanda</Typography>
            <Typography onClick={()=>this.preselect('PqlFzhuPcF1','2020Q4',DedupeType.pure)}>2.Nigeria</Typography>
            <Typography onClick={()=>this.preselect('f5RoebaDLMx','2020Q4',DedupeType.crosswalk)}>3.Zambia</Typography>
            <Typography onClick={()=>this.preselect('l1KFEXKI4Dg','2020Q4',DedupeType.pure)}>4.Botswana</Typography>
            <Typography onClick={()=>this.preselect('bQQJe0cC1eD','2020Q4',DedupeType.crosswalk)}>5.Cameroon</Typography>
            <Typography onClick={()=>this.preselect('IH1kchw86uA','2020Q4',DedupeType.crosswalk)}>6.Ethiopia</Typography>
            <Typography onClick={()=>this.preselect('l1KFEXKI4Dg','2020Q3',DedupeType.pure)}>7.Full list</Typography>
        </div>;
    }

    preselect = (orgUnitId:string, period:string, dedupeType:DedupeType)=>{
        let selectedFilters = {...this.state.selectedFilters};
        selectedFilters.operatingUnit = orgUnitId;
        selectedFilters.dataType = DataType.results;
        selectedFilters.period = period;
        selectedFilters.dedupeType = dedupeType;
        selectedFilters.includeResolved = true;
        this.setState({selectedFilters});
        setTimeout(this.onSearchClick, 0);
    };


    render() {
        if (this.state.ui.error.filters) return <NetworkError/>;
        if (this.state.ui.loading.filters) return <Loading message={'Loading...'} margin={100}/>;
        return <React.Fragment>
            <Filters
                selectedFilters={this.state.selectedFilters}
                onFiltersSelect={this.onFiltersSelect}
                filterOptionsProvider={this.filterOptionsProvider}
                onSearchClick={this.onSearchClick}
                filtersUi={{...this.filtersUi, filtersOpen: this.state.ui.filtersOpen}}
            />
            <ContentWrapper filtersUi={{...this.filtersUi, filtersOpen: this.state.ui.filtersOpen}}>
                {!this.state.ui.filtersOpen && <Header
                    selectedFilters={this.state.results.selectedFilters}
                    filterOptionsProvider={this.filterOptionsProvider}
                    filtersUi={{...this.filtersUi, filtersOpen: this.state.ui.filtersOpen}}
                />}
                {this.renderResults()}
                {this.renderPreselect()}
            </ContentWrapper>
            {this.state.results.dedupes&&<UnresolveConfirm
                isOpen={this.state.ui.unresolveConfirmOpen}
                onClose={this.onUnresolveDialogClose}
            />}
        </React.Fragment>;
    }
}
export default withSnackbar(Main);