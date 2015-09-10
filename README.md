Tech Webpage
=============

##Deploy
* Every push to branch `develop` will be deployed automatically to [staging].
* Every push to branch `master` will be deployed automatically to [production].


##Install
```bash
git clone git@github.com:HitFox/tech-webpage.git
cd tech-webpage
npm install
gem install scss_lint
```

[staging]: https://tech-webpage-staging.herokuapp.com/
[production]: https://tech-webpage.herokuapp.com/


##Develop
Run `npm start` to start gulp, watching all the files.
That'll compile everything from `/src` into `/public`.

Run `npm run server` to start the express server that'll serve files
from `/public` to <http://localhost:4000/>

Run `npm run build` to perform a production build instead of a
development build.


## Scss
The Scss files follow a methodologies, called ITCSS, invented by Harry Roberts.

### Generic
The generic files combine the following:
* Normalize (by Nicolas Gallagher)
* Reset to complement Normalize (by Harry Roberts)
* Box-sizing
