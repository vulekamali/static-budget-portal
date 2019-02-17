var expect = require('chai').expect;
const { exec } = require('child_process');

describe('site just before budget speech', function () {
  it('should show the pre-speech notice', function () {

    before(() => {
      /** copy templates, js, css, images and everything except data and routes to test directory.
          Something like rsync --exclude **.md --exclude **.html . test/pre-budget
      */

      // start jekyll detached (and capture the PID from stdout once it's running to kill later)
      const jekyll_options = {
        // jekyll --source doesn't support running test sites from the root dir so need this
        // https://github.com/jekyll/jekyll/issues/6060
        "cwd": process.cwd() + "/test/pre-budget"
      };
      exec('bundle exec jekyll serve --trace --strict_front_matter --detach', jekyll_options, (error, stdout, stderr) => {
        if (error) {
          console.error(`exec error: ${error}`);
          return;
        }
        console.log(`stdout: ${stdout}`); // capture PID here
        console.log(`stderr: ${stderr}`);
      });
    });

    // clean up jekyll server
    after(() => {});

    expect("page content").to.be.equal("pre-speech notice");

  });
});
