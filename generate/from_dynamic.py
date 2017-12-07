import os
import requests
import yaml

LISTINGS = [
    '2015-16/departments.yaml',
    '2016-17/departments.yaml',
    '2017-18/departments.yaml',
]


base_url = "https://dynamicbudgetportal.openup.org.za/"

for listing in LISTINGS:
    listing_url = base_url + listing
    r = requests.get(listing_url)
    r.raise_for_status()
    listing_path = os.path.join('_data', listing)

    with open(listing_path, 'wb') as listing_file:
        listing_file.write(r.text)

    listing = yaml.load(r.text)
    for sphere in ('national', 'provincial'):
        for government in listing[sphere]:
            for department in government['departments']:
                print department['url_path']

                department_url = base_url + department['url_path'] + '.yaml'
                department_path = '_data/' + department['url_path'] + '.yaml'
                r = requests.get(department_url)
                r.raise_for_status()
                with open(department_path, 'wb') as department_file:
                    department_file.write(r.text)
