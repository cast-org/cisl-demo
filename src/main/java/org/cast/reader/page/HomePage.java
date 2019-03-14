package org.cast.reader.page;

import lombok.extern.slf4j.Slf4j;
import org.apache.wicket.authroles.authorization.strategies.role.annotations.AuthorizeInstantiation;
import org.apache.wicket.model.Model;
import org.apache.wicket.request.mapper.parameter.PageParameters;
import org.cast.reader.component.BookIndexCard;
import org.cast.reader.data.Book;

import java.util.Arrays;
import java.util.List;

/**
 * Home page for "student" role.
 */
@AuthorizeInstantiation("STUDENT")
@Slf4j
public class HomePage extends BasePage {

    private static final List<Book> books =
            Arrays.asList(
                    new Book("serp-paper-or-plastic",
                            "Article",
                            "Should Our Use of Paper or Plastic Be an Individual Choice or Be Regulated By the Government?",
                            "plastic-bags-duncan-hull.jpg",
                            "Photo of plastic bags in front of and on a fence")
            );


    public HomePage(final PageParameters parameters) {
        super(parameters);

        add(new BookIndexCard("card", Model.of(books.get(0))));
    }

    @Override
    public String getPageName() {
        return "Home";
    }

}
