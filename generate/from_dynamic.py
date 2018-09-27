"""

Generate routing and data files from the dynamic site's output.

All url_path variables should start with /

"""

import os
import requests
import yaml
from requests.adapters import HTTPAdapter
from requests.packages.urllib3.util.retry import Retry


YEAR_SLUGS = [
    '2018-19',
    '2017-18',
    '2016-17',
    '2015-16',
]

BASIC_PAGE_SLUGS = [
    'search-result',
]

GENERATED_MARKDOWN_COMMENT = "[//]: <> GENERATED FILE. Don't edit by hand."
GENERATED_YAML_COMMENT = ("#########################################\n"
                          "#  GENERATED FILE. Don't edit by hand.  #\n"
                          "#########################################\n\n")

portal_url = os.environ.get('PORTAL_URL', "https://dynamicbudgetportal.openup.org.za/")


# Use session with retries and keepalive
# https://www.peterbe.com/plog/best-practice-with-retries-with-requests
def requests_session(
    retries=3,
    backoff_factor=0.3,
    status_forcelist=(500, 502, 504),
    session=None,
):
    session = session or requests.Session()
    retry = Retry(
        total=retries,
        read=retries,
        connect=retries,
        backoff_factor=backoff_factor,
        status_forcelist=status_forcelist,
    )
    adapter = HTTPAdapter(max_retries=retry)
    session.mount('http://', adapter)
    session.mount('https://', adapter)
    return session


def ensure_file_dirs(file_path):
    dirname = os.path.dirname(file_path)
    if dirname:
        if not os.path.exists(dirname):
            os.makedirs(dirname)


def write_basic_page(page_url_path, page_yaml, layout=None):
    page = yaml.load(page_yaml)
    file_path = "%s.md" % page_url_path[1:]
    ensure_file_dirs(file_path)
    front_matter = {
        'data_key': page['slug'],
        'layout': layout or page['slug'],
    }
    financial_year = page.get('selected_financial_year', None)
    if financial_year:
        front_matter['financial_year'] = financial_year
    with open(file_path, "wb") as outfile:
        front_matter_yaml = yaml.safe_dump(
            front_matter,
            default_flow_style=False,
            encoding='utf-8',
        )
        outfile.write("---\n%s---\n%s" % (
            front_matter_yaml,
            GENERATED_MARKDOWN_COMMENT
        ))


def write_financial_year(session, year_slug, static_path):
    url_path = '/%s' % year_slug
    print url_path
    url = portal_url + url_path[1:] + ".yaml"
    r = session.get(url)
    r.raise_for_status()
    path = '_data%s/index.yaml' % static_path

    ensure_file_dirs(path)
    with open(path, 'wb') as file:
        file.write(GENERATED_YAML_COMMENT)
        file.write(r.text)

    years = []
    page = yaml.load(r.text)
    for year in page['financial_years']:
        years.append([
            year['id'],
            year['closest_match']['url_path'],
            'active' if year['is_selected'] else 'link'
        ])
    file_path = ".%s/index.md" % static_path
    ensure_file_dirs(file_path)
    with open(file_path, "wb") as outfile:
        outfile.write(
            ("---\n"
             "layout: homepage\n"
             "financial_year: %s\n"
             "data_key: index\n"
             "---\n%s") % (
                 year_slug,
                 GENERATED_MARKDOWN_COMMENT,
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
             "data_key: %s\n"
             "layout: department\n"
             "---\n%s") % (
                 department['selected_financial_year'],
                 department['sphere']['slug'],
                 department['government']['slug'],
                 department['slug'],
                 GENERATED_MARKDOWN_COMMENT,
             ))


def write_contributed_dataset_page(dataset_url_path, dataset_yaml):
    dataset = yaml.load(dataset_yaml)
    file_path = ".%s.html" % dataset_url_path
    ensure_file_dirs(file_path)
    with open(file_path, "wb") as outfile:
        outfile.write(
            ("---\n"
             "data_key: %s\n"
             "layout: contributed_dataset\n"
             "---\n%s") % (
                 dataset['slug'],
                 GENERATED_MARKDOWN_COMMENT,
             ))


def write_categorised_dataset_page(dataset_url_path, dataset_yaml):
    dataset = yaml.load(dataset_yaml)
    file_path = ".%s.html" % dataset_url_path
    ensure_file_dirs(file_path)
    with open(file_path, "wb") as outfile:
        outfile.write(
            ("---\n"
             "data_key: %s\n"
             "category: %s\n"
             "layout: government_dataset\n"
             "---") % (
                 dataset['slug'],
                 dataset['category']['slug'],
             ))


session = requests_session()

# Basic Pages

write_financial_year(session, max(YEAR_SLUGS), "")

for year_slug in YEAR_SLUGS:
    write_financial_year(session, year_slug, "/%s" % year_slug)

    for slug in BASIC_PAGE_SLUGS:
        url_path = '/%s/%s' % (year_slug, slug)
        print url_path
        url = portal_url + url_path[1:] + ".yaml"
        r = session.get(url)
        r.raise_for_status()
        path = '_data%s.yaml' % url_path

        with open(path, 'wb') as file:
            file.write(GENERATED_YAML_COMMENT)
            file.write(r.text)

        write_basic_page(url_path, r.text)


# Contributed Datasets

listing_url_path = '/datasets/contributed'
print listing_url_path
listing_url = portal_url + listing_url_path[1:] + '.yaml'
r = session.get(listing_url)
r.raise_for_status()
listing_path = '_data%s.yaml' % listing_url_path

with open(listing_path, 'wb') as listing_file:
    listing_file.write(GENERATED_YAML_COMMENT)
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

    r = session.get(dataset_url)
    r.raise_for_status()
    write_contributed_dataset_page(dataset['url_path'], r.text)
    with open(dataset_context_path, 'wb') as dataset_file:
        dataset_file.write(GENERATED_YAML_COMMENT)
        dataset_file.write(r.text)


# Categorised Datasets
dataset_categories = [
    'socio-economic-data',
    'performance-and-expenditure-reviews',
]

for category in dataset_categories:
    listing_url_path = "/datasets/" + category
    print listing_url_path
    listing_url = portal_url + listing_url_path[1:] + '.yaml'
    r = session.get(listing_url)
    r.raise_for_status()

    listing_path = '_data%s/index.yaml' % listing_url_path
    ensure_file_dirs(listing_path)
    with open(listing_path, 'wb') as listing_file:
        listing_file.write(r.text)
    write_basic_page(listing_url_path, r.text, 'government_dataset_category')

    listing = yaml.load(r.text)
    for dataset in listing['datasets']:
        print dataset['url_path']
        dataset_path = dataset['url_path'] + '.yaml'
        if dataset_path.startswith('/'):
            dataset_path = dataset_path[1:]
        dataset_url = portal_url + dataset_path
        dataset_context_path = '_data/' + dataset_path
        ensure_file_dirs(dataset_context_path)

        r = session.get(dataset_url)
        r.raise_for_status()
        write_categorised_dataset_page(dataset['url_path'], r.text)
        with open(dataset_context_path, 'wb') as dataset_file:
            dataset_file.write(r.text)

# Departments

for year_slug in YEAR_SLUGS:
    listing_url_path = '/%s/departments' % year_slug
    print listing_url_path
    listing_url = portal_url + listing_url_path[1:] + '.yaml'
    r = session.get(listing_url)
    r.raise_for_status()
    listing_path = '_data%s.yaml' % listing_url_path

    with open(listing_path, 'wb') as listing_file:
        listing_file.write(GENERATED_YAML_COMMENT)
        listing_file.write(r.text)
    write_basic_page(listing_url_path, r.text, 'department_list')

    listing = yaml.load(r.text)
    for sphere in ('national', 'provincial'):
        for government in listing[sphere]:
            for department in government['departments']:
                print department['url_path']

                department_path = department['url_path'] + '.yaml'
                department_url = portal_url + department_path[1:]
                department_context_path = '_data/' + department_path[1:]
                ensure_file_dirs(department_context_path)

                r = session.get(department_url)
                r.raise_for_status()
                write_department_page(department['url_path'], r.text)
                with open(department_context_path, 'wb') as department_file:
                    department_file.write(GENERATED_YAML_COMMENT)
                    department_file.write(r.text)
