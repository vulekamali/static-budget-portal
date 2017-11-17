from slugify import slugify


class Government():
    organisational_unit = 'government'

    def __init__(self, name, sphere):
        self.name = name
        self.slug = slugify(self.name)
        self.sphere = sphere
        self.departments = []

    def get_url_path(self):
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

    def __init__(self, government, name, vote_number):
        self.government = government
        self.name = name
        self.slug = slugify(self.name)
        self.vote_number = vote_number

    @classmethod
    def from_ckan_package(cls, government, package):
        return cls(
            government,
            extras_get(package['extras'], 'Department Name'),
            int(extras_get(package['extras'], 'Vote Number')),
        )

    def get_url_path(self):
        return "%s/departments/%s" % (self.government.get_url_path(), self.slug)


class Sphere():
    organisational_unit = 'sphere'

    def __init__(self, financial_year):
        self.financial_year = financial_year
        self.governments = {}

    def get_url_path(self):
        return "%s/provincial" % self.financial_year.get_url_path()

    def get_government_by_slug(self, slug):
        return [g for g in self.governments.values() if g.slug == slug][0]


class FinancialYear():
    organisational_unit = 'financial_year'

    def __init__(self, id):
        self.id = id
        self.provincial = Sphere(self)

    def get_url_path(self):
        return "/%s" % self.id

    def get_closest_match(self, department):
        government = self.provincial.get_government_by_slug(department.government.slug)
        department = government.get_department_by_slug(department.slug)
        if not department:
            return government, False
        return department, True


def extras_get(extras, key):
    return [e['value'] for e in extras if e['key'] == key][0]
