import yaml


class DepartmentList():
    def __init__(self, sphere):
        self.governments = []
        for government in sphere.governments.values():
            departments = []
            for department in government.departments:
                departments.append({
                    'name': department.name,
                    'vote_number': department.vote_number,
                })
            self.governments.append({
                'name': government.name,
                'departments': departments,
            })

    def yaml(self, *args, **kwargs):
        return yaml.safe_dump(*([self.governments] + args), **kwargs)
