import React from "react";
import Filters from "../../filters/components/filters.component";
import {FiltersModel, FilterType} from "../../filters/models/filters.model";
import FilterOptionsProvider from "../../filters/services/filterOptionsProvider.service";
import {DedupeModel} from "../../results/models/dedupe.model";
import fetchDedupes from "../../results/services/dedupeDataProvider.service";
import Results from "../../results/components/results.component";
import {FiltersUiModel} from "../../filters/components/filtersUi.model";
import Header from "../../header/components/header.component";
import ContentWrapper from "./contentWrapper.component";
import Loading from "../../../sharedModules/shared/components/loading.component";
import NetworkError from "../../../sharedModules/boot/components/networkError.component";

export default class Main extends React.Component<{}, {
    selectedFilters:FiltersModel,
    results: {
        dedupes: DedupeModel[],
        selectedFilters: FiltersModel
    }
    loadingFilterOptions: boolean,
    loadingDedupes: boolean,
    ui: {
        filtersOpen: boolean
    },
    error: boolean
}> {
    filterOptionsProvider:FilterOptionsProvider = new FilterOptionsProvider();
    filtersUi:FiltersUiModel;
    constructor(props) {
        super(props);
        this.state = {
            selectedFilters: {
                dedupeType: 'PURE',
                includeResolved: false,
                organisationUnit: null,
                dataType: null,
                period: null,
                agency: null,
                technicalArea: null,
            },
            results: {
                dedupes: null,
                selectedFilters: null
            },
            loadingFilterOptions: true,
            loadingDedupes: false,
            ui: {
                filtersOpen: true
            },
            error: false
        };
        this.filterOptionsProvider.init().then(()=>{
            this.setState({loadingFilterOptions:false});
        });
        this.filtersUi = {
            filtersOpen: null,
            closeFilters: ()=>this.uiSetFiltersOpen(false),
            collapseFilters: ()=>this.uiSetFiltersOpen(!this.state.ui.filtersOpen),
            openFilters: ()=>this.uiSetFiltersOpen(true)
        };
    }

    onSearchClick = ()=>{
        this.setState({loadingDedupes: true});
        let selectedFilters = {...this.state.selectedFilters};
        fetchDedupes(this.state.selectedFilters).then(dedupes=>{
            this.setState({results: {dedupes, selectedFilters}, loadingDedupes: false, error: false});
        }).catch(()=>{
            this.setState({loadingDedupes:false, results: {dedupes: null, selectedFilters}, error: true});
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
        if (this.state.loadingDedupes) return <Loading message={'Searching duplicates...'}/>;
        if (this.state.error) return <NetworkError/>;
        return <Results filteredDedupes={this.state.results.dedupes} />;
    }

    renderPreselect(){
        if(process.env.NODE_ENV === 'production') return null;
        return <div style={{position: 'absolute', bottom: 10, right: 10}}>
            <span onClick={()=>this.preselect('XtxUYCsDWrR')}>Rwanda</span>
            <span onClick={()=>this.preselect('PqlFzhuPcF1')}>Nigeria</span>
        </div>;
    }

    preselect = (orgUnitId:string)=>{
        let selectedFilters = {...this.state.selectedFilters};
        selectedFilters.organisationUnit = orgUnitId;
        selectedFilters.dataType = 'RESULTS';
        selectedFilters.period = '2020Q2';
        this.setState({selectedFilters});
        setTimeout(this.onSearchClick, 0);
    };

    uiSetFiltersOpen = (open:boolean)=>{
        let ui = {...this.state.ui};
        ui.filtersOpen = open;
        this.setState({ui})
    };

    render() {
        if (this.state.loadingFilterOptions) return <Loading message={'Loading...'}/>;
        return <React.Fragment>
            <Filters
                selectedFilters={this.state.selectedFilters}
                onFiltersSelect={this.onFiltersSelect}
                filterOptionsProvider={this.filterOptionsProvider}
                onSearchClick={this.onSearchClick}
                filtersUi={{...this.filtersUi, filtersOpen: this.state.ui.filtersOpen}}
            />
            <ContentWrapper filtersUi={{...this.filtersUi, filtersOpen: this.state.ui.filtersOpen}}>
                <Header
                    selectedFilters={this.state.results.selectedFilters}
                    filterOptionsProvider={this.filterOptionsProvider}
                    filtersUi={{...this.filtersUi, filtersOpen: this.state.ui.filtersOpen}}
                />
                {this.renderResults()}
                {this.renderPreselect()}
            </ContentWrapper>
        </React.Fragment>;
    }
}