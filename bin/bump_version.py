#!/usr/bin/python
import sys
import os
import json
from collections import OrderedDict

if len(sys.argv) != 2:
    print('Error: you must give the new version string, e.g. 1.42.0')
    sys.exit()

NEW_VERSION = sys.argv[1]

with open('VERSION.txt', 'r') as file:
    VERSION = file.read().strip()
    with open('VERSION.tmp', 'w') as file:
        file.write(NEW_VERSION)

with open('package.json', 'r') as file:
    text = file.read()
    content = json.loads(text, object_pairs_hook=OrderedDict)
    content['version'] = NEW_VERSION
    with open('package.tmp', 'w') as file:
        file.write(json.dumps(content, indent=2))

with open('app.json', 'r') as file:
    text = file.read()
    content = json.loads(text, object_pairs_hook=OrderedDict)
    content['expo']['version'] = NEW_VERSION
    content['expo']['android']['versionCode'] = NEW_VERSION.replace('.', '') + '00'
    with open('app.tmp', 'w') as file:
        file.write(json.dumps(content, indent=2))

with open('.env', 'r') as file:
    ENV = file.read()
    ENV = ENV.replace('VERSION=%s' % VERSION, 'VERSION=%s' % NEW_VERSION)
    with open('env.tmp', 'w') as file:
        file.write(ENV)

os.rename('VERSION.tmp', 'VERSION.txt')
os.rename('package.tmp', 'package.json')
os.rename('app.tmp', 'app.json')
os.rename('env.tmp', '.env')
