#!/usr/bin/python3

import api
import json

def load_users(fileName):
    file = open(fileName, "r")
    contents = file.read()
    return json.loads(contents)


def persist_users(users):
    print(len(users),'users loaded')
    for user in users:
        user['userCredentials']['password'] = "Cypress1!"
        print('Creating User',user['userCredentials']['username'])
        api.post('users/', user)


persist_users(load_users("mixedUsers.json"))