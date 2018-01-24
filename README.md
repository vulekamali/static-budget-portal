
Set up dev env
--------------

### Frontend only

```
npm install
bundle install
```

### Regenerating data files

Create a python 2 virtual environment, e.g. with `virtualenv2 env`

Activate it and install python dependencies

```
source env/bin/activate
pip install -r requirements.txt
```

Development
-----------

### Following changes to JS or CSS

```
npm run build
```

Note that it's a good idea to make sure your branch's generated assets are up to date with master before deploying merging your pull request:

```
git fetch
git merge origin/master # ignore conflicts on assets/* or _data/assets.json
rm assets/* _data/assets.json
npm run build
```

Then stage the changes and commit as you would normally for a merge.

Be sure to run jekyl and have a quick look whether things look and work right.

### Run a local server to view the site

```
bundle exec jekyll serve --watch
```

Regenerating the site can take over a minute on a typical dev machine. You can speed it up by working on a subset of the site data. We delete a bunch of the routing files and tell git to ignore those changes in your local repository using `git update-index --assume-unchanged`. This means only national departments and departments from Mpumalanga and the Eastern Cape will exist, bringing regeneration time down to about 10s.

```
git ls-files|grep provincial|egrep -v '(mpumalanga|eastern-cape)' | grep html | tr '\n' ' ' | xargs git update-index --assume-unchanged
git ls-files|grep provincial|egrep -v '(mpumalanga|eastern-cape)' | grep html | tr '\n' ' ' | xargs rm
```

### Regenerating data files

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

Testing
--------------

### Front-end Regression Testing
Make sure localhost is running and then run `npm test`.


Architecture
--------------

### Front-end

Front-end files are structured according to [SUIT CSS principles](https://github.com/suitcss/suit/blob/master/doc/README.md) - an approach developed by Twitter, BBC Three, Cloud Four and Segment.

In short, SUIT CSS is a component-based system that _'allows for the implementation and composition of loosely coupled, independent [User Interface] units into well-defined composite objects'_.

The above SUIT CSS principles is implemented into our underlying Jekyll structure by grouping all front-end styling/behaviour resources into the root `_includes` folder as one of two sub-folders: `components` and `utilities`:

- **Utilities** influence the entire front-end on  a global scale. For example, either as the styling of all `<a>` tags, helper scripts used by all components or as polyfills for features not supported on older browsers.
- **Components** are a variety of files (`.js`, `.scss`, `.html`) scoped to specific UI units. As per SUIT CSS convention, these files are encapsulated by a certain section of the DOM. For example, all behaviour/styling in the `Tooltip` folder will only correspond to the DOM fragment inside a parent DOM Node with the `Tooltip` class.