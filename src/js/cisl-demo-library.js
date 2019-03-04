/* global fluid, cisl */

(function (fluid) {
    "use strict";

    fluid.defaults("cisl.library.display", {
        gradeNames: ["fluid.component"],
        components: {
            indexLoader: {
                type: "fluid.resourceLoader",
                options: {
                    resources: {
                        index: "http://localhost:3000/opds2/publications.json"
                    }
                }
            },
            libraryView: {
                type: "fluid.viewComponent",
                // must specify
                container: "",
                options: {
                    listeners: {
                        "{indexLoader}.events.onResourcesLoaded": {
                            func: "cisl.library.display.appendIndexMarkup",
                            args: ["{indexLoader}.resources.index.resourceText", "{that}.options.strings.itemTemplate", "{that}.options.contentServerRootUrl", "{that}.container"]
                        }
                    },
                    contentServerRootUrl: "http://localhost:3000",
                    strings: {
                        itemTemplate: '<div class="card card-index"> <div class="card-img"> <img class="card-img-top img-fluid" src="%image" alt="%alt"> </div> <div class="card-body"> <div class="eyebrow">%type</div> <a href="index-readium.html?pub=%id&pubDirectory=%pubDirectory" class="card-title">%title</a> </div>'
                    }
                }
            }
        }
    });

    cisl.library.display.appendIndexMarkup = function(indexResourceText, itemTemplate, contentServerRootUrl, container) {
        var publicationsFeed = JSON.parse(indexResourceText);

        fluid.each(publicationsFeed.publications, function (publication) {

            // TODO: not great
            var manifestUrl = publication.links[0].href;

            var pubId = cisl.library.display.parsePubIdFromUrl(manifestUrl);

            var itemMarkup = fluid.stringTemplate(itemTemplate, {
                id: pubId,
                // TODO: also not great
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

    cisl.library.display.parsePubIdFromUrl = function (pubUrl) {
        var pubId = pubUrl.split("pub/")[1].split("/manifest")[0];
        console.log(pubId);
        return pubId;
    };

})(fluid_3_0_0);
