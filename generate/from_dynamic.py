import os
import requests
import yaml

LISTINGS = [
    '2015-16/departments.yaml',
    '2016-17/departments.yaml',
    '2017-18/departments.yaml',
]

base_url = "https://dynamicbudgetportal.openup.org.za/"


def ensure_file_dirs(file_path):
    dirname = os.path.dirname(file_path)
    if not os.path.exists(dirname):
        os.makedirs(dirname)


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

                department_path = department['url_path'] + '.yaml'
                if department_path.startswith('/'):
                    department_path = department_path[1:]
                department_url = base_url + department_path
                department_context_path = '_data/' + department_path
                ensure_file_dirs(department_context_path)

                r = requests.get(department_url)
                r.raise_for_status()
                with open(department_context_path, 'wb') as department_file:
                    department_file.write(r.text)
