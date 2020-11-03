#!/usr/bin/python3

import api
import json


def fetch_users():
    params = {
        'fields': '*',
        'filter': [
            'userCredentials.username:$like:cypress-ua2',
            'userCredentials.username:$like:cypress-agency-india',
            'userCredentials.username:$like:cypress-agency-hq',
            'userCredentials.username:$like:cypress-global',
            'userCredentials.username:$like:cypress-superAdmin'
        ],
        'rootJunction':'OR'
    }
    res = api.get('users.json', params)
    print('Fetched',len(res['users']),'users')
    return res['users']

def save_users(users):
    file = open("users.json", "w")
    file.write(json.dumps(users))
    file.close()

users = fetch_users()
save_users(users)