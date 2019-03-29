package org.cast.reader.service;

import org.apache.wicket.request.mapper.parameter.PageParameters;
import org.apache.wicket.request.resource.ResourceReference;

/**
 * @author bgoldowsky
 */
public interface IHeaderItemService {

    ResourceReference getStaticFileResourceReference();

    PageParameters getStaticFilePageParameters(String path);

}
