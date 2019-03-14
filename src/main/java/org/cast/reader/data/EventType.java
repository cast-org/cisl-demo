package org.cast.reader.data;

import lombok.Getter;
import org.cast.cwm.IEventType;

/**
 * Enumeration of event types that are used in this application.
 *
 * @author bgoldowsky
 */
public enum EventType implements IEventType {

	LOGIN("login", "User logged in.  Detail: user role."),
	LOGOUT("logout", "User logged out (intentionally).  Detail: session length."),
	TIMEOUT("timeout", "User session was ended due to timeout.  Detail: session length."),
	PAGEVIEW("pageview", "User visited a page"),
	;

	@Getter
	private String displayName;

	@Getter
	private String documentation;

	EventType (String displayName, String documentation) {
		this.displayName = displayName;
		this.documentation = documentation;
	}

}
