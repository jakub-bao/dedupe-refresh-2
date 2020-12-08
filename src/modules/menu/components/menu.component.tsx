import React from "react";
import {Button, Drawer, styled, Tab, Tabs, withStyles} from "@material-ui/core";
import {FiltersModel, FilterType} from "../models/filters.model";
import SelectFilter from "./selectFilter.component";
import FilterOptionsProvider from "../services/filterOptionsProvider.service";
import CheckboxFilter from "./checkboxFilter.component";
import MenuLogo from "./filtersLogo.component";
import {makeStyles} from "@material-ui/core/styles";
import {colors} from "../../../values/color.values";
import {Filters} from "../filters.component";
import {MenuUi} from "../services/uiModel";

export enum MenuVariant {
    search=0,
    batch=1
}

const useStyles = makeStyles({
    root: {
        backgroundColor: colors.backgroundSecondary,
        marginTop: 49,
        width: 200,
        paddingTop:0
    },
});

// const MenuTab = styled(Tab)({
//     minWidth: 100,
//     height: 40,
//     '&$selected':{
//         color: 'red'
//     }
// });

const MenuTabs = withStyles((theme)=>({
    root: {
        marginBottom: 5,
        overflow: 'visible!important'
    },
    scroller: {
        overflow: 'visible!important'
    },
    indicator: {
        // display:'none'
        '&:after':{
            display: 'block',
            width: 0,
            height: 0,
            borderLeft: '6px solid transparent',
            borderRight: '6px solid transparent',
            borderTop: '6px solid #f50057',
            // backgroundColor: 'green',
            content: 'close-quote',
            margin:'auto'
        }
    }
}))(Tabs);

const MenuTab = withStyles((theme)=>({
    root:{
        minWidth: 100,
        height: 40,
    },
    selected:{
        color: 'white',
        backgroundColor: 'rgba(44, 102, 147, 88%)'
    }
}))(Tab)//(Tab);

export  default function Menu({selectedFilters, onFiltersSelect, filterOptionsProvider, onSearchClick, menuUi,switchMenuTab}:{
    selectedFilters: FiltersModel,
    onFiltersSelect: (filterType:FilterType, filterValue:string|boolean)=>void,
    filterOptionsProvider: FilterOptionsProvider,
    onSearchClick: ()=>void,
    menuUi: MenuUi,
    switchMenuTab: (tabIndex:MenuVariant)=>void
}) {
    let classStyles = useStyles();
    return <Drawer
        anchor='left'
        variant="persistent"
        open={menuUi.open}
        classes={{paper: classStyles.root}}
    >
        <MenuTabs value={menuUi.menuTab} onChange={(event, tabIndex:number)=>switchMenuTab(tabIndex)} variant='fullWidth'>
            <MenuTab label="Search"/>
            <MenuTab label="Batch"/>
        </MenuTabs>


        {/*<MenuLogo toggleMenu={filtersUi.collapseFilters}/>*/}
        {menuUi.menuTab===0 && <Filters selectedFilters={selectedFilters} onFiltersSelect={onFiltersSelect} filterOptionsProvider={filterOptionsProvider} onSearchClick={onSearchClick}/>}
    </Drawer>;
}

// export default React.memo(Menu);