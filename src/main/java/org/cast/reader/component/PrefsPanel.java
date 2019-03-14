package org.cast.reader.component;

import org.apache.wicket.markup.head.CssHeaderItem;
import org.apache.wicket.markup.head.IHeaderResponse;
import org.apache.wicket.markup.head.JavaScriptHeaderItem;
import org.apache.wicket.markup.html.image.Image;
import org.apache.wicket.markup.html.panel.Panel;
import org.apache.wicket.request.resource.ContextRelativeResourceReference;
import org.apache.wicket.request.resource.PackageResourceReference;
import org.cast.reader.ReaderApplication;

/**
 * Basic site header.
 * @author bgoldowsky
 */
public class PrefsPanel extends Panel {

    public PrefsPanel(String id) {
        super(id);
    }

    @Override
    public void renderHead(IHeaderResponse response) {
        super.renderHead(response);

        response.render(CssHeaderItem.forReference(
                new ContextRelativeResourceReference("lib/infusion/dist/assets/src/framework/preferences/css/Enactors.css")));
        response.render(CssHeaderItem.forReference(
                new ContextRelativeResourceReference("lib/infusion/dist/assets/src/framework/preferences/css/PrefsEditor.css")));
        response.render(CssHeaderItem.forReference(
                new ContextRelativeResourceReference("lib/infusion/dist/assets/src/framework/preferences/css/SeparatedPanelPrefsEditor.css")));
        response.render(CssHeaderItem.forReference(
                new ContextRelativeResourceReference("lib/figuration/css/figuration.min.css")));
        response.render(CssHeaderItem.forReference(
                new ContextRelativeResourceReference("css/cisl-demo.css")));
        response.render(CssHeaderItem.forReference(
                new ContextRelativeResourceReference("css/cisl-uio-custom.css")));

        response.render(JavaScriptHeaderItem.forReference(
                new ContextRelativeResourceReference("js/prefs-toolbar-startup.js")));

    }
}
