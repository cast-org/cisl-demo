package org.cast.reader;

import org.apache.wicket.Page;
import org.apache.wicket.model.IModel;
import org.apache.wicket.model.Model;
import org.cast.cwm.data.Event;
import org.cast.cwm.service.ICwmService;
import org.cast.cwm.service.IEventService;
import org.cast.cwm.test.CwmDataInjectionTestHelper;
import org.cwm.db.service.IModelProvider;
import org.cwm.db.service.SimpleModelProvider;
import org.mockito.invocation.InvocationOnMock;
import org.mockito.stubbing.Answer;

import static org.mockito.Matchers.any;
import static org.mockito.Matchers.anyString;
import static org.mockito.Mockito.when;

/**
 * @author bgoldowsky
 */
public class SnudleInjectionTestHelper extends CwmDataInjectionTestHelper {

	public ICwmService injectCwmService(BaseTestCase testCase) {
		return injectMock(ICwmService.class);
	}

	public IModelProvider injectModelProvider(BaseTestCase testCase) {
		return injectObject(IModelProvider.class, new SimpleModelProvider());
	}


	public IEventService injectEventService(final BaseTestCase testCase) {
		IEventService eventService = injectMock(IEventService.class);
		injectObject(IEventService.class, eventService);

		when(eventService.storePageViewEvent(anyString(), any(Page.class))).thenAnswer(new Answer<IModel<Event>>() {
			@Override
			public IModel<Event> answer(InvocationOnMock invocation) throws Throwable {
				return Model.of(testCase.mockEvent());
			}
		});

		return eventService;
	}

}
