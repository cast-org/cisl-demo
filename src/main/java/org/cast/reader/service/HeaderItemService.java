package org.cast.reader.service;

import org.apache.wicket.Application;
import org.apache.wicket.protocol.http.WebApplication;
import org.apache.wicket.request.mapper.parameter.PageParameters;
import org.apache.wicket.request.resource.ResourceReference;
import org.apache.wicket.util.file.File;
import org.cast.cwm.ResourceDirectoryReference;

import javax.servlet.ServletContext;

/**
 * @author bgoldowsky
 */
public class HeaderItemService implements IHeaderItemService {

    @Override
    public ResourceReference getStaticFileResourceReference() {
        final ServletContext context = ((WebApplication) Application.get()).getServletContext();
        return new ResourceDirectoryReference(new File(context.getRealPath("/")));
    }

    @Override
    public PageParameters getStaticFilePageParameters(String path) {
        PageParameters pp = new PageParameters();
        int i=0;
        for (String part : path.split("/"))
            pp.set(i++, part);
        return pp;
    }
}
