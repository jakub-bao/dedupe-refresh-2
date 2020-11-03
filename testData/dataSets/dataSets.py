#!/usr/bin/python3

import api

update = {"openFuturePeriods": "1", "expiryDays":"90"}
api.patch('dataSets/qzVASYuaIey', update)
