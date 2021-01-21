#!/usr/bin/python3

import api

update = {"openFuturePeriods": "1", "expiryDays":"240"}
api.patch('dataSets/qzVASYuaIey', update)
api.patch('dataSets/jKdHXpBfWop', update)
