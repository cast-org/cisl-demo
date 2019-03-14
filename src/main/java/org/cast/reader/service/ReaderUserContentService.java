package org.cast.reader.service;

import org.cast.cwm.data.IContentType;
import org.cast.cwm.service.IUserContentService;
import org.cast.reader.data.ContentType;

/**
 *
 */
public class ReaderUserContentService implements IUserContentService {

	@Override
	public Class<? extends IContentType> getContentTypeClass() {
		return ContentType.class;
	}

	@Override
	public IContentType getContentType(String name) {
		return ContentType.valueOf(name);
	}

}
