set -euxo pipefail

setup_git() {
    git config user.email "<webapps@openup.org.za>"
    git config user.name "Data Rebuild (via TravisCI)"

    # add git auth
    eval "$(ssh-agent -s)" #start the ssh agent
    set +x
    openssl aes-256-cbc -K $encrypted_d99de3c51fb1_key -iv $encrypted_d99de3c51fb1_iv -in deploy_key.enc -out deploy_key -d
    set -x
    chmod 600 deploy_key # this key should have push access
    ssh-add deploy_key
    git remote set-url origin git@github.com:OpenUpSA/static-budget-portal.git
}

if [ "${TRAVIS_PULL_REQUEST}" = "false" ]
then
    echo "Ignoring pull request"
elif [ "${TRAVIS_COMMIT_MESSAGE}" = *"[ci]"* ]
then

    python generate/from_dynamic.py

    # DEBUG
    git status

    # save changes
    git add .
    git commit -m "Updated data via TravisCI" || exit 0

    echo "Deploying to GitHub"

    git push origin

else
    echo "No data update requested."
fi
