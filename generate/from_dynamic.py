"""

Generate routing and data files from the dynamic site's output.

All url_path variables should start with /

"""

import os
import requests
import yaml
import logging
from requests.adapters import HTTPAdapter
from requests.packages.urllib3.util.retry import Retry
from requests.exceptions import ChunkedEncodingError

logger = logging.getLogger(__name__)
logger.setLevel(logging.INFO)
logFormatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logHandler = logging.StreamHandler()
logHandler.setFormatter(logFormatter)
logger.addHandler(logHandler)

YEAR_SLUGS = [
    '2019-20',
    '2018-19',
    '2017-18',
    '2016-17',
]

BUDGET_TYPES = [
    'original',
    'adjusted',
    'actual'
]

PROVINCE_SLUGS = [
    'gauteng',
    'north-west',
    'kwazulu-natal',
    'western-cape',
    'eastern-cape',
    'northern-cape',
    'free-state',
    'mpumalanga',
    'limpopo'
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


def http_get(session, url, retries=3):
    try:
        return session.get(url)
    except ChunkedEncodingError as e:
        logger.error(e, exc_info=True)
        if retries:
            return http_get(session, url, retries-1)
        else:
            raise e


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
        'data_key': page['slug'] if page else '',
        'layout': layout or page['slug'],
    }
    financial_year = None
    if page:
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
    logger.info(url_path)
    url = portal_url + url_path[1:] + ".yaml"
    r = http_get(session, url)
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


def write_infrastructure_project_page(department_url_path, department_yaml):
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

for year_slug in YEAR_SLUGS:
    write_financial_year(session, year_slug, "/%s" % year_slug)

    for slug in BASIC_PAGE_SLUGS:
        url_path = '/%s/%s' % (year_slug, slug)
        logger.info(url_path)
        url = portal_url + url_path[1:] + ".yaml"
        r = http_get(session, url)
        r.raise_for_status()
        path = '_data%s.yaml' % url_path

        with open(path, 'wb') as file:
            file.write(GENERATED_YAML_COMMENT)
            file.write(r.text)

        write_basic_page(url_path, r.text)


# Contributed Datasets

listing_url_path = '/datasets/contributed'
logger.info(listing_url_path)
listing_url = portal_url + listing_url_path[1:] + '.yaml'
r = http_get(session, listing_url)
r.raise_for_status()
listing_path = '_data%s/index.yaml' % listing_url_path

with open(listing_path, 'wb') as listing_file:
    listing_file.write(GENERATED_YAML_COMMENT)
    listing_file.write(r.text)
write_basic_page(listing_url_path, r.text, 'contributed-data')

listing = yaml.load(r.text)
for dataset in listing['datasets']:
    logger.info(dataset['url_path'])
    dataset_path = dataset['url_path'] + '.yaml'
    if dataset_path.startswith('/'):
        dataset_path = dataset_path[1:]
    dataset_url = portal_url + dataset_path
    dataset_context_path = '_data/' + dataset_path
    ensure_file_dirs(dataset_context_path)

    r = http_get(session, dataset_url)
    r.raise_for_status()
    write_contributed_dataset_page(dataset['url_path'], r.text)
    with open(dataset_context_path, 'wb') as dataset_file:
        dataset_file.write(GENERATED_YAML_COMMENT)
        dataset_file.write(r.text)


# Category list page

category_list_url_path = "/datasets"
logger.info(category_list_url_path)
category_list_url = portal_url + category_list_url_path[1:] + '.yaml'
r = http_get(session, category_list_url)
r.raise_for_status()

category_list_path = '_data%s/index.yaml' % category_list_url_path
ensure_file_dirs(category_list_path)
with open(category_list_path, 'wb') as category_list_file:
    category_list_file.write(r.text)
write_basic_page(category_list_url_path, r.text, 'dataset_landing_page')

dataset_categories = [c['slug'] for c in yaml.load(r.text)['categories']]
dataset_categories.remove('contributed')

# Category detail pages

for category in dataset_categories:
    dataset_list_url_path = "/datasets/" + category
    logger.info(dataset_list_url_path)
    dataset_list_url = portal_url + dataset_list_url_path[1:] + '.yaml'
    r = http_get(session, dataset_list_url)
    r.raise_for_status()

    dataset_list_path = '_data%s/index.yaml' % dataset_list_url_path
    ensure_file_dirs(dataset_list_path)
    with open(dataset_list_path, 'wb') as dataset_list_file:
        dataset_list_file.write(r.text)
    write_basic_page(dataset_list_url_path, r.text, 'government_dataset_category')

    dataset_list = yaml.load(r.text)

    # Dataset detail pages

    for dataset in dataset_list['datasets']:
        logger.info(dataset['url_path'])
        dataset_path = dataset['url_path'] + '.yaml'
        if dataset_path.startswith('/'):
            dataset_path = dataset_path[1:]
        dataset_url = portal_url + dataset_path
        dataset_context_path = '_data/' + dataset_path
        ensure_file_dirs(dataset_context_path)

        r = http_get(session, dataset_url)
        r.raise_for_status()
        write_categorised_dataset_page(dataset['url_path'], r.text)
        with open(dataset_context_path, 'wb') as dataset_file:
            dataset_file.write(r.text)

# Departments

for year_slug in YEAR_SLUGS:
    listing_url_path = '/%s/departments' % year_slug
    logger.info(listing_url_path)
    listing_url = portal_url + listing_url_path[1:] + '.yaml'
    r = http_get(session, listing_url)
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
                logger.info(department['url_path'])

                department_path = department['url_path'] + '.yaml'
                department_url = portal_url + department_path[1:]
                department_context_path = '_data/' + department_path[1:]
                ensure_file_dirs(department_context_path)

                r = http_get(session, department_url)
                r.raise_for_status()
                write_department_page(department['url_path'], r.text)
                with open(department_context_path, 'wb') as department_file:
                    department_file.write(GENERATED_YAML_COMMENT)
                    department_file.write(r.text)


# Infrastructure projects

listing_url_path = '/infrastructure-projects'
logger.info(listing_url_path)
listing_url = portal_url + listing_url_path[1:] + '.yaml'
r = http_get(session, listing_url)
if r.status_code == 404:
    logger.info("No infrastructure project data.")
else:
    r.raise_for_status()
    listing_path = '_data%s.yaml' % listing_url_path

    dataset_list_path = '_data%s/index.yaml' % listing_url_path
    ensure_file_dirs(dataset_list_path)
    with open(dataset_list_path, 'wb') as dataset_list_file:
        dataset_list_file.write(r.text)
    write_basic_page(listing_url_path, r.text, 'infrastructure_project_list')

    listing = yaml.load(r.text)
    for project in listing['projects']:
        logger.info(project['detail'])

        project_path = project['detail'] + '.yaml'
        project_url = portal_url + project_path[1:]
        project_context_path = '_data/' + project_path[1:]
        ensure_file_dirs(project_context_path)

        r = http_get(session, project_url)
        r.raise_for_status()
        write_basic_page(project['detail'], r.text, 'infrastructure_project')
        with open(project_context_path, 'wb') as project_file:
            project_file.write(GENERATED_YAML_COMMENT)
            project_file.write(r.text)

# Treemaps

SPHERES = ('national', 'provincial')
for year in YEAR_SLUGS:
    for budget_phase in BUDGET_TYPES:
        for sphere in SPHERES:
            listing_url_path = '/{}/{}/{}'.format(year, sphere, budget_phase)
            logger.info(listing_url_path)
            listing_url = portal_url + listing_url_path[1:] + '.yaml'
            r = http_get(session, listing_url)
            if r.status_code == 404:
                logger.info("No data for {}".format(listing_url))
            else:
                r.raise_for_status()
                listing_path = '_data/homepage%s.yaml' % listing_url_path
                ensure_file_dirs(listing_path)
                with open(listing_path, 'wb') as dataset_list_file:
                    dataset_list_file.write(r.text)


# Department preview pages

for year in YEAR_SLUGS:
    for budget_phase in BUDGET_TYPES:
        for sphere in SPHERES:
            if sphere == 'provincial':
                for government in PROVINCE_SLUGS:
                    listing_url_path = '/{}/previews/{}/{}/{}'.format(year, sphere, government, budget_phase)
                    logger.info(listing_url_path)
                    listing_url = portal_url + listing_url_path[1:] + '.yaml'
                    r = http_get(session, listing_url)
                    if r.status_code == 404:
                        logger.info("No data for {}".format(listing_url))
                    else:
                        r.raise_for_status()
                        listing_path = '_data%s.yaml' % listing_url_path
                        ensure_file_dirs(listing_path)
                        with open(listing_path, 'wb') as dataset_list_file:
                            dataset_list_file.write(r.text)
                            data = yaml.load(r.text)
                            if data:
                                for department_object in data['data']['items']:
                                    slug = department_object['slug']
                                    markdown_path = '/{}/previews/{}/{}/{}'.format(year, sphere, government, slug)
                                    write_basic_page(markdown_path, '', 'department_preview')
            elif sphere == 'national':
                listing_url_path = '/{}/previews/{}/south-africa/{}'.format(year, sphere, budget_phase)
                logger.info(listing_url_path)
                listing_url = portal_url + listing_url_path[1:] + '.yaml'
                r = http_get(session, listing_url)
                if r.status_code == 404:
                    logger.info("No data for {}".format(listing_url))
                else:
                    r.raise_for_status()
                    listing_path = '_data%s.yaml' % listing_url_path
                    ensure_file_dirs(listing_path)
                    with open(listing_path, 'wb') as dataset_list_file:
                        dataset_list_file.write(r.text)
                        data = yaml.load(r.text)
                        if data:
                            for department_object in data['data']['items']:
                                slug = department_object['slug']
                                markdown_path = '/{}/previews/{}/south-africa/{}'.format(year, sphere, slug)
                                write_basic_page(markdown_path, '', 'department_preview')

# Consolidated treemap

for year in YEAR_SLUGS:
    listing_url_path = '/{}/consolidated'.format(year)
    logger.info(listing_url_path)
    listing_url = portal_url + listing_url_path[1:] + '.yaml'
    r = http_get(session, listing_url)
    if r.status_code == 404:
        logger.info("No data for {}".format(listing_url))
    else:
        r.raise_for_status()
        listing_path = '_data%s.yaml' % listing_url_path
        ensure_file_dirs(listing_path)
        with open(listing_path, 'wb') as dataset_list_file:
            dataset_list_file.write(r.text)
