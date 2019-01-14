/* global fluid, cisl, markGlossaryWords, unmarkGlossaryWords */

var fluid_3_0_0 = fluid_3_0_0 || {};

(function (fluid) {
    "use strict";

    fluid.defaults("cisl.prefs.enactor.glossary", {
        gradeNames: ["fluid.prefs.enactor"],
        preferenceMap: {
            "cisl.prefs.glossary": {
                "model.glossary": "default"
            }
        },
        modelListeners: {
            glossary: {
                listener: "{that}.applyGlossary",
                args: ["{that}.model.glossary"],
                namespace: "toggleGlossary"
            }
        },
        invokers: {
            applyGlossary: {
                funcName: "cisl.prefs.enactor.glossary.applyGlossary",
                args: ["{arguments}.0", "{that}"]
            }
        },
        events: {
            glossaryMarked: null,
            glossaryUnmarked: null
        },
        glossaryOptions: {
            // Selector to use for glossary
            scopeSelector: "article"
        }
    });

    cisl.prefs.enactor.glossary.applyGlossary = function (enableGlossary, that) {
        var scopeSelector = that.options.glossaryOptions.scopeSelector;
        if (enableGlossary) {
            markGlossaryWords(scopeSelector);
            that.events.glossaryMarked.fire();
        } else if (!enableGlossary) {
            unmarkGlossaryWords(scopeSelector);
            that.events.glossaryUnmarked.fire();
        }
    };

})(fluid_3_0_0);
