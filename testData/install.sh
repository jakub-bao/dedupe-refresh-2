#!/usr/bin/bash

section(){
  echo ----------------------------
  echo $1
}

section Users \> Adding test user accounts
(cd users && ./persistUsers.py)

section Datastore \> add datastore settings
(cd dataStore && ./dataStore.py)

section CORS \> Whitelist localhost
(cd cors && ./cors.py)

section DataSets \> unlock datasets
(cd dataSets && ./dataSets.py)

section DataValues \> Insert duplicates
(cd dataValues && ./insertDataValues.sh)