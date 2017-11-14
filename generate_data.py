from ckanapi import RemoteCKAN
from collections import defaultdict
import yaml
import os

ckan = RemoteCKAN('https://treasurydata.openup.org.za')

years = defaultdict(lambda: defaultdict(lambda: defaultdict(None)))


def get_year_govt_pkgs(year_govt_group_id):
    response = ckan.action.package_search(fq="groups:%s" % year_govt_group_id)
    year_govt_pkgs = response['results']

    while len(year_govt_pkgs) < response['count']:
        response = ckan.action.package_search(
            fq="groups:%s" % year_govt_group_id,
            start=len(year_govt_pkgs)
        )
        year_govt_pkgs.extend(response['results'])

    return year_govt_pkgs


def extras_get(extras, key):
    return [e['value'] for e in extras if e['key'] == key][0]


for year_govt_group_id in ckan.action.group_list():
    print year_govt_group_id
    year_govt_group = ckan.action.group_show(id=year_govt_group_id)
    year_govt_pkgs = get_year_govt_pkgs(year_govt_group_id)
    year = extras_get(year_govt_group['extras'], 'Financial Year')
    geographic_region = extras_get(year_govt_group['extras'], 'Geographic Region')

    departments = []

    for year_govt_pkg in year_govt_pkgs:
        print "  %s %s" % (year_govt_pkg['id'], year_govt_pkg['name'])
        departments.append({
            'name': extras_get(year_govt_pkg['extras'], 'Department Name'),
            'vote_number': int(extras_get(year_govt_pkg['extras'], 'Vote Number')),
        })

    if 'department_list' not in years[year]['provincial']:
        years[year]['provincial']['department_list'] = []
    years[year]['provincial']['department_list'].append({
        'province_name': geographic_region,
        'departments': sorted(departments, key=lambda d: d['vote_number']),
    })


for year in years.keys():
    # department list data
    directory = "_data/%s/provincial" % year
    if not os.path.exists(directory):
        os.makedirs(directory)
    with open(os.path.join(directory, "department_list.yaml"), "wb") as outfile:
        yaml.safe_dump(years[year]['provincial']['department_list'], outfile, default_flow_style=False, encoding='utf-8')

    # department list pages
    directory = "%s" % year
    if not os.path.exists(directory):
        os.makedirs(directory)
    with open(os.path.join(directory, "departments.html"), "wb") as outfile:
        outfile.write("---\nfinancial_year: %s\nlayout: department_list\n---" % year)
