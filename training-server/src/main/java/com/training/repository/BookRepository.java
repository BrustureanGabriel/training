package com.training.repository;

import com.training.model.Book;
import org.springframework.data.repository.CrudRepository;

public interface BookRepository  extends CrudRepository<Book, Integer> {
}
