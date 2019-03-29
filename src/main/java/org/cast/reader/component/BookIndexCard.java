package org.cast.reader.component;

import com.google.inject.Inject;
import org.apache.wicket.markup.html.basic.Label;
import org.apache.wicket.markup.html.image.Image;
import org.apache.wicket.markup.html.link.BookmarkablePageLink;
import org.apache.wicket.markup.html.panel.GenericPanel;
import org.apache.wicket.model.IModel;
import org.apache.wicket.model.PropertyModel;
import org.apache.wicket.request.mapper.parameter.PageParameters;
import org.apache.wicket.request.resource.ContextRelativeResourceReference;
import org.apache.wicket.request.resource.PackageResourceReference;
import org.cast.reader.ReaderApplication;
import org.cast.reader.data.Book;
import org.cast.reader.page.ReadingPage;
import org.cast.reader.service.IHeaderItemService;

/**
 * @author bgoldowsky
 */
public class BookIndexCard extends GenericPanel<Book> {

    @Inject
    private IHeaderItemService headerItemService;

    public BookIndexCard(String id, IModel<Book> mBook) {
        super(id, mBook);

        BookmarkablePageLink<Void> link = new BookmarkablePageLink<Void>("link", ReadingPage.class,
            new PageParameters().set("pub", getModelObject().getName()));

        link.add(new Image("img",
                headerItemService.getStaticFileResourceReference(),
                headerItemService.getStaticFilePageParameters(bookImageSrc())));
        add(link);

        link.add(new Label("type", new PropertyModel<>(getModel(), "type")));
        link.add(new Label("title", new PropertyModel<>(getModel(), "title")));
    }


    private String bookImageSrc() {
        return String.format("pubs/%s/images/%s",
                getModelObject().getName(),
                getModelObject().getCoverImage());
    }

}
