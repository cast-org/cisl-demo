package org.cast.reader.page;

import org.apache.wicket.devutils.stateless.StatelessComponent;
import org.apache.wicket.markup.html.WebPage;
import org.apache.wicket.request.mapper.parameter.PageParameters;
import org.cast.cwm.admin.SignInFormPanel;

/**
 * Login page, will intercept any request for a page requiring authentication.
 * This cannot extend BasePage since it should be stateless, and BasePage isn't.
 *
 * @author bgoldowsky
 */
@StatelessComponent
public class LoginPage extends WebPage {

	public LoginPage(PageParameters params) {
		super(params);
		add(new SignInFormPanel("loginPanel"));
	}

}
