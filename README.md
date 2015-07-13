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
* [Editorconfig](http://editorconfig.org/#overview)
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

## Scss
* Grid used [csswizardry-grids](https://github.com/csswizardry/csswizardry-grids).
* Reset used [normalize.css](https://github.com/necolas/normalize.css/).

## Scss Guidelines
### Syntax & Formatting
* Two (2) spaces indents, no tabs.
* Ideally, 80-characters wide lines.
* Properly written multi-line CSS rules.
* Meaningful use of whitespace.

#### Strings
* Use `@charset 'utf-8';` in the main stylesheet (styles.scss) to avoid any potentiale character encoding issues.
* Strings should always be wrapped with single quotes ('). Specific CSS values such as initial or sans-serif require not to be quoted.
* URLs should be quoted as well.

#### Numbers
* No trailing and leading zeros.
```
.foo {
  font-size: 1em;
  margin-bottom: .8rem;
}
```
* A value of 0 should never have a unit.
* Top-level numeric calculations should always be wrapped in parentheses.
```
.foo {
  width: (100% / 4);
}
```

#### Colors
* [HSL notation](https://en.wikipedia.org/wiki/HSL_and_HSV) (When using HSL or RGB notation, always add a single space after a comma (,) and no space between parentheses ((, )) and content.)
* Use color variables like the following: :`$color-colorname` (For color names go to [Name that color](http://chir.ag/projects/name-that-color/#6195ED)).
