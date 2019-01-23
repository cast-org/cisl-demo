# CISL Reader demo

Repo for work for the front-end side of [CISL](http://cisl.cast.org).

## Live demo

http://cisl-demo.cast.org

## Repository structure

- `src` contains code, markup and styling, particularly:
  - Code to enable on-page glossary using [CAST Figuration](http://figuration.org/)
    - And a preference toggle for turning this feature on and off
    - a number of customizations for the standard Infusion [User Interface Options](https://docs.fluidproject.org/infusion/development/UserInterfaceOptionsAPI.html) component to:
        - integrate the Glossary preference
        - remove some unwanted preferences
        - change the options / appearance / behaviour of others
- `pubs` contains a few example "books" in (approximately) the format that the 
Readium 2 streamer would output; this includes a [Readium Web Publication Manifest](https://readium.org/webpub-manifest/),
HTML files and images.  A glossary.json file, specific to this application,
is also included.

## Building and running the demo

1. Clone this repo
2. `npm install` for dependencies
3. `grunt build` will run the necessary setup to build the project to `target`, including copying over assets and dependencies from `node_modules` and running webpack
4. Run a server from the `target` directory, like [http-server](https://www.npmjs.com/package/http-server)
5. Access `http://localhost:8080/` from your browser

## Developing

1. See "Building and Running the Demo" above
2. You can run `grunt watch` to watch the `src` directory and rebuild the demo as you make changes for speedier development flow.
