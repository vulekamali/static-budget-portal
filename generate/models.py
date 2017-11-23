from slugify import slugify
import requests
from requests.adapters import HTTPAdapter


class Government():
    organisational_unit = 'government'

    def __init__(self, name, sphere):
        self.name = name
        self.slug = slugify(self.name)
        self.sphere = sphere
        self.departments = []

    def get_url_path(self):
        if self.sphere.name == 'national':
            return self.sphere.get_url_path()
        else:
            return "%s/%s" % (self.sphere.get_url_path(), self.slug)

    def get_department_by_slug(self, slug):
        departments = [d for d in self.departments if d.slug == slug]
        if len(departments) == 0:
            return None
        elif len(departments) == 1:
            return departments[0]
        else:
            raise Exception("More matching slugs than expected")


class Department():
    organisational_unit = 'department'

    def __init__(self, government, name, vote_number, narrative, resources):
        self.government = government
        self.name = name
        self.slug = slugify(self.name)
        self.vote_number = vote_number
        self.narrative = narrative
        self.resources = resources

    @classmethod
    def from_ckan_package(cls, government, package):
        narrative = {}
        resources = {}
        for resource in package['resources']:
            if resource['name'].startswith('ENE Section - '):
                name = resource['name'].replace('ENE Section - ', '')
                name_slug = slugify(name)
                print "Downloading %s" % resource['url']
                r = requests.get(resource['url'])
                r.raise_for_status()
                r.encoding = 'utf-8'
                content = r.text
                narrative[name_slug] = {
                    'name': name,
                    'content': content,
                }
            if resource['name'].startswith('Vote'):
                if government.sphere.name == 'provincial':
                    doc_short = "EPRE"
                    doc_long = "Estimates of Provincial Revenue and Expenditure"
                elif government.sphere.name == 'national':
                    doc_short = "ENE"
                    doc_long = "Estimates of National Expenditure"
                else:
                    raise Exception("unexpected sphere")
                name = "%s for %s" % (doc_short, resource['name'])
                description = ("The %s (%s) sets out the detailed spending "
                               "plans of each government department for the "
                               "coming year.") % (doc_long, doc_short)
                if name not in resources:
                    resources[name] = {
                        'description': description,
                        'formats': []
                    }
                resources[name]['formats'].append({
                    'url': resource['url'],
                    'format': resource['format'],
                })

        return cls(
            government,
            extras_get(package['extras'], 'Department Name'),
            int(extras_get(package['extras'], 'Vote Number')),
            narrative,
            resources,
        )

    def get_url_path(self):
        return "%s/departments/%s" % (self.government.get_url_path(), self.slug)


class Sphere():
    organisational_unit = 'sphere'

    def __init__(self, financial_year, name):
        self.financial_year = financial_year
        self.name = name
        self.governments = {}

    def get_url_path(self):
        return "%s/%s" % (self.financial_year.get_url_path(), self.name)

    def get_government_by_slug(self, slug):
        return [g for g in self.governments.values() if g.slug == slug][0]


class FinancialYear():
    organisational_unit = 'financial_year'

    def __init__(self, id):
        self.id = id
        self.national = Sphere(self, 'national')
        self.provincial = Sphere(self, 'provincial')

    def get_url_path(self):
        return "/%s" % self.id

    def get_closest_match(self, department):
        sphere = getattr(self, department.government.sphere.name)
        government = sphere.get_government_by_slug(department.government.slug)
        department = government.get_department_by_slug(department.slug)
        if not department:
            return government, False
        return department, True

    def get_sphere(self, name):
        return getattr(self, name)


def extras_get(extras, key):
    return [e['value'] for e in extras if e['key'] == key][0]
