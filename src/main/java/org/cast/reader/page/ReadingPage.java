package org.cast.reader.page;

import lombok.extern.slf4j.Slf4j;
import org.apache.wicket.authroles.authorization.strategies.role.annotations.AuthorizeInstantiation;
import org.apache.wicket.markup.head.*;
import org.apache.wicket.markup.html.link.BookmarkablePageLink;
import org.apache.wicket.model.Model;
import org.apache.wicket.request.mapper.parameter.PageParameters;
import org.apache.wicket.request.resource.ContextRelativeResourceReference;
import org.apache.wicket.request.resource.PackageResourceReference;
import org.cast.reader.ReaderApplication;
import org.cast.reader.component.BookIndexCard;
import org.cast.reader.component.PrefsPanel;
import org.cast.reader.data.Book;

import java.util.Arrays;
import java.util.List;

/**
 * Home page for "student" role.
 */
@AuthorizeInstantiation("STUDENT")
@Slf4j
public class ReadingPage extends BasePage {


    public ReadingPage(final PageParameters parameters) {
        super(parameters);

        add(new BookmarkablePageLink<Void>("homeLink", HomePage.class));

        add(new PrefsPanel("prefsPanel"));
    }

    @Override
    public void renderHead(IHeaderResponse response) {
        super.renderHead(response);

        response.render(JavaScriptHeaderItem.forReference(
                new ContextRelativeResourceReference("js/cisl-demo.js")));

        response.render(JavaScriptHeaderItem.forReference(
                new ContextRelativeResourceReference("js/cisl-demo-readium.js")));

        response.render(CssHeaderItem.forUrl("https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,600,700"));
        response.render(CssHeaderItem.forUrl("https://use.fontawesome.com/releases/v5.6.3/css/all.css")); // integrity="sha384-UHRtZLI+pbxtHCWp1t77Bi1L4ZtiqrqD80Kn4Z8NTSRyMA2Fd33n5dQ8lWUE00s/" crossorigin="anonymous"
        response.render(CssHeaderItem.forReference(
                new ContextRelativeResourceReference("css/cisl-demo.css")));
        response.render(CssHeaderItem.forReference(
                new ContextRelativeResourceReference("css/cisl-uio-custom.css")));

        response.render(OnDomReadyHeaderItem.forScript(
                "window.readiumComponent = cisl.readium.webViewer(\".cislc-readium\");"));
    }

    @Override
    public String getPageName() {
        return "Reading";
    }

}
