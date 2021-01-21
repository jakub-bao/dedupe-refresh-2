import React from "react";
import {Drawer, Tab, Tabs, withStyles} from "@material-ui/core";
import {FiltersModel, FilterType} from "../models/filters.model";
import FilterOptionsProvider from "../services/filterOptionsProvider.service";
import {makeStyles} from "@material-ui/core/styles";
import {colors} from "../../../values/color.values";
import {Filters} from "./filters.component";
import {MenuUi} from "../services/uiModel";
import {BatchExecute, BatchMethod, BatchResolveMenu, BatchSelect} from "./batchResolveMenu.component";
import {BatchStatsModel} from "../../batch/services/generateBatchStats.service";

export enum MenuVariant {
    search=0,
    batch=1
}

const useStyles = makeStyles({
    root: {
        backgroundColor: colors.backgroundSecondary,
        marginTop: 49,
        width: 180,
        padding: "0px 6px"
    },
});

const MenuTabs = withStyles((theme)=>({
    root: {
        marginBottom: 5,
        overflow: 'visible!important'
    },
    scroller: {
        overflow: 'visible!important'
    },
    indicator: {
        backgroundColor: 'grey',
        '&:after':{
            display: 'block',
            width: 0,
            height: 0,
            borderLeft: '6px solid transparent',
            borderRight: '6px solid transparent',
            borderTop: '6px solid grey',//#f50057
            content: 'close-quote',
            margin:'auto'
        }
    }
}))(Tabs);

const MenuTab = withStyles((theme)=>({
    root:{
        minWidth: 50,
        height: 40,
    },
    selected:{
        color: 'white',
        backgroundColor: 'rgba(44, 102, 147, 88%)'
    }
}))(Tab);

export  default function Menu({selectedFilters, onFiltersSelect, filterOptionsProvider, onSearchClick, menuUi,switchMenuTab, batchSelect, batchMethod, batchExecute, batchStats}:{
    selectedFilters: FiltersModel,
    onFiltersSelect: (filterType:FilterType, filterValue:string|boolean)=>void,
    filterOptionsProvider: FilterOptionsProvider,
    onSearchClick: ()=>void,
    menuUi: MenuUi,
    switchMenuTab: (tabIndex:MenuVariant)=>void,
    batchSelect: BatchSelect,
    batchMethod:BatchMethod,
    batchExecute:BatchExecute,
    batchStats:BatchStatsModel
}) {
    let classStyles = useStyles();
    return <Drawer
        anchor='left'
        variant="persistent"
        open={true}
        classes={{paper: classStyles.root}}
    >
        <MenuTabs value={menuUi.menuTab} onChange={(event, tabIndex:number)=>switchMenuTab(tabIndex)} variant='fullWidth'>
            <MenuTab label="Search"/>
            <MenuTab label="Batch" data-testid={'menu_tab_batch'} disabled={!batchStats || !batchStats.allCount || batchStats.allCount===0}/>
        </MenuTabs>

        {menuUi.menuTab===0 && <Filters selectedFilters={selectedFilters} onFiltersSelect={onFiltersSelect} filterOptionsProvider={filterOptionsProvider} onSearchClick={onSearchClick}/>}
        {menuUi.menuTab===1 && <BatchResolveMenu batchStats={batchStats} batchExecute={batchExecute} batchSelect={batchSelect} batchMethod={batchMethod}/>}

    </Drawer>;
}
