package org.cast.reader;

import com.google.inject.Binder;
import com.google.inject.Inject;
import com.google.inject.Module;
import org.apache.wicket.Page;
import org.apache.wicket.RuntimeConfigurationType;
import org.apache.wicket.core.util.objects.checker.*;
import org.apache.wicket.devutils.stateless.StatelessChecker;
import org.apache.wicket.markup.html.WebPage;
import org.apache.wicket.request.Url;
import org.apache.wicket.request.resource.UrlResourceReference;
import org.apache.wicket.serialize.java.JavaSerializer;
import org.apache.wicket.util.file.File;
import org.apache.wicket.util.file.Path;
import org.apache.wicket.util.time.Duration;
import org.cast.cwm.CwmApplication;
import org.cast.cwm.CwmPackageResourceGuard;
import org.cast.cwm.admin.AdminHome;
import org.cast.cwm.data.Role;
import org.cast.cwm.data.User;
import org.cast.cwm.data.init.IDatabaseInitializer;
import org.cast.cwm.data.util.PersistedObjectsNotAllowedChecker;
import org.cast.cwm.service.ICwmSessionService;
import org.cast.cwm.service.IEventService;
import org.cast.cwm.service.IUserContentService;
import org.cast.reader.page.HomePage;
import org.cast.reader.page.LoginPage;
import org.cast.reader.page.ReadingPage;
import org.cast.reader.service.ReaderEventService;
import org.cast.reader.service.ReaderUserContentService;
import org.hibernate.cfg.Configuration;

import java.io.IOException;
import java.io.ObjectOutputStream;
import java.io.OutputStream;
import java.util.List;

/**
 * Wicket application for the second generation of the UDL Science Notebook, 2016-2020.
 */
public class ReaderApplication extends CwmApplication {

	public static final boolean DO_DETACH_CHECK = true;

	@Inject
	private ICwmSessionService cwmSessionService;

	public ReaderApplication() {
	}

	@Override
	public String getAppId() {
		return "SNUDLE2";
	}

	@Override
	public Class<? extends Page> getHomePage() {
		User user = cwmSessionService.getUser();
		if (user != null)
			return getHomePage(user.getRole());
		return HomePage.class;
	}

	@Override
	public Class<? extends Page> getHomePage(Role role) {
		if (role.equals(Role.STUDENT))
			return HomePage.class;
//		if (role.equals(Role.TEACHER))
//			return TeacherHomePage.class;
		if (role.equals(Role.ADMIN))
			return AdminHome.class;
		return super.getHomePage(role);
	}

	/**
	 * @see org.cast.cwm.CwmApplication#getSignInPageClass()
	 */
	@Override
	public Class<? extends WebPage> getSignInPageClass() {
		return LoginPage.class;
	}

	@Override
	protected void configureMountPaths() {
		super.configureMountPaths();

		// Set up theme directory
//		File themeDir = configuration.getFile("app.themeDir");
//		this.getResourceSettings().getResourceFinders().add(0, new Path(themeDir.getAbsolutePath()));

		mountPage("home", HomePage.class);
		mountPage("login", LoginPage.class);
		mountPage("read", ReadingPage.class);

//		mountPage("healthz", HealthCheck.class);
	}

	@Override
	protected void init() {
		super.init();
		this.getMarkupSettings().setStripWicketTags(true);
		getJavaScriptLibrarySettings().setJQueryReference(
				new UrlResourceReference(Url.parse("//ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js")));

		getResourceSettings().setPackageResourceGuard(new CwmPackageResourceGuard());

		// Settings for development only - short cache and component path information
		if (this.getConfigurationType().equals(RuntimeConfigurationType.DEVELOPMENT)) {
			getResourceSettings().setDefaultCacheDuration(Duration.ONE_HOUR);
			getDebugSettings().setComponentPathAttributeName("wicketpath");
			getComponentPreOnBeforeRenderListeners().add(new StatelessChecker());

			// The following code will throw an error if, during serialization,
			// a PersistedObject with an ID is found.  These database objects should
			// always be stored in detachable models and properly detached.
			// Other Wicket standard checks are also included.

			if (DO_DETACH_CHECK) {
				JavaSerializer javaSerializer = new JavaSerializer(getApplicationKey()) {
					@Override
					protected ObjectOutputStream newObjectOutputStream(OutputStream out) throws IOException {
						// Check for database objects still in session
						IObjectChecker checker = new PersistedObjectsNotAllowedChecker();
						// Also do the standard check for non-serializable objects
						IObjectChecker checker2 = new ObjectSerializationChecker();
						// Check for models that aren't detached
						IObjectChecker checker3 = new NotDetachedModelChecker();
						// Check for references to components that aren't needed
						IObjectChecker checker4 = new OrphanComponentChecker();
						// Check for references to the session
						// NOTE: this (used to?) causes an error to be flagged whenever the DebugBar tries to calculate session size.
						IObjectChecker checker5 = new SessionChecker();
						return new CheckingObjectOutputStream(out, checker, checker2, checker3, checker4, checker5);
					}
				};
				getFrameworkSettings().setSerializer(javaSerializer);
			}
		}

	}

	@Override
	protected List<IDatabaseInitializer> getDatabaseInitializers() {
		List<IDatabaseInitializer> list = super.getDatabaseInitializers();
//		list.add(new InitGlossary());
		return list;
	}

	@Override
	protected void configureHibernate(Configuration c) {
		super.configureHibernate(c);
//		c.addAnnotatedClass(Prompt.class);
	}

	@Override
	protected List<Module> getInjectionModules() {
		List<Module> modules = super.getInjectionModules();

		modules.add(new Module() {
			public void configure(Binder binder) {
//				binder.bind(IUserPreferenceService.class).to(UserPreferenceService.class);
				binder.bind(IEventService.class).to(ReaderEventService.class);
				binder.bind(IUserContentService.class).to(ReaderUserContentService.class);
			}});
		return modules;
	}

}
