
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