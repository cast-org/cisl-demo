package org.cast.reader.service;

import lombok.extern.slf4j.Slf4j;
import org.cast.cwm.IEventType;
import org.cast.cwm.service.EventService;
import org.cast.reader.data.EventType;

import java.util.Arrays;
import java.util.List;

/**
 * Extension of CWM's EventService, implementing abstract methods and adding app-specific ones.
 *
 * @author bgoldowsky
 */
@Slf4j
public class ReaderEventService extends EventService {

//	@Override
//	public SnudleEvent newEvent() {
//		return new SkeletonEvent();
//	}

	@Override
	public Class<EventType> getEventTypeClass() {
		return EventType.class;
	}

	@Override
	public IEventType getEventType(String eventName) {
		return EventType.valueOf(eventName);
	}

	@Override
	public List<? extends IEventType> listEventTypes() {
		return Arrays.asList(EventType.values());
	}

	@Override
	public IEventType getLoginEventType() {
		return EventType.LOGIN;
	}

	@Override
	public IEventType getLogoutEventType() {
		return EventType.LOGOUT;
	}

	@Override
	public IEventType getTimeoutEventType() {
		return EventType.TIMEOUT;
	}

	@Override
	protected IEventType getPageViewEventType() {
		return EventType.PAGEVIEW;
	}

}
