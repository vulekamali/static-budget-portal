from ckanapi import RemoteCKAN
from collections import defaultdict
import yaml
import os
from slugify import slugify

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

    department_list_items = []
    departments = []

    for year_govt_pkg in year_govt_pkgs:
        print "  %s %s" % (year_govt_pkg['id'], year_govt_pkg['name'])
        department_name = extras_get(year_govt_pkg['extras'], 'Department Name')
        vote_number = int(extras_get(year_govt_pkg['extras'], 'Vote Number'))
        department_list_items.append({
            'name': department_name,
            'vote_number': vote_number,
        })
        departments.append({
            'name': department_name,
            'slug': slugify(department_name),
            'sphere': 'provincial',
            'geographic_region': {
                'name': geographic_region,
                'slug': slugify(geographic_region),
            },
            'vote_number': vote_number,
            'financial_year': year,
        })

    if 'department_list' not in years[year]['provincial']:
        years[year]['provincial']['department_list'] = []
    years[year]['provincial']['department_list'].append({
        'province_name': geographic_region,
        'departments': sorted(departments, key=lambda d: d['vote_number']),
    })

    years[year]['provincial'][geographic_region] = departments

    break

for year in years.keys():
    years[year]['provincial']['department_list'] \
        = sorted(years[year]['provincial']['department_list'],
                 key=lambda l: l['province_name'])

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

    for geographic_region in years[year]['provincial'].keys():
        for department in years[year]['provincial'][geographic_region]:
            print department
            # department pages
            geographic_region_slug = department['geographic_region']['slug']
            directory = "%s/provincial/%s/departments" % (year, geographic_region_slug)
            if not os.path.exists(directory):
                os.makedirs(directory)
            with open(os.path.join(directory, "%s.html" % department['slug']), "wb") as outfile:
                outfile.write(
                    "---\n\
                    financial_year: %s\n\
                    sphere: provincial\n\
                    geographic_region_slug: %s\n\
                    department_slug: %s\n\
                    layout: department\n\
                    ---" % (year, geographic_region_slug, department['slug']))
