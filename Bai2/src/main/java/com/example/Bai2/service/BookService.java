package com.example.Bai2.service;

import com.example.Bai2.Model.Book;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class BookService {

    private List<Book> books = new ArrayList<>();

    // Lấy danh sách sách
    public List<Book> getAllBooks() {
        return books;
    }

    // Thêm sách
    public void addBook(Book book) {
        books.add(book);
    }

    // Cập nhật sách
    public void updateBook(int id, Book updatedBook) {
        books.stream()
                .filter(book -> book.getId() == id)
                .findFirst()
                .ifPresent(book -> {
                    book.setTitle(updatedBook.getTitle());
                    book.setAuthor(updatedBook.getAuthor());
                });
    }

    // Xóa sách
    public void deleteBook(int id) {
        books.removeIf(book -> book.getId() == id);
    }
}
