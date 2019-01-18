// Glossary functionality

// List of glossary words
// TODO when we have user login, this would be persistent data for the user.
var userGlossary = [];

// Map of all word forms, pointing to the word in userGlossary
var alternatesMap = {};


function addToUserGlossary(listOfWords, basePath) {
    for (var i in listOfWords) {
        var item = listOfWords[i];
        if (!findGlossaryWord(item.word)) {
            console.log("New glossary word: ", item.word);
            // Item will have image paths that are relative to the basePath. Make them absolute.
            for (var f in item.images) {
                var image = item.images[f];
                image.src = makeAbsolutePath(basePath, image.src);
            }
            // Add to user's glossary
            userGlossary.push(item);
            var altForms = item.alternateForms;
            if (altForms) {
                for (var f in altForms) {
                    alternatesMap[altForms[f]] = item.word;
                }
            }
        }
    }
}

// Look up and return a word in the glossary list
function findGlossaryWord(word) {
    "use strict";
    for (var i in userGlossary) {
        if (userGlossary[i].word === word) {
            return userGlossary[i];
        }
    }
    return null;
}

// Filter function that, when applied as part of Mark options, only marks up the first occurrence
function onlyFirstMatch(node, term, totalCount, count) {
    "use strict";
    return count === 0;
}

// Filter function that avoids marking a words that is alrady marked
function notAlreadyMarked(node) {
    "use strict";
    return ($(node).closest("a.gloss").length === 0);
}

// Options hash for marking the primary occurrence of words
var primaryMarkOptions = {
    accuracy : "exactly",
    acrossElements: true,
    exclude: [ "h1", "h2", "h3", "h4", "h5", "h6", "figure" ],
    synonyms: alternatesMap,
    filter: onlyFirstMatch,
    element: "a",
    className: "gloss"
};

// Options hash for marking additional occurrences of a word
var secondaryMarkOptions = {
    accuracy : "exactly",
    acrossElements: true,
    synonyms: alternatesMap,
    filter: notAlreadyMarked,
    element: "span",
    className: "glossOther"
};

// Construct a callback function to be called when a match is found
function makeMarkCallbackFunction(word, scope) {
    "use strict";
    return function (node) {
        console.log("Setting up popover, word=", word);

        $(node)
            .data("word", word)
            .attr("href", "#");
        $(node).CFW_Popover({
            placement: function(tip, trigger) {
                return getPopoverPlacement(tip, trigger, ".cislc-readium-iframe-container");
            },
            container: "body",
            content: buildGlossaryPopover(word),
            html: true,
            title: word
        });
    };
}

function getPopoverPlacement(tip, trigger, iframeContainerSelector) {
    var $trigger = $(trigger);
    var loc = {};
    var pos = $trigger.offset();
    var $iframeContainer = $(iframeContainerSelector);
    loc.top = pos.top + $iframeContainer.offset().top + $trigger.height();
    loc.left = pos.left + $iframeContainer.offset().left;
    // return "auto top";
    return loc;
}

function buildGlossaryPopover(word) {
    "use strict";
    var info = findGlossaryWord(word);
    var popoverHtml = "";
    if (info.images) {
        popoverHtml +=
            "      <div class=\"container-fluid\">" +
            "         <div class=\"row\">" +
            "            <div class=\"col-md-6 p-0\">" +
            "               <p>" + info.definition + "</p>" +
            "            </div>" +
            "            <div class=\"col-md-6 p-0\">";
        for (var i in info.images) {
            var img = info.images[i];
            popoverHtml +=
                "               <figure class=\"figure\">" +
                "                  <img src=\"" + img.src + "\" class=\"figure-img img-fluid\" alt=\"" + img.alt + "\">\n" +
//                "                  <figcaption class=\"figure-caption\">" + img.caption + "</figcaption>\n" +
                "               </figure>";
        }
        popoverHtml +=
            "            </div>" +
            "         </div>" + //row
            "      </div>"; // cf
    } else {
        popoverHtml +=
            "<p>" + info.definition + "</p>";
    }

    return popoverHtml;
}


// Add a popover to the first occurrence of each glossary word
// eslint-disable-next-line
function markGlossaryWords(scopeSelector) {
    "use strict";
    var scope = $(scopeSelector) || $("article");

    console.log("markGlossaryWords", scope)

    for (var i in userGlossary) {
        var word = userGlossary[i].word;
        primaryMarkOptions.each = makeMarkCallbackFunction(word, scope);
        scope.mark(word, primaryMarkOptions);
    }

    // Additional actions when popover opens
    scope.on("beforeShow.cfw.popover", "a.gloss",
        function () {
            var word = $(this).data("word");
            console.log("clicked: ", word);
            // Hide other popovers
            scope.find("a.gloss").CFW_Popover("hide");
            // Show other matches
            scope.mark(word, secondaryMarkOptions);
        });

    // Additional actions when popover closes
    scope.on("afterHide.cfw.popover", "a.gloss",
        function () {
            console.log("Closed: ", $(this).data("word"));
            scope.unmark({ element: "span" });
        });
}

// eslint-disable-next-line
function unmarkGlossaryWords(scopeSelector) {
    "use strict";
    var scope = $(scopeSelector) || $("article");

    // Hide and remove any open popovers
    var popovers = scope.find("div.popover");
    popovers.hide().remove();

    for (var i in userGlossary) {
        var word = userGlossary[i].word;
        scope.unmark(word, primaryMarkOptions);
    }
}

function makeAbsolutePath(base, relative) {
    var stack = base.split("/"),
        parts = relative.split("/");
    stack.pop(); // remove current file name (or empty string)
                 // (omit if "base" is the current folder without trailing slash)
    for (var i=0; i<parts.length; i++) {
        if (parts[i] == ".")
            continue;
        if (parts[i] == "..")
            stack.pop();
        else
            stack.push(parts[i]);
    }
    return stack.join("/");
}
