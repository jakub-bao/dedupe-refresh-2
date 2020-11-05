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

type PropertyPath = "filtersOpen"|"error.filters"|"error.results"|"loading.filterOptions"|"loading.dedupes";

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
            filterOptions?: boolean,
            dedupes?: boolean,
        }
    },
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
            ui: {
                filtersOpen: true,
                error: {},
                loading:{
                    filterOptions: true
                }
            },
        };
        this.filterOptionsProvider.init().then(()=>{
            this.updateUi("loading.filterOptions", false);
        }).catch(()=>{
            this.updateUi("error.filters", true);
        });
        this.filtersUi = {
            filtersOpen: null,
            closeFilters: ()=>this.uiSetFiltersOpen(false),
            collapseFilters: ()=>this.uiSetFiltersOpen(!this.state.ui.filtersOpen),
            openFilters: ()=>this.uiSetFiltersOpen(true)
        };
    }

    updateUi = (path:PropertyPath, value:boolean)=>{
        // let ui = JSON.parse(JSON.stringify(this.state.ui));
        let ui = this.state.ui;
        if (path==='filtersOpen') ui.filtersOpen = value;
        else {
            let props = path.split('.');
            ui[props[0]][props[1]] = value;
        }
        this.setState({ui})
    };

    onSearchClick = ()=>{
        this.updateUi("loading.dedupes", true);
        let selectedFilters = {...this.state.selectedFilters};
        fetchDedupes(this.state.selectedFilters).then(dedupes=>{
            this.setState({results: {dedupes, selectedFilters}});
            this.updateUi("loading.dedupes", false);
            this.updateUi("error.results", true);
        }).catch(()=>{
            this.setState({results: {dedupes: null, selectedFilters}});
            this.updateUi("loading.filterOptions", false);
            this.updateUi("error.results", true);
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
        if (this.state.ui.loading.dedupes) return <Loading message={'Searching duplicates...'}/>;
        if (this.state.ui.error.results) return <NetworkError/>;
        return <Results filteredDedupes={this.state.results.dedupes} />;
    }

    renderPreselect(){
        if(process.env.NODE_ENV === 'production') return null;
        return <div style={{position: 'absolute', bottom: 10, right: 10}}>
            <span onClick={()=>this.preselect('XtxUYCsDWrR')}>Rw</span>
            <span onClick={()=>this.preselect('PqlFzhuPcF1')}>Ng</span>
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
        if (this.state.ui.error.filters) return <NetworkError/>;
        if (this.state.ui.loading.filterOptions) return <Loading message={'Loading...'} margin={50}/>;
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