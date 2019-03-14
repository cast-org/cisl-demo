package org.cast.reader.component;

import org.apache.wicket.markup.html.image.Image;
import org.apache.wicket.markup.html.panel.Panel;
import org.apache.wicket.request.resource.ContextRelativeResourceReference;
import org.apache.wicket.request.resource.PackageResourceReference;
import org.cast.reader.ReaderApplication;

/**
 * Basic site header.
 * @author bgoldowsky
 */
public class Header extends Panel {

    public Header(String id) {
        super(id);
        add(new Image("logo",
                new ContextRelativeResourceReference("images/reader-logo-transparent.png")));
    }

}
