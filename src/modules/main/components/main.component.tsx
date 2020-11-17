import React from "react";
import Filters from "../../filters/components/filters.component";
import {DataType, DedupeType, FiltersModel, FilterType} from "../../filters/models/filters.model";
import FilterOptionsProvider from "../../filters/services/filterOptionsProvider.service";
import {DedupeModel} from "../../results/models/dedupe.model";
import fetchDedupes from "../../results/services/dedupeDataProvider.service";
import Results from "../../results/components/results.component";
import {FiltersUiModel} from "../../filters/components/filtersUi.model";
import Header from "../../header/components/header.component";
import ContentWrapper from "./contentWrapper.component";
import Loading from "../../../sharedModules/shared/components/loading.component";
import NetworkError from "../../../sharedModules/boot/components/networkError.component";
import PleaseSelect, {PleaseSelectType} from "../../../sharedModules/mainPage/components/pleaseSelect.component";

export default class Main extends React.Component<{}, {
    selectedFilters:FiltersModel,
    results: {
        dedupes: DedupeModel[],
        selectedFilters: FiltersModel
    }
    ui: {
        filtersOpen: boolean,
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
                }
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

    updateUi = (loading:{filters?:boolean, results?:boolean}, error: {filters?:boolean, results?:boolean})=>{
        let ui = this.state.ui;
        if (loading) ui.loading = loading;
        if (error) ui.error = error;
        this.setState({ui});
    }

    onSearchClick = ()=>{
        this.updateUi({results: true}, {results: false});
        let selectedFilters = {...this.state.selectedFilters};
        fetchDedupes(this.state.selectedFilters).then(dedupes=>{
            console.log(dedupes);
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

    renderResults(){
        if (this.state.ui.loading.results) return <Loading message={'Searching duplicates...'} margin={100} />;
        if (this.state.ui.error.results) return <NetworkError/>;
        if (!this.state.results.dedupes) return <PleaseSelect type={PleaseSelectType.ou}/>;
        return <Results filteredDedupes={this.state.results.dedupes} />;
    }


    renderPreselect(){
        if(process.env.NODE_ENV === 'production') return null;
        return <div style={{position: 'fixed', top: 50, right: 10}}>
            <span onClick={()=>this.preselect('XtxUYCsDWrR','2020Q4', DedupeType.pure)}>Rwda</span>
            <span onClick={()=>this.preselect('PqlFzhuPcF1','2020Q4',DedupeType.pure)}>Ngia</span>
            <span onClick={()=>this.preselect('f5RoebaDLMx','2020Q4',DedupeType.crosswalk)}>Zbia</span>
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

    uiSetFiltersOpen = (open:boolean)=>{
        let ui = {...this.state.ui};
        ui.filtersOpen = open;
        this.setState({ui})
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
        </React.Fragment>;
    }
}