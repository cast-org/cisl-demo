# CISL Front-End Demo

Repo for work for the front-end side of [CISL](http://www.cast.org/our-work/research-development/projects/center-on-inclusive-software-for-learning.html).

## About the Repo

- `src` contains code, markup and styling, particularly:
  - Code to enable on-page glossary using [CAST Figuration](http://figuration.org/)
    - And a preference toggle for turning this feature on and off
    - a number of customizations for the standard Infusion [User Interface Options](https://docs.fluidproject.org/infusion/development/UserInterfaceOptionsAPI.html) component to:
        - integrate the Glossary and BeeLine Reader preferences
        - remove some unwanted preferences
        - change the options / appearance / behaviour of others

## Building and Running the Demo

1. Clone this repo
2. `npm install` for dependencies
3. `grunt build` will run the necessary setup to build the project to `target`, including copying over assets and dependencies from `node_modules` and running webpack
4. Run a server from the `target` directory, like [http-server](https://www.npmjs.com/package/http-server)
5. Access `http://localhost:8080/` or a similar URL from your browser, or `http://localhost:8080/index-readium` for the Readium-based demo

## Developing

1. See "Building and Running the Demo" above
2. You can run `grunt watch` to watch the `src` directory and rebuild the demo as you make changes for speedier development flow.
