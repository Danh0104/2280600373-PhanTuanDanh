package com.example.Bai2.Controller;

import com.example.Bai2.Model.Book;
import com.example.Bai2.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/books")
public class BookController {

    @Autowired
    private BookService bookService;

    // GET: lấy danh sách sách
    @GetMapping
    public List<Book> getAllBooks() {
        return bookService.getAllBooks();
    }

    // POST: thêm sách
    @PostMapping
    public String addBook(@RequestBody Book book) {
        bookService.addBook(book);
        return "Book added successfully!";
    }

    // PUT: cập nhật sách
    @PutMapping("/{id}")
    public String updateBook(@PathVariable int id, @RequestBody Book book) {
        bookService.updateBook(id, book);
        return "Book updated successfully!";
    }

    // DELETE: xóa sách
    @DeleteMapping("/{id}")
    public String deleteBook(@PathVariable int id) {
        bookService.deleteBook(id);
        return "Book deleted successfully!";
    }
}
