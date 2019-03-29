package org.cast.reader.component;

import com.google.inject.Inject;
import lombok.extern.slf4j.Slf4j;
import org.apache.wicket.markup.html.image.Image;
import org.apache.wicket.markup.html.panel.Panel;
import org.apache.wicket.request.resource.ContextRelativeResourceReference;
import org.apache.wicket.request.resource.PackageResourceReference;
import org.cast.reader.ReaderApplication;
import org.cast.reader.service.IHeaderItemService;

/**
 * Basic site header.
 * @author bgoldowsky
 */
@Slf4j
public class Header extends Panel {

    @Inject
    private IHeaderItemService headerItemService;

    public Header(String id) {
        super(id);
        add(new Image("logo",
                headerItemService.getStaticFileResourceReference(),
                headerItemService.getStaticFilePageParameters("images/reader-logo-transparent.png")));
    }

}
