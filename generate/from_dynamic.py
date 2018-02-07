import os
import requests
import yaml

YEAR_SLUGS = [
    '2015-16',
    '2016-17',
    '2017-18',
]

BASIC_PAGE_SLUGS = [
    'about',
    'resources',
    'search-result',
    'videos',
]

portal_url = os.environ.get('PORTAL_URL', "https://dynamicbudgetportal.openup.org.za/")


def ensure_file_dirs(file_path):
    dirname = os.path.dirname(file_path)
    if not os.path.exists(dirname):
        os.makedirs(dirname)


def write_basic_page(page_url_path, page_yaml, layout=None):
    page = yaml.load(page_yaml)
    file_path = "%s.md" % page_url_path
    ensure_file_dirs(file_path)
    years = []
    for year in page['financial_years']:
        years.append([
            year['id'],
            year['closest_match']['url_path'],
            'active' if year['is_selected'] else 'link'
        ])
    if page['organisational_unit'] == 'learning':
        active = 'learning-centre'
    else:
        active = None
    title = page['slug'].replace('-', ' ').title()
    with open(file_path, "wb") as outfile:
        outfile.write(
            ("---\n"
             "financial_year: %s\n"
             "slug: %s\n"
             "layout: %s\n"
             "%s"
             "active: %s\n"
             "title: %s\n"
             "nested: false\n"
             "---") % (
                 page['selected_financial_year'],
                 page['slug'],
                 layout or page['slug'],
                 yaml.dump({'years': years}),
                 active or page['slug'],
                 title,
             ))


def write_department_page(department_url_path, department_yaml):
    department = yaml.load(department_yaml)
    file_path = ".%s.html" % department_url_path
    ensure_file_dirs(file_path)
    with open(file_path, "wb") as outfile:
        outfile.write(
            ("---\n"
             "financial_year: %s\n"
             "sphere: %s\n"
             "geographic_region_slug: %s\n"
             "department_slug: %s\n"
             "layout: department\n"
             "---") % (
                 department['selected_financial_year'],
                 department['sphere']['slug'],
                 department['government']['slug'],
                 department['slug'],
             ))


def write_dataset_page(dataset_url_path, dataset_yaml):
    dataset = yaml.load(dataset_yaml)
    file_path = ".%s.html" % dataset_url_path
    ensure_file_dirs(file_path)
    with open(file_path, "wb") as outfile:
        outfile.write(
            ("---\n"
             "financial_year: %s\n"
             "slug: %s\n"
             "layout: contributed_dataset\n"
             "---") % (
                 dataset['selected_financial_year'],
                 dataset['slug'],
             ))


# Basic Pages
for year_slug in YEAR_SLUGS:
    for slug in BASIC_PAGE_SLUGS:
        url_path = '%s/%s' % (year_slug, slug)
        print url_path
        url = portal_url + url_path + ".yaml"
        r = requests.get(url)
        r.raise_for_status()
        path = '_data/%s.yaml' % url_path

        with open(path, 'wb') as file:
            file.write(r.text)

        write_basic_page(url_path, r.text)


# Datasets
for year_slug in YEAR_SLUGS:
    listing_url_path = year_slug + '/contributed-data'
    listing_url = portal_url + listing_url_path + '.yaml'
    r = requests.get(listing_url)
    r.raise_for_status()
    listing_path = os.path.join('_data', listing_url_path + '.yaml')

    with open(listing_path, 'wb') as listing_file:
        listing_file.write(r.text)
    write_basic_page(listing_url_path, r.text)

    listing = yaml.load(r.text)
    for dataset in listing['datasets']:
        print dataset['url_path']
        dataset_path = dataset['url_path'] + '.yaml'
        if dataset_path.startswith('/'):
            dataset_path = dataset_path[1:]
        dataset_url = portal_url + dataset_path
        dataset_context_path = '_data/' + dataset_path
        ensure_file_dirs(dataset_context_path)

        r = requests.get(dataset_url)
        r.raise_for_status()
        write_dataset_page(dataset['url_path'], r.text)
        with open(dataset_context_path, 'wb') as dataset_file:
            dataset_file.write(r.text)


# Departments
for year_slug in YEAR_SLUGS:
    listing_url_path = year_slug + '/departments'
    listing_url = portal_url + listing_url_path + '.yaml'
    r = requests.get(listing_url)
    r.raise_for_status()
    listing_path = os.path.join('_data', listing_url_path + '.yaml')

    with open(listing_path, 'wb') as listing_file:
        listing_file.write(r.text)
    write_basic_page(listing_url_path, r.text, 'department_list')

    listing = yaml.load(r.text)
    for sphere in ('national', 'provincial'):
        for government in listing[sphere]:
            for department in government['departments']:
                print department['url_path']

                department_path = department['url_path'] + '.yaml'
                if department_path.startswith('/'):
                    department_path = department_path[1:]
                department_url = portal_url + department_path
                department_context_path = '_data/' + department_path
                ensure_file_dirs(department_context_path)

                r = requests.get(department_url)
                r.raise_for_status()
                write_department_page(department['url_path'], r.text)
                with open(department_context_path, 'wb') as department_file:
                    department_file.write(r.text)
