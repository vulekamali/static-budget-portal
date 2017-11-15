from slugify import slugify


class Government():
    def __init__(self, name, sphere):
        self.name = name
        self.slug = slugify(self.name)
        self.sphere = sphere
        self.departments = []

    def get_url_path(self):
        return "%s/%s" % (self.sphere.get_url_path(), self.slug)


class Department():
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
    def __init__(self, financial_year):
        self.financial_year = financial_year
        self.governments = {}

    def get_url_path(self):
        return "%s/provincial" % self.financial_year.get_url_path()


class FinancialYear():
    def __init__(self, id):
        self.id = id
        self.provincial = Sphere(self)

    def get_url_path(self):
        return "/%s" % self.id


def extras_get(extras, key):
    return [e['value'] for e in extras if e['key'] == key][0]
