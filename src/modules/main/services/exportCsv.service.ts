import {FiltersModel} from "../../menu/models/filters.model";
import {generateDedupeUrl} from "../../results/services/dedupeDataProvider.service";

export function exportCsv(selectedFilters:FiltersModel){
    let requestUrl = generateDedupeUrl(selectedFilters);
    requestUrl = requestUrl.replace('/data?','/data.csv?');
    // window.open('/api'+requestUrl);
    window.location.href = '/api'+requestUrl;
}