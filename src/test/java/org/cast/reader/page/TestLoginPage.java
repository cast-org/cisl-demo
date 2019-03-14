package org.cast.reader.page;

import org.apache.wicket.devutils.stateless.StatelessChecker;
import org.apache.wicket.markup.html.link.BookmarkablePageLink;
import org.apache.wicket.request.mapper.parameter.PageParameters;
import org.cast.cwm.admin.SignInFormPanel;
import org.cast.cwm.service.ICwmService;
import org.cast.reader.BaseTestCase;
import org.cast.reader.SnudleInjectionTestHelper;
import org.junit.Test;

public class TestLoginPage extends BaseTestCase {
	
	@Override
	public void populateInjection(SnudleInjectionTestHelper helper) {
		helper.injectCwmSessionService(this);
		helper.injectEventService(this);
		helper.injectModelProvider(this);
		helper.injectAppConfiguration(this);
		ICwmService cwmService = helper.injectMock(ICwmService.class);
	}

	@Test
	public void canRender() {
		tester.startPage(LoginPage.class, new PageParameters());
		tester.assertRenderedPage(LoginPage.class);
	}

	@Test
	public void loginPageIsStateless() {
		tester.getApplication().getComponentPostOnBeforeRenderListeners()
				.add(new StatelessChecker());
		tester.startPage(LoginPage.class, new PageParameters());
		tester.assertRenderedPage(LoginPage.class);
	}

	@Test
	public void noUnloggedLinks() {
		tester.startPage(LoginPage.class, new PageParameters());
		tester.getLastRenderedPage().visitChildren(BookmarkablePageLink.class, new UnloggedLinkScanner());
	}

	@Test
	public void snapshotTest() throws Exception {
		this.executeTest(LoginPage.class, snapshotFilenameFor(this));
	}

	@Test
	public void showsLogin() {
		tester.startPage(LoginPage.class);
		tester.assertComponent("loginPanel", SignInFormPanel.class);
	}
}
