package org.cast.reader.page;

import com.google.inject.Inject;
import lombok.extern.slf4j.Slf4j;
import org.apache.wicket.authroles.authorization.strategies.role.annotations.AuthorizeAction;
import org.apache.wicket.authroles.authorization.strategies.role.annotations.AuthorizeActions;
import org.apache.wicket.markup.head.CssHeaderItem;
import org.apache.wicket.markup.head.IHeaderResponse;
import org.apache.wicket.markup.head.JavaScriptHeaderItem;
import org.apache.wicket.markup.head.PriorityHeaderItem;
import org.apache.wicket.markup.html.basic.Label;
import org.apache.wicket.model.StringResourceModel;
import org.apache.wicket.request.http.flow.AbortWithHttpErrorCodeException;
import org.apache.wicket.request.mapper.parameter.PageParameters;
import org.apache.wicket.request.resource.ContextRelativeResourceReference;
import org.apache.wicket.request.resource.JavaScriptResourceReference;
import org.apache.wicket.request.resource.PackageResourceReference;
import org.cast.cwm.data.Event;
import org.cast.cwm.data.LoggedWebPage;
import org.cast.cwm.service.IEventService;
import org.cast.reader.ReaderApplication;
import org.cast.reader.component.Header;

/**
 * Base class for all pages
 *
 * @author bgoldowsky
 */
@Slf4j
public abstract class BasePage extends LoggedWebPage<Event> {

	@Inject
	private IEventService eventService;

	public BasePage(PageParameters params) {
		super(params);

		readPageParams(params);
		if (!checkPermission())
			throw new AbortWithHttpErrorCodeException(403, "You do not have permission for this");
		add(new Label("title",
				new StringResourceModel("pageTitleFormat", this)
				.setParameters(new StringResourceModel("pageTitle", this))));

		add(new Header("header"));

	}

	/**
	 * Determine whether it's ok to present this page, based on the parameters and any other information.
	 * This should be overridden by pages to test, for instance, whether the user has permission to view
	 * or edit the object requested by the URL.
	 * @return true if all is well, false if the action should be prevented.
	 */
	protected boolean checkPermission() {
		return true;
	}

	@Override
	public void renderHead(IHeaderResponse response) {
		super.renderHead(response);
		response.render(CssHeaderItem.forReference(
				new ContextRelativeResourceReference("lib/figuration/css/figuration.css")));
		response.render(CssHeaderItem.forReference(
				new ContextRelativeResourceReference("css/cisl-demo.css")));

		response.render(new PriorityHeaderItem(JavaScriptHeaderItem.forReference(
				new ContextRelativeResourceReference("js/main.js"))));
	}

	protected void readPageParams(PageParameters params) {
	}

}
