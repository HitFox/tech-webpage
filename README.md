Finleap Website
================

![Heroku](http://heroku-badge.herokuapp.com/?app=finleap-website-staging&style=flat)

- Staging: [staging.finleap.com][staging]
- Production: [www.finleap.com][production]

# Install

```bash
git clone git@github.com:HitFox/finleap-website.git
cd finleap-website
npm install
gem install scss_lint
```

# Develop

```bash
npm run watch
```

We use [express-livereload][express-livereload] to reload the server whenever you change anything.

## Precommit Hook
This project runs a precommit hook which triggers scss-lint on every commit. If you're using a Git Client, like Tower or SourceTree you might run into an error. To resolve this open your application right from the terminal (e.g. `open /Applications/Tower.app`). 

## Images
We have an implementation of "Responsive Images" running on this page. We need 3 different sources for this to work.
They have to follow this naming convention:
* `name-large-2x.jpg`
* `name-large.jpg`
* `name-medium.jpg`

The dimensions of the images have to be following:
* `large-2x: 1836px x height`
* `large: 1224px x height`
* `medium: 640px x height`


[staging]: http://staging.finleap.com
[production]: http://www.finleap.com
[express-livereload]: https://www.npmjs.com/package/express-livereload

