/*
* When resolving dedupes one-by-one, the /api/dataValues endpoint is used.
* The endpoint expects parameters to be specified as URL-encoded and relies on: CC,CO,CP
* CP is the id of the deduplication adjustment mechanism for either Pure/Crosswalk dedupes.
* CP is Category Option
* */
export const pureDedupesMechCategoryOption = 'xEzelmtHWPn';
export const crosswalkDedupesMechCategoryOption = 'OM58NubPbx1';

/*
* When dedupes are resolved in bulk, the /api/dataValueSets endpoint is used instead.
* Because this endpoint is designed to deal with large datasets it's closer to the metal: more low-level.
* It basically follows the SQL table columns for Data Values.
* Data Values do not reference Category Options but Category Option Combos!
* Therefore, we need to be more thorough and specify CategoryOptionCombo:
* */
export const pureDedupesCategoryOptionCombo = 'X8hrDf6bLDC';
export const crosswalkDedupesCategoryOptionCombo = 'YGT1o7UxfFu';