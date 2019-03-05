/* global fluid, cisl */

(function (fluid) {
    "use strict";

    fluid.defaults("cisl.library.libraryIndex", {
        gradeNames: "fluid.component",
        invokers: {
            createIndex: {
                funcName: "cisl.library.libraryIndex.createIndex",
                args: [
                    "{arguments}.0",
                    "{that}"
                ]
            }
        }
    });

    cisl.library.libraryIndex.createIndex = function (publicationsResourceText, libraryIndexComponent) {
            var publicationsFeed = JSON.parse(publicationsResourceText);

            var index = {};

            fluid.each(publicationsFeed.publications, function (publication) {
                // TODO: this is not great
                var manifestUrl = publication.links[0].href;

                var streamerPubId = cisl.library.libraryIndex.parsePubIdFromUrl(manifestUrl);

                var identifier = publication.metadata.identifier;

                var pubForIndex = $.extend({}, publication, {
                    streamerPubId: streamerPubId
                });

                index[identifier] = pubForIndex;
            });

            libraryIndexComponent.index = index;
            libraryIndexComponent.events.onIndexReady.fire();
    };

    cisl.library.libraryIndex.parsePubIdFromUrl = function (pubUrl) {
        var pubId = pubUrl.split("pub/")[1].split("/manifest")[0];
        return pubId;
    };

    fluid.defaults("cisl.library.libraryView", {
        gradeNames: "fluid.viewComponent",
        contentServerRootUrl: "http://localhost:3000",
        strings: {
            itemTemplate: '<div class="card card-index"> <div class="card-img"> <img class="card-img-top img-fluid" src="%image" alt="%alt"> </div> <div class="card-body"> <div class="eyebrow">%type</div> <a href="index-readium.html?pub=%streamerPubId&pubDirectory=%pubDirectory" class="card-title">%title</a> </div>'
        },
        invokers: {
            appendIndexMarkup: {
                funcName: "cisl.library.libraryView.appendIndexMarkup",
                args: ["{arguments}.0", "{that}.options.strings.itemTemplate", "{that}.options.contentServerRootUrl", "{that}.container"]
            }
        }
    });

    cisl.library.libraryView.appendIndexMarkup = function(libraryIndex, itemTemplate, contentServerRootUrl, container) {

        fluid.each(libraryIndex, function (publication) {

            var itemMarkup = fluid.stringTemplate(itemTemplate, {
                streamerPubId: publication.streamerPubId,
                // TODO: this is not great
                image: publication.images[0].href,
                alt: "",
                title: publication.metadata.title,
                type: publication.metadata.description,
                contentServerRootUrl: contentServerRootUrl,
                pubDirectory: "pub"
            });
            container.append(itemMarkup);
        });
    };

    fluid.defaults("cisl.library.display", {
        gradeNames: ["fluid.component"],
        components: {
            opdsLoader: {
                type: "fluid.resourceLoader",
                options: {
                    resources: {
                        index: "http://localhost:3000/opds2/publications.json"
                    }
                }
            },
            libraryIndex: {
                type: "cisl.library.libraryIndex",
                options: {
                    listeners: {
                        "{opdsLoader}.events.onResourcesLoaded": {
                            func: "{that}.createIndex",
                            args: ["{opdsLoader}.resources.index.resourceText"]
                        }
                    },
                    events: {
                        onIndexReady: null
                    }
                }
            },
            libraryView: {
                type: "cisl.library.libraryView",
                // must specify
                container: "",
                options: {
                    listeners: {
                        "{libraryIndex}.events.onIndexReady": {
                            func: "{that}.appendIndexMarkup",
                            args: ["{libraryIndex}.index"]
                        }
                    }
                }
            }
        }
    });

})(fluid_3_0_0);
