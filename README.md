
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

Following changes to JS or CSS

```
npm run build
```

Run a local server to view the site

```
bundle exec jekyll serve --watch
```

### Regenerating data files

```
source env/bin/activate
python generate/files.py
```

Then use `git status` and `git diff` to get an idea of what changed. If it looks sensible, add the updated files and commit and PR back into the branch where you want changes reflected.


Architecture
--------------

### Front-end

Front-end files are structured according to [SUIT CSS principles](https://github.com/suitcss/suit/blob/master/doc/README.md) - an approach developed by Twitter, BBC Three, Cloud Four and Segment.

In short, SUIT CSS is a component-based system that _'allows for the implementation and composition of loosely coupled, independent [User Interface] units into well-defined composite objects'_. 

The above SUIT CSS principles is implemented into our underlying Jekyll structure by grouping all front-end styling/behaviour resources into the root `_includes` folder as one of two sub-folders: `components` and `utilities`:

- **Utilities** influence the entire front-end on  a global scale. For example, either as the styling of all `<a>` tags, helper scripts used by all components or as polyfills for features not supported on older browsers.
- **Components** are a variety of files (`.js`, `.scss`, `.html`) scoped to specific UI units. As per SUIT CSS convention, these files are encapsulated by a certain section of the DOM. For example, all behaviour/styling in the `Tooltip` folder will only correspond to the DOM fragment inside a parent DOM Node with the `Tooltip` class.