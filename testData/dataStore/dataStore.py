#!/usr/bin/python3

import api

newPeriod = {"start": "2020-03-31T22:00:00+00:00","datasets": ["qzVASYuaIey","BPEyzcDb8fT","jKdHXpBfWop","em1U5x9hhXh","biO64JF8Ait"],"end": "2025-01-01T21:00:00+00:00"}

lateDate = "2025-01-01T00:00:00+00:00"

def fetchDataStore():
    return api.get('dataStore/dedupe/periodSettings', {})

def fixDates(dataStore):
    dataStore["TARGETS"]["2020Oct"]["end"] = lateDate
    dataStore["RESULTS"]["2020Q3"]["end"] = lateDate
    dataStore["RESULTS"]["2020Q4"] = newPeriod
    return dataStore

def saveDataStore(dataStore):
    api.put('dataStore/dedupe/periodSettings', dataStore)

dataStore = fetchDataStore()
dataStore = fixDates(dataStore)
saveDataStore(dataStore)