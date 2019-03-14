$(document).ready(function () {

    var prefsEditor = fluid.prefs.create(".flc-prefsEditor-separatedPanel", {
        build: {
            gradeNames: [
                "cisl.prefs.auxSchema.starter", // this will add the starter set
                "fluid.prefs.auxSchema.letterSpace", // this will add the letter space adjuster and enactor
                "cisl.prefs.auxSchema.glossary.demo" // adds the glossary
            ],
            auxiliarySchema: {
                "loaderGrades": ["cisl.prefs.composite.separatedPanel"],
                "template": "html/SeparatedPanelPrefsEditor.html",
                "terms": {
                    "templatePrefix": "lib/infusion/src/framework/preferences/html",  // Must match the keyword used below to identify the common path to settings panel templates.
                    "messagePrefix": "lib/infusion/src/framework/preferences/messages"  // Must match the keyword used below to identify the common path to message files.
                },
            }
        }
    });
});
