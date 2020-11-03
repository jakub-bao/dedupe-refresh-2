#!/usr/bin/bash

section(){
  echo ----------------------------
  echo $1
}

section Users \> Adding test user accounts
(cd users && ./persistUsers.py)

section Datastore \> add datastore settings
(cd dataStore && ./dataStore.py)

section DataSet \> create dataset, data elements, coc, etc.
(cd dataSet && ./importDataSet.sh)

section DataSet Open Periods
(cd openPeriods && python3 openPeriods.py)

section Files \> Upload Files
(cd files && ./files.py)

section Agency Files \>
(cd agencyFiles && ./uploadFiles.sh)

section DataSet Assignment \>
(cd dataSetAssignment && ./dataSetAssignment.sh)

section Approvals \>
(cd approvals && ./approvals.sh)

section CORS \> Whitelist localhost
(cd cors && ./cors.py)