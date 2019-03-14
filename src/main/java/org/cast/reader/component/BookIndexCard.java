package org.cast.reader.component;

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

/**
 * @author bgoldowsky
 */
public class BookIndexCard extends GenericPanel<Book> {

    public BookIndexCard(String id, IModel<Book> mBook) {
        super(id, mBook);

        BookmarkablePageLink<Void> link = new BookmarkablePageLink<Void>("link", ReadingPage.class,
            new PageParameters().set("pub", getModelObject().getName()));

        link.add(new Image("img",
                new ContextRelativeResourceReference(bookImageSrc())));
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
