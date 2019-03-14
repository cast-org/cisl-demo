package org.cast.reader.data;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.io.Serializable;

/**
 * Information about a book.
 *
 * TODO: this is a placeholder
 *
 * @author bgoldowsky
 */
@Data
@AllArgsConstructor
public class Book implements Serializable {

    private String name;
    private String type;
    private String title;
    private String coverImage;
    private String coverImageAlt;

}
