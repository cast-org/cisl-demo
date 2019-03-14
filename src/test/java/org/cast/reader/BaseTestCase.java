package org.cast.reader;

import org.apache.wicket.markup.html.link.BookmarkablePageLink;
import org.apache.wicket.util.visit.IVisit;
import org.apache.wicket.util.visit.IVisitor;
import org.cast.cwm.data.Event;
import org.cast.cwm.test.CwmDataBaseTestCase;
import org.cast.cwm.test.TestIdSetter;

/**
 * Base class for all project tests.
 *
 * Holds any necessary standard configurations.
 *
 * @author bgoldowsky
 */
public class BaseTestCase extends CwmDataBaseTestCase<SnudleInjectionTestHelper> {

	@Override
	protected boolean isApplicationThemed() {
		return false;
	}

	@Override
	protected SnudleInjectionTestHelper getInjectionTestHelper() {
		return new SnudleInjectionTestHelper();
	}

	@Override
	public void setUpData() {
		super.setUpData();
	}

	//
	// Some often used mock objects
	//


	public Event mockEvent() {
		Event e = new Event();
		TestIdSetter.setId(Event.class, e, 1L);
		return e;
	}

	protected String snapshotFilenameFor(BaseTestCase testCase) {
		return "snapshot/" + testCase.getClass().getSimpleName() + ".html";
	}

	public static class UnloggedLinkScanner implements IVisitor<BookmarkablePageLink,String> {
		@Override
		public void component(BookmarkablePageLink object, IVisit<String> visit) {
			fail("Found BookmarkablePageLink: " + object.getPageRelativePath());
		}
	}
}
