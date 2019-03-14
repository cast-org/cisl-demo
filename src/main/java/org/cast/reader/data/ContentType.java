package org.cast.reader.data;

import lombok.Getter;
import org.cast.cwm.data.IContentType;

/**
 * Data types supported by UserContent in this application.
 *
 * @author bgoldowsky
 */
public enum ContentType implements IContentType {

	TEXT("Text");

	@Getter
	private final String displayName;

	private ContentType(String displayName) {
		this.displayName = displayName;
	}

}
