// Declare dependencies
/* global module */

module.exports = function (grunt) {

    var webpackConfig = require("./webpack.config");

    "use strict";

    // Project configuration.
    grunt.initConfig({
        // Project package file destination.
        pkg: grunt.file.readJSON("package.json"),
        eslint: {
            all: ["src/**/*.js", "tests/**/*.js", "demos/**/*.js", "examples/**/*.js", "*.js", "!src/lib/**"]
        },
        jsonlint: {
            all: ["package.json", ".jshintrc", "src/**/*.json", "tests/**/*.json", "demos/**/*.json", "!node_modules", "!src/lib/**", "!tests/lib/**"]
        },
        watch: {
            src: {
                files: ["src/**"],
                tasks: ["copy:srcFiles", "webpack:dev"]
            },
            publications: {
                files: ["pubs/**"],
                tasks: ["copy:publications"]
            }
        },
        webpack: {
            dev: webpackConfig,
            prod: Object.assign(webpackConfig, {mode: "production"})
        },
        copy: {
            publications: {
                files: [
                    {
                        expand: true,
                        cwd: "pubs",
                        src: "**",
                        dest: "target/pubs"
                    }
                ]
            },
            srcFiles: {
                files: [
                    {
                        expand: true,
                        cwd: "src",
                        src: "**",
                        dest: "target"
                    }
                ]
            },
            demoLibraries: {
                // TODO: some of these can be removed due to inclusion in webpack
                files: [
                    {
                        expand: true,
                        cwd: "node_modules/infusion/dist",
                        src: "**",
                        dest: "target/lib/infusion/dist"
                    },
                    {
                        expand: true,
                        cwd: "node_modules/infusion/src",
                        src: "**",
                        dest: "target/lib/infusion/src"
                    },
                    {
                        expand: true,
                        cwd: "node_modules/figuration/dist",
                        src: "**",
                        dest: "target/lib/figuration"
                    },
                    {
                        expand: true,
                        cwd: "node_modules/mark.js/dist",
                        src: "jquery.mark.min.js",
                        dest: "target/lib/mark.js"
                    }
                ]
            }
        },
        clean: {
            target: "target/*"
        }
    });

    // Load the plugin(s):
    grunt.loadNpmTasks("fluid-grunt-eslint");
    grunt.loadNpmTasks("grunt-jsonlint");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.loadNpmTasks("grunt-webpack");

    // Custom tasks:

    grunt.registerTask("default", ["lint"]);
    grunt.registerTask("lint", "Apply eslint and jsonlint", ["eslint", "jsonlint"]);
    grunt.registerTask("build", "Create full application in target directory", ["clean:target", "copy:demoLibraries", "copy:publications", "copy:srcFiles", "webpack:dev"]);
    grunt.registerTask("buildProd", "Create full application in target directory", ["clean:target", "copy:demoLibraries", "copy:publications", "copy:srcFiles", "webpack:prod"]);
};
