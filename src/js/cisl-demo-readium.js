/* global fluid, cisl, r2NavWeb */

(function (fluid) {
    "use strict";

    fluid.defaults("cisl.readium.versionSwitcher", {
        gradeNames: ["fluid.component"],
        components: {
            library: {
                type: "cisl.library"
            },
            versionSwitcherMarkup: {
                type: "fluid.viewComponent",
                // Must specify
                container: "",
                options: {
                    selectors: {
                        switcherList: ".cislc-version-switcher-list"
                    },
                    invokers: {
                        addSwitcherMarkup: {
                            funcName: "cisl.readium.versionSwitcher.addSwitcherMarkup",
                            args: ["{library}", "{that}", "{arguments}.0"]
                        }
                    }
                }
            }
        }
    });

    cisl.readium.versionSwitcher.addSwitcherMarkup = function(library, versionSwitcherMarkup, publication) {
        console.log("addSwitcherMarkup", library, versionSwitcherMarkup, identifier, publication.metadata.identifier);
        var baseIdentifier = publication.metadata.identifier;
        var originalPublicationId = baseIdentifier.split(".alt-version-")[0];
        var identifier = originalPublicationId;

        var mainIndex = library.libraryIndex.index
        var altVersionIndex = library.libraryIndex.altVersionIndex;
        var originalVersion = mainIndex[identifier];
        var altVersions = altVersionIndex[identifier];
        if(altVersions) {
            var switcherList = versionSwitcherMarkup.locate("switcherList");

            var originalHtml = '<li class="page-item"><a href="index-readium.html?pubDirectory=pub&pub='
                + originalVersion.streamerPubId
                + '" class="page-link">'
                + 'Original'
                + '</a></li>';

            switcherList.append(originalHtml);

            fluid.each(altVersions, function (altVersion, altVersionKey) {
                console.log(altVersion, altVersionKey);
                var linkHtml = '<li class="page-item"><a href="index-readium.html?pubDirectory=pub&pub='
                    + altVersion.streamerPubId
                    + '" class="page-link">'
                    + altVersionKey
                    + '</a></li>';

                switcherList.append(linkHtml);
            });
        }
    };

    fluid.defaults("cisl.readium.webViewer", {
        gradeNames: ["fluid.viewComponent"],
        components: {
            versionSwitcher: {
                type: "cisl.readium.versionSwitcher",
                options: {
                    events: {
                        onVersionSwitcherRequirementsReady: {
                            events: {
                                publicationLoaded: "{webViewer}.events.onPublicationLoaded",
                                indexReady: "{that}.library.libraryIndex.events.onIndexReady"
                            }
                        }
                    },
                    components: {
                        versionSwitcherMarkup: {
                            options: {
                                listeners: {
                                    "{versionSwitcher}.events.onVersionSwitcherRequirementsReady": {
                                        func: "{that}.addSwitcherMarkup",
                                        args: ["{webViewer}.publication"]
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        readiumOptions: {
            webpubUrl: {
                expander: {
                    funcName: "cisl.readium.webViewer.determineManifestUrl",
                    args: ["{that}.options.readiumOptions.manifestUrlConfig.pubIdParameter",
                    "{that}.options.readiumOptions.manifestUrlConfig.pubDirectoryParameter", "{that}.options.readiumOptions.manifestUrlConfig.urlTemplate", "{that}.options.readiumOptions.manifestUrlConfig.contentServerRootUrl"]
                }
            },
            manifestUrlConfig: {
                pubIdParameter: "pub",
                pubDirectoryParameter: "pubDirectory",
                contentServerRootUrl: "http://localhost:3000",
                urlTemplate: "%contentServerRootUrl/%pubDirectory/%pubId/manifest.json"
            },
            viewport: {
                padding: {
                    width: 0,
                    height: 50
                },
                width: {
                    expander: {
                        funcName: "cisl.readium.webViewer.getContainerBasedMeasurement",
                        args: ["{that}.dom.iframeContainer", "width", "{that}.options.readiumOptions.viewport.padding.width"]
                    }
                },
                height: {
                    expander: {
                        funcName: "cisl.readium.webViewer.getContainerBasedMeasurement",
                        args: ["{that}.dom.iframeContainer", "height", "{that}.options.readiumOptions.viewport.padding.height"]
                    }
                },
                vertical: true
            },
            pageLayout: {
                padding: {
                    width: 0,
                    height: 50
                },
                width: {
                    expander: {
                        funcName: "cisl.readium.webViewer.getContainerBasedMeasurement",
                        args: ["{that}.dom.iframeContainer", "width", "{that}.options.readiumOptions.pageLayout.padding.width"]
                    }
                },
                height: {
                    expander: {
                        funcName: "cisl.readium.webViewer.getContainerBasedMeasurement",
                        args: ["{that}.dom.iframeContainer", "height", "{that}.options.readiumOptions.pageLayout.padding.height"]
                    }
                },
                // Valid options for spreadMode:
                // - Freeform,
                // - FitViewportAuto,
                // - FitViewportSingleSpread,
                // - FitViewportDoubleSpread,
                spreadMode: "Freeform"
            }
        },
        selectors: {
            prev: ".cislc-readium-control-prev",
            next: ".cislc-readium-control-next",
            iframeContainer: ".cislc-readium-iframe-container"
        },
        invokers: {
            nextScreen: {
                "this": "{that}.nav",
                "method": "nextScreen"
            },
            previousScreen: {
                "this": "{that}.nav",
                "method": "previousScreen"
            }
        },
        events: {
            onPublicationLoaded: null,
            onPublicationLoadError: null,
            onIFrameLoaderReady: null,
            onIFrameLoaded: null,
            onRenditionReady: null,
            onRenditionRenderError: null,
            onNavigatorReady: null
        },
        listeners: {
            "onCreate.loadPublication": {
                func: "cisl.readium.webViewer.loadPublication",
                args: ["{that}.options.readiumOptions",
                        "{that}.events.onPublicationLoaded",
                        "{that}.events.onPublicationLoadError",
                        "{that}"]
            },
            "onPublicationLoaded.handle": {
                func: "cisl.readium.webViewer.handlePublicationLoaded",
                args: ["{arguments}.0",
                        "{that}.events.onIFrameLoaderReady",
                        "{that}.events.onIFrameLoaded",
                        "{that}.events.onRenditionReady",
                        "{that}.events.onRenditionRenderError",
                        "{that}"]
            },
            "onRenditionReady.handle": {
                func: "cisl.readium.webViewer.handleRenditionReady",
                args: ["{that}.events.onNavigatorReady", "{that}"]
            },
            "onIFrameLoaded.handle": {
                func: "cisl.readium.webViewer.handleIFrameLoaded",
                args: ["{arguments}.0", "{that}"]
            },
            "onCreate.bindPrev": {
                "this": "{that}.dom.prev",
                "method": "click",
                "args": ["{that}.previousScreen"]
            },
            "onCreate.bindNext": {
                "this": "{that}.dom.next",
                "method": "click",
                "args": ["{that}.nextScreen"]
            }
        },
        members: {
            publication: null,
            rendition: null,
            nav: null,
            iFrameLoader: null,
        }
    });

    cisl.readium.webViewer.determineManifestUrl = function (pubIdParameter, pubDirectoryParameter, urlTemplate, contentServerRootUrl) {
        var pubId = new URLSearchParams(window.location.search).get(pubIdParameter);
        var pubDirectory = new URLSearchParams(window.location.search).get(pubDirectoryParameter);

        return fluid.stringTemplate(urlTemplate, {
            pubId: pubId,
            pubDirectory: pubDirectory,
            contentServerRootUrl: contentServerRootUrl
            });
    };

    cisl.readium.webViewer.getContainerBasedMeasurement = function (container, direction, padding) {
        return container[direction]() - padding;
    };

    cisl.readium.webViewer.handleIFrameLoaded = function (loadedIFrame, readiumComponent) {
        var readiumIframeBody = $(loadedIFrame).contents().find("body");
        var injector = fluid.uiEnhancerInjector({
            components: {
                iFrameUIEnhancer: {
                    container: readiumIframeBody
                }
            }
        });
        setUpImageDetails(readiumIframeBody);

    };

    cisl.readium.webViewer.loadPublication = function (readiumOptions, loadEvent, loadErrorEvent, readiumComponent) {
        var fullURL = new URL(readiumOptions.webpubUrl, window.location.href).toString();

        r2NavWeb.Publication.fromURL(fullURL).then(
            function (publication) {
            readiumComponent.publication = publication;
            loadEvent.fire(publication);
        }, function (error) {
            console.log(error);
            loadErrorEvent.fire(error);
        });
    };

    cisl.readium.webViewer.handlePublicationLoaded = function (publication, iFrameLoaderReadyEvent, iFrameLoadedEvent, renditionReadyEvent, renditionRenderErrorEvent, readiumComponent) {

        var readiumOptions = readiumComponent.options.readiumOptions;

        console.log(publication, readiumComponent);

        // Construct links to alternate versions, if any
        if (publication.links && publication.links.length>1) {
            var ul = $('#version-switcher ul');
            for (var i in publication.links) {
                var link = publication.links[i];
                if (link.rel.has('self')) {
                    // Current version
                    var linkHtml = '<li class="page-item"><span class="page-link active">'
                        + link.title
                        + '</span></li>';
                } else {
                    // Link to alternate version
                    var linkHtml = '<li class="page-item"><a href="index-readium.html?pub='
                        + link.href
                        + '" class="page-link">'
                        + link.title
                        + '</a></li>';
                }
                ul.append(linkHtml);
            }
        } else {
            $('#version-switcher').remove();
        }

        // FIXME, this is a hack
        var glossaryURI = publication.sourceURI.replace("manifest.json", "EPUB/glossary.json");
        jQuery.get(glossaryURI)
            .done(function(res) {
                addToUserGlossary(res, glossaryURI);
            })
            .fail(function(err) {
                console.log("Failure getting glossary", err);
            });

        var loader = new r2NavWeb.IFrameLoader(publication.getBaseURI());

        loader.setReadiumCssBasePath("http://" + window.location.host + "/readium-css");

        readiumComponent.iFrameLoader = loader;

        iFrameLoaderReadyEvent.fire(loader);

        loader.addIFrameLoadedListener(function (loadedIframe) {
            iFrameLoadedEvent.fire(loadedIframe);
        });

        var cvf = new r2NavWeb.R2ContentViewFactory(loader);

        var rendition = new r2NavWeb.Rendition(publication, readiumComponent.locate("iframeContainer")[0], cvf);

        rendition.setViewAsVertical(readiumOptions.viewport.vertical);

        // W, H
        rendition.viewport.setViewportSize(readiumOptions.viewport.width, readiumOptions.viewport.height);

        rendition.viewport.setPrefetchSize(Math.ceil(readiumOptions.viewport.width * 0.1));

        var p = rendition.setPageLayout({
            spreadMode: r2NavWeb.SpreadMode[readiumOptions.pageLayout.spreadMode],
            pageWidth: readiumOptions.pageLayout.width,
            pageHeight: readiumOptions.pageLayout.height,
        });

        rendition.render().then(
            function () {
                rendition.viewport.enableScroll(false);
                rendition.viewport.renderAtOffset(0);
                readiumComponent.rendition = rendition;
                renditionReadyEvent.fire();
            },
            function (error) {
                console.log(error);
                renditionRenderErrorEvent.fire();
            }
        );
    };

    cisl.readium.webViewer.handleRenditionReady = function (navigatorReadyEvent, readiumComponent) {
        console.log("handleRenditionReady", readiumComponent);
        var nav = new r2NavWeb.Navigator(readiumComponent.rendition);
        readiumComponent.nav = nav;
        navigatorReadyEvent.fire();
    };

    fluid.defaults("fluid.uiEnhancerInjector", {
                gradeNames: ["fluid.component"],
                components: {
                    iFrameUIEnhancer: {
                        type: "fluid.uiEnhancer",
                        // container: "body",
                        options: {
                            model: "{fluid.pageEnhancer}.uiEnhancer.model",
                            gradeNames: ["fluid.uiEnhancer.starterEnactors"],
                            components: {
                                glossary: {
                                    type: "cisl.prefs.enactor.glossary.demo",
                                    options: {
                                        model: {
                                            glossary: "{uiEnhancer}.model.cisl_prefs_glossary"
                                        },
                                        glossaryOptions: {
                                            // Selector to use for glossary
                                            scopeSelector: "{uiEnhancer}.container",
                                            iFrameContainerSelector: ".cislc-readium-iframe-container"
                                        }
                                    }
                                },
                                textSize: {
                                    type: "cisl.prefs.enactor.textSize",
                                    options: {
                                        model: {
                                            value: "{uiEnhancer}.model.fluid_prefs_textSize"
                                        }
                                    }
                                },
                                textFont: {
                                    options: {
                                        model: {
                                            value: "{uiEnhancer}.model.fluid_prefs_textFont"
                                        },
                                        classes: {
                                            arial: "fl-font-arial",
                                            comic: "fl-font-comic-sans",
                                            default: "",
                                            times: "fl-font-times",
                                            verdana: "fl-font-verdana",
                                            "open-dyslexic": "cisl-font-open-dyslexic"
                                        }
                                    }
                                },
                                contrast: {
                                    options: {
                                        model: {
                                            value: "{uiEnhancer}.model.fluid_prefs_contrast"
                                        }
                                    }
                                },
                                lineSpace: {
                                    options: {
                                        model: {
                                            value: "{uiEnhancer}.model.fluid_prefs_lineSpace"
                                        }
                                    }
                                },
                                letterSpace: {
                                    type: "fluid.prefs.enactor.letterSpace",
                                    container: "{uiEnhancer}.container",
                                    options: {
                                        model: {
                                            value: "{uiEnhancer}.model.fluid_prefs_letterSpace"
                                        }
                                    }
                                },
                                enhanceInputs: {
                                    options: {
                                        model: {
                                            value: "{uiEnhancer}.model.fluid_prefs_enhanceInputs"
                                        }
                                    }
                                },
                                tableOfContents: {
                                    options: {
                                        model: {
                                            value: "{uiEnhancer}.model.fluid_prefs_layoutControls"
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            });

})(fluid_3_0_0);
