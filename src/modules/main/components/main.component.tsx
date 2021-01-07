import React from "react";
import Menu from "../../menu/components/menu.component";
import {DataType, DedupeType, FilterDedupeStatus, FiltersModel, FilterType} from "../../menu/models/filters.model";
import FilterOptionsProvider from "../../menu/services/filterOptionsProvider.service";
import {
    DedupeModel,
    DedupeResolutionMethodValue,
    InternalStatus,
    ResolutionMethodType
} from "../../results/models/dedupe.model";
import fetchDedupes from "../../results/services/dedupeDataProvider.service";
import Results from "../../results/components/results.component";
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
import {resolveDedupe, unresolveDedupe} from "../services/saveDedupe.service";
import {OptionsObject, SnackbarKey, SnackbarMessage, withSnackbar} from "notistack";
import {Typography} from "@material-ui/core";
import {ActionValue, MenuVariant, UiActionType, UiModel, updateUi} from "../../menu/services/uiModel";
import {
    BatchAction,
    BatchActionType,
    BatchMethod,
    BatchSelect,
    SelectionType
} from "../../menu/components/batchResolveMenu.component";
import {batchSelectDedupes} from "../../batch/services/batchSelect.service";
import {generateBatchStats} from "../../batch/services/generateBatchStats.service";
import {batchSetMethod, batchUnsetMethod} from "../../batch/services/batchSetMethod.service";
import {batchResolve} from "../../batch/services/batchResolve.service";
import {exportCsv} from "../services/exportCsv.service";

class Main extends React.Component<{
    enqueueSnackbar: (message: SnackbarMessage, options?: OptionsObject) => SnackbarKey;
    closeSnackbar: (key?: SnackbarKey) => void;
}, {
    selectedFilters: FiltersModel,
    results: {
        dedupes: DedupeModel[],
        selectedFilters: FiltersModel
    },
    ui: UiModel,
}> {
    filterOptionsProvider: FilterOptionsProvider = new FilterOptionsProvider();

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
                status: FilterDedupeStatus.unresolved,
            },
            results: {
                dedupes: null,
                selectedFilters: null
            },
            ui: {
                menu: {
                    menuTab: MenuVariant.search
                },
                error: {},
                loading: {
                    filters: true
                },
            },
        };
        this.filterOptionsProvider.init().then(() => {
            this.updateUi([{action: UiActionType.loadingFilters, value: false}]);
        }).catch(() => {
            this.updateUi([{action: UiActionType.errorFilters, value: true}]);
        });
    }

    showMessage = this.props.enqueueSnackbar;

    updateUi = (actions: ActionValue[]) => {
        let ui = updateUi(this.state.ui, actions);
        this.setState({ui});
    }

    onSearchClick = () => {
        this.updateUi([{action: UiActionType.loadingResults, value: true}, {
            action: UiActionType.errorResults,
            value: false
        }])
        let selectedFilters = {...this.state.selectedFilters};
        fetchDedupes(this.state.selectedFilters).then(dedupes => {
            this.setState({results: {dedupes, selectedFilters}});
            this.updateUi([{action: UiActionType.loadingResults, value: false}])
        }).catch(() => {
            this.setState({results: {dedupes: null, selectedFilters}});
            this.updateUi([{action: UiActionType.loadingResults, value: false}, {
                action: UiActionType.errorResults,
                value: true
            }])
        });
    };

    onFiltersSelect = (filterType: FilterType, filterValue: string | boolean): void => {
        if (this.state.selectedFilters[filterType] === filterValue) return;
        let selectedFilters = {...this.state.selectedFilters};
        // @ts-ignore
        selectedFilters[filterType] = filterValue;
        this.setState({selectedFilters});
    };

    updateDedupes = (dedupes: DedupeModel[]) => {
        this.setState({results: {dedupes, selectedFilters: this.state.results.selectedFilters}});
    }

    changeResolutionMethod: ChangeResolutionMethod = (dedupeId: number, resolvedBy: DedupeResolutionMethodValue) => {
        this.updateDedupes(changeResolutionMethod(this.state.results.dedupes, dedupeId, resolvedBy));
    };

    setResolutionValue: SetResolutionValue = (dedupeId: number, customValue) => {
        this.updateDedupes(setResolutionValue(this.state.results.dedupes, dedupeId, customValue));
    };

    onSelectChange = ()=>{
        this.setState({results:this.state.results});
        if (this.state.ui.menu.menuTab!==MenuVariant.batch) this.updateUi([{action: UiActionType.menuTab, value: MenuVariant.batch}]);
    }

    triggerExport = ()=>{
        exportCsv(this.state.results.selectedFilters);
    };

    renderResults() {
        if (this.state.ui.loading.results) return <Loading message={'Searching duplicates...'} margin={100}/>;
        if (this.state.ui.error.results) return <NetworkError/>;
        if (!this.state.results.dedupes) return <PleaseSelect type={PleaseSelectType.ou}/>;
        return <Results
            filteredDedupes={this.state.results.dedupes}
            setResolutionValue={this.setResolutionValue}
            changeResolutionMethod={this.changeResolutionMethod}
            resolveDedupe={this.resolveDedupe}
            unresolveDedupe={this.unresolveDedupe}
            onSelectChange={this.onSelectChange}
            triggerExport={this.triggerExport}
        />;
    }

    resolveDedupe = (id: number) => {
        let dedupe: DedupeModel = this.state.results.dedupes[id - 1];
        dedupe.status = InternalStatus.processing;
        this.setState({results: this.state.results});
        resolveDedupe(dedupe).then(()=>{
            this.showMessage(`Dedupe resolved`);
            dedupe.resolution.original_resolutionMethodValue = JSON.parse(JSON.stringify(dedupe.resolution.resolutionMethodValue));
            dedupe.status = InternalStatus.resolvedOnServer;
            this.setState({results: this.state.results});
        }).catch(()=>{
            this.showMessage(`Error resolving dedupe`, {variant: 'error'});
            dedupe.status = InternalStatus.readyToResolve;
            this.setState({results: this.state.results});
        });
    }


    switchMenuTab = (tab: MenuVariant) => {
        this.updateUi([{action: UiActionType.menuTab, value: tab}]);
    }

    unresolveDedupe = (index: number) => {
        let results = this.state.results;
        let dedupe = results.dedupes[index - 1];
        dedupe.status = InternalStatus.processing;
        this.setState({results});
        unresolveDedupe(this.state.results.dedupes[index - 1]).then(() => {
            this.showMessage(`Unresolved`);
            let results = this.state.results;
            dedupe.resolution.resolutionMethodValue = null;
            dedupe.resolution.original_resolutionMethodValue = null;
            dedupe.status = InternalStatus.unresolved;
            this.setState({results});
        }).catch(()=>{
            this.showMessage(`Error: Cannot unresolve dedupe`, {variant: 'error'});
            dedupe.status = InternalStatus.resolvedOnServer;
            this.setState({results: this.state.results});
        });
    }

    renderPreselect() {
        if (process.env.NODE_ENV === 'production') return null;
        if (this.state.results.dedupes) return null;
        return <div style={{position: 'fixed', top: 50, right: 10}}>
            <Typography onClick={() => this.preselect('XtxUYCsDWrR', '2020Q4', DedupeType.pure)}>1.Rwanda</Typography>
            <Typography onClick={() => this.preselect('PqlFzhuPcF1', '2020Q4', DedupeType.pure)}>2.Nigeria</Typography>
            <Typography
                onClick={() => this.preselect('f5RoebaDLMx', '2020Q4', DedupeType.crosswalk)}>3.Zambia</Typography>
            <Typography onClick={() => this.preselect('l1KFEXKI4Dg', '2020Q4', DedupeType.pure)}>4.Botswana</Typography>
            <Typography
                onClick={() => this.preselect('bQQJe0cC1eD', '2020Q4', DedupeType.crosswalk)}>5.Cameroon</Typography>
            <Typography
                onClick={() => this.preselect('IH1kchw86uA', '2020Q4', DedupeType.crosswalk)}>6.Ethiopia</Typography>
            <Typography onClick={() => this.preselect('l1KFEXKI4Dg', '2020Q3', DedupeType.pure)}>7.Full
                list</Typography>
        </div>;
    }

    preselect = (orgUnitId: string, period: string, dedupeType: DedupeType) => {
        let selectedFilters = {...this.state.selectedFilters};
        selectedFilters.operatingUnit = orgUnitId;
        selectedFilters.dataType = DataType.results;
        selectedFilters.period = period;
        selectedFilters.dedupeType = dedupeType;
        selectedFilters.status = FilterDedupeStatus.resolvedAndUnresolved;
        this.setState({selectedFilters});
        setTimeout(this.onSearchClick, 0);
    };

    batchSelect:BatchSelect = (selectionType:SelectionType)=>{
        let results = this.state.results;
        results.dedupes = batchSelectDedupes(results.dedupes, selectionType);
        this.setState({results});
    };

    batchMethod:BatchMethod = (method:ResolutionMethodType)=>{
        if(method) batchSetMethod(this.state.results.dedupes, method);
        else batchUnsetMethod(this.state.results.dedupes);
        this.setState({results:this.state.results});
    };

    markSelectedAs = (status:InternalStatus)=>{
        this.state.results.dedupes
            .filter(d=>d.tableData.checked&&(d.status===InternalStatus.readyToResolve||d.status===InternalStatus.processing))
            .forEach(d=>d.status=status);
        this.updateDedupes(this.state.results.dedupes);
    };

    batchAction:BatchAction = async (action:BatchActionType)=>{
        let dedupes = this.state.results.dedupes.filter(d=>d.tableData.checked);
        this.markSelectedAs(InternalStatus.processing);
        let result = await batchResolve(dedupes, action);
        if (result) {
            this.showMessage(`${dedupes.length} dedupes successfully resolved`);
            this.markSelectedAs(InternalStatus.resolvedOnServer);
        } else {
            this.showMessage('Batch processing failed', {variant: 'error'});
            this.markSelectedAs(InternalStatus.readyToResolve);
        }
    };


    render() {
        if (this.state.ui.error.filters) return <NetworkError/>;
        if (this.state.ui.loading.filters) return <Loading message={'Loading...'} margin={100}/>;
        return <React.Fragment>
            <Menu
                selectedFilters={this.state.selectedFilters}
                onFiltersSelect={this.onFiltersSelect}
                filterOptionsProvider={this.filterOptionsProvider}
                onSearchClick={this.onSearchClick}
                menuUi={this.state.ui.menu}
                switchMenuTab={this.switchMenuTab}
                batchSelect={this.batchSelect}
                batchAction={this.batchAction}
                batchMethod={this.batchMethod}
                batchStats={generateBatchStats(this.state.results.dedupes)}
            />

            <ContentWrapper>
                {this.renderResults()}
                {this.renderPreselect()}
            </ContentWrapper>
        </React.Fragment>;
    }
}

export default withSnackbar(Main);