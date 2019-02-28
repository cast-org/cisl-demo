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
                        index: "http://localhost:3000/webpubindex.json"
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
                            args: ["{indexLoader}.resources.index.resourceText", "{that}.itemTemplate", "{that}.container"]
                        }
                    },
                    members: {
                        itemTemplate: '<div class="card card-index"> <div class="card-img"> <img class="card-img-top img-fluid" src="%pubRoot/%id/images/%image" alt="%alt"> </div> <div class="card-body"> <div class="eyebrow">%type</div> <a href="index-readium.html?pub=%id" class="card-title">%title</a> </div>'
                    }
                }
            }
        }
    });

    cisl.library.display.appendIndexMarkup = function(indexResourceText, itemTemplate, container) {
        var index = JSON.parse(indexResourceText);
        fluid.each(index, function (item) {
            var itemMarkup = fluid.stringTemplate(itemTemplate, {
                id: item.id,
                image: item.image,
                alt: item.alt,
                title: item.title,
                type: item.type,
                pubRoot: item.pubRoot
            });
            container.append(itemMarkup);
        });
    };

})(fluid_3_0_0);
