
# Static Budget Portal

## Frontend Stack

Front-end is built on [Jekyll](https://jekyllrb.com/), [React Create App](https://www.npmjs.com/package/create-react-app) and [Redux](https://redux.js.org/).

### Jekyll
- Architecture is located in the root of project
- Follows conventions established in [Jekyll Docs](https://jekyllrb.com/docs/home/)

Get started as follows:
1. Get Jekyll set up via [the following instructions](https://jekyllrb.com/docs/installation/).
2. Run `bundle install` in the project root.
3. Run `bundle exec jekyll serve --watch`
4. You can push files as is to git, since Jekyll assets will be built in production.

Regenerating the site can take over a minute on a typical dev machine. You can speed it up by working on a subset of the site data. We delete a bunch of the routing files and tell git to ignore those changes in your local repository using `git update-index --assume-unchanged`. This means only national departments and departments from Mpumalanga and the Eastern Cape will exist, bringing regeneration time down to about 10s.

### React and Redux
- React/Redux is decoupled from Jekyll, and only integrated via `data-component` HTML attributes
- React/Redux is gradually being transitioned from `_includes` folder to `_react` folder.
- Documenation for React/Redux architecture can be found in <a href="_react/public/">'_react/public/README.md'</a> file.

Get started as follows:

1. Open `_react` folder in root.
2. Make sure you have [NodeJS](https://nodejs.org/en/) installed.
3. Run `npm install`.
4. Run `npm start`.
5. In order to push changes to git run `npm run build`
6. Get hash number from CSS and JS files at `_react/build/static/`.*
7. Hash number for JS and CSS in `_data/asset-manifest.json`. *
8. Copy new generated CSS and JS files to `assets/generated/`. *

\* Will be automated in future versions.

--- 

## Back-end Stack

### Regenerating data files

#### Python

Create a python 2 virtual environment, e.g. with `virtualenv2 env`

Activate it and install python dependencies

```
source env/bin/activate
pip install -r requirements.txt
```

```
git ls-files|grep provincial|egrep -v '(mpumalanga|eastern-cape)' | grep html | tr '\n' ' ' | xargs git update-index --assume-unchanged
git ls-files|grep provincial|egrep -v '(mpumalanga|eastern-cape)' | grep html | tr '\n' ' ' | xargs rm
```

To remove `assume-unchanged` from all files with that currently configured:

```
git ls-files -v|grep '^h'| sed 's/^h//' | xargs git update-index --no-assume-unchanged
```

#### Using Travis CI

Every branch push results in a Travis CI build, but by default it won't regenerate data files.

Add `[ci]` to the commit message of the latest commit in the pushed branch to opt into generating data files.

Add `[staging]` to that commit message  to use the staging web data server instead of production. This is useful if we want to see what the data will look like for a development branch of the web data server.

If any files changed, Travis CI will add and commit the changes and push that back to the branch. That means you'll need to pull the branch and perhaps use `pull --rebase` if you've since committed other changes. ***Don't trust the changes because it was a robot - check that the site works as expected and the diff looks reasonable before merging your PR***

Best practise is to place these tags as the first part of the first line of the commit message. This makes it easy to see whether staging or production was used in the pull request list of commits.

To create a commit without any code changes to trigger a build, use `--allow-empty`. e.g.

```bash
git commit -m "[ci][staging] trigger data regeneration for new department xyz data" --allow-empty
```

#### Locally

```
source env/bin/activate
python generate/from_dynamic.py
```

Then use `git status` and `git diff` to get an idea of what changed. If it looks sensible, add the updated files and commit and PR back into the branch where you want changes reflected.

When modifying the Dynamic Budget Portal server, you might want to point to your development server:

```
PORTAL_URL=http://localhost:8000/ python generate/from_dynamic.py
```

You can update one file at a time as follows:
```
curl -o _data/2016-17/national/departments/planning-monitoring-and-evaluation.yaml https://dynamicbudgetportal.openup.org.za/2016-17/national/departments/planning-monitoring-and-evaluation.yaml
```
