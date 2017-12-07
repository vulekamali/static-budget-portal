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
    for department in listing['national'][0]['departments']:
        print department['url_path']
