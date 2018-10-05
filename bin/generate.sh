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

# Initialise REMOTE_TRIGGER if it isn't set.
# https://stackoverflow.com/questions/3601515/how-to-check-if-a-variable-is-set-in-bash/13864829#13864829
# Since we use -u to error when variables are unexpectedly not set, we use
# conditional substitution (+notnull) so that the conditional expression
# below doesn't error, and its result be true if REMOTE_TRIGGER wasn't set.
if [ -z ${REMOTE_TRIGGER+notnull} ]
then
    REMOTE_TRIGGER="false"
fi

if [ "${TRAVIS_PULL_REQUEST}" = "true" ]
then
    echo "Ignoring pull request"
elif [[ "${TRAVIS_COMMIT_MESSAGE}" == *"[ci]"* ]] || [[ "${REMOTE_TRIGGER}" == "true" ]]
then
    setup_git
    git log -n 2
    git pull origin $TRAVIS_BRANCH
    git log -n 2

    DATA_ENVIRONMENT=$(regenerate_data)

    # DEBUG
    git status
    git diff | head -n 100

    if [[ `git status --porcelain | grep -v deploy_key` ]]
    then
        # save changes
        git add .
        # !!! ENSURE WE DON'T COMMIT PLAINTEXT DEPLOY PRIVATE KEY !!!
        git reset -- deploy_key
        git commit -m "Updated data via TravisCI using ${DATA_ENVIRONMENT} data server"

        echo "Deploying to GitHub"

        git push origin HEAD:$TRAVIS_BRANCH
    else
        echo "No changes to commit."
    fi
else
    echo "No data update requested."
fi
