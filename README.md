# HitFox Tech Department Webpage
This is the source code of the new HitFox Tech Department webpage.
## Folder Structure
```
.
config.rb
|-- dist/
    |-- assets/
        |-- css/
        |-- images/
        |-- js/
        |-- svg/
    index.html
Gemfile
|-- src/
    |-- assets/
       |-- css/
       |-- images/
       |-- js/
       |-- scss/
       |-- svg/
    index.html.erb
    |-- layouts/
```

## Setup
* Middleman
* Gulp
* Packages via npm

## Installation
* `gem install bundler`
* `bundle install`
* `npm i`

## Gulp Tasks

* `loadNormalize` loads normalize.css and renames it into normalize.scss.
* `sass` compiles `.scss` files into regular `.css` files.
* `sass:watch` watches for changes in `.scss` files and compiles them into regular `.css`.
* `sass:build` compiles `.scss` into `.css` and puts the file into the .tmp location. Has to be used in combination with `sass:prefix`.
* `sass:prefix` adds prefixes to the `.css` file and copies it into the .dist location. Has to be used in combination with `sass:build`.
* `build` runs the sass build version, postcss and cssminify with the scss/css files.
* `default`runs sass:watch + livereload (using the browser extension).

## Running the project
### Dev
`middleman server` + `gulp`

### Build
`middleman build` + `gulp build`