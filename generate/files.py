from ckanapi import RemoteCKAN
import os
from slugify import slugify
from models import *
import views

ckan = RemoteCKAN('https://treasurydata.openup.org.za')

years = {}


def get_department_packages(year_govt_group_id):
    response = ckan.action.package_search(fq="groups:%s" % year_govt_group_id)
    department_packages = response['results']

    while len(department_packages) < response['count']:
        response = ckan.action.package_search(
            fq="groups:%s" % year_govt_group_id,
            start=len(department_packages)
        )
        department_packages.extend(response['results'])

    return department_packages


def write_department_list_data(sphere):
    file_path = "_data/%s/department_list.yaml" % sphere.get_url_path()
    ensure_file_dirs(file_path)
    with open(file_path, "wb") as outfile:
        views.DepartmentList(sphere).yaml(
            outfile, default_flow_style=False, encoding='utf-8')


def write_department_data(department):
    file_path = "_data/%s.yaml" % department.get_url_path()
    ensure_file_dirs(file_path)
    with open(file_path, "wb") as outfile:
        views.Department(department, years.values()).yaml(
            outfile, default_flow_style=False, encoding='utf-8')


def write_department_page(department):
    file_path = ".%s.html" % department.get_url_path()
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
                 year_id,
                 department.government.sphere.name,
                 government.slug,
                 department.slug
             ))


def ensure_file_dirs(file_path):
    dirname = os.path.dirname(file_path)
    if not os.path.exists(dirname):
        os.makedirs(dirname)


# get all the data
for idx, year_govt_group_id in enumerate(ckan.action.group_list()):
    print year_govt_group_id
    year_govt_group = ckan.action.group_show(id=year_govt_group_id)
    department_packages = get_department_packages(year_govt_group_id)

    year_id = extras_get(year_govt_group['extras'], 'financial_year')
    sphere_id = extras_get(year_govt_group['extras'], 'sphere')
    if year_id not in years:
        year = FinancialYear(year_id)
        years[year_id] = year
    else:
        year = years[year_id]

    sphere = year.get_sphere(sphere_id)
    geographic_region_name = extras_get(year_govt_group['extras'], 'geographic_region')
    if geographic_region_name not in sphere.governments:
        government = Government(geographic_region_name, sphere)
        sphere.governments[geographic_region_name] = government
    else:
        government = sphere.governments[geographic_region_name]

    for department_package in department_packages:
        department = Department.from_ckan_package(government, department_package)
        government.departments.append(department)


for year_id, year in years.iteritems():
    write_department_list_data(year.provincial)
    write_department_list_data(year.national)

    for sphere_id in ('national', 'provincial'):
        for government in years[year_id].get_sphere(sphere_id).governments.values():
            for department in government.departments:
                write_department_data(department)
                write_department_page(department)
