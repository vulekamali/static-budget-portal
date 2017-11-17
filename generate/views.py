import yaml


class DepartmentList():
    def __init__(self, sphere):
        governments = []
        for government in sphere.governments.values():
            departments = []
            for department in government.departments:
                departments.append({
                    'name': department.name,
                    'vote_number': department.vote_number,
                    'url_path': department.get_url_path()
                })
            departments = sorted(departments, key=lambda d: d['vote_number'])
            governments.append({
                'name': government.name,
                'departments': departments,
            })
        governments = sorted(governments, key=lambda g: g['name'])
        self.context = governments

    def yaml(self, *args, **kwargs):
        return yaml.safe_dump(*([self.context] + list(args)), **kwargs)


class Department():
    def __init__(self, department, financial_years):
        financial_years_context = []
        for year in financial_years:
            closest_match, closest_is_exact = year.get_closest_match(department)
            financial_years_context.append({
                'id': year.id,
                'is_selected': year == department.government.sphere.financial_year,
                'closest_match': {
                    'name': closest_match.name,
                    'url_path': closest_match.get_url_path(),
                    'organisational_unit': closest_match.organisational_unit,
                    'is_exact_match': closest_is_exact,
                },
            })
        financial_years_context = sorted(financial_years_context, key=lambda y: y['id'])
        self.context = {
            'name': department.name,
            'vote_number': department.vote_number,
            'government': {
                'name': department.government.name,
            },
            'financial_years': financial_years_context,
        }

    def yaml(self, *args, **kwargs):
        return yaml.safe_dump(*([self.context] + list(args)), **kwargs)
