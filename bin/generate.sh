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

regenerate_data() {
    if [[ "${TRAVIS_COMMIT_MESSAGE}" == *"[staging]"* ]]
    then
        echo -n "STAGING"
        export PORTAL_URL=https://dynamicbudgetportal-staging.openup.org.za/
    else
        echo -n "PROD"
    fi
    python generate/from_dynamic.py 1>&2
}

if [ "${TRAVIS_PULL_REQUEST}" = "true" ]
then
    echo "Ignoring pull request"
elif [[ "${TRAVIS_COMMIT_MESSAGE}" == *"[ci]"* ]] || [[ "${REMOTE_TRIGGER}" == "true" ]]
then

    DATA_ENVIRONMENT=$(regenerate_data)

    # DEBUG
    git status
    git diff

    if ! git diff-index --quiet HEAD --; then
        # save changes
        git add .
        setup_git
        git commit -m "Updated data via TravisCI using ${DATA_ENVIRONMENT} data server"

        echo "Deploying to GitHub"

        git push origin HEAD:$TRAVIS_BRANCH
    else
        echo "No changes to commit."
    fi
else
    echo "No data update requested."
fi
