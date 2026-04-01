using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[ApiController]
[Route("[controller]")]
public class BooksController : ControllerBase
{
    // Database context used to interact with the Books table
    private readonly BookstoreContext _context;

    public BooksController(BookstoreContext context)
    {
        _context = context;
    }

    [HttpGet("categories")]
    public async Task<IActionResult> GetCategories()
    {
        var categories = await _context.Books
            .Select(b => b.Category)
            .Distinct()
            .ToListAsync();

        return Ok(categories);
    }

    [HttpGet]
    public async Task<IActionResult> GetBooks(
        int pageNumber = 1,
        int pageSize = 5,
        [FromQuery(Name = "categories[]")] string[] categories = null)
    {
        //create a default query
        var query = _context.Books.AsQueryable();

        //filter by the categories selected
        if (categories != null && categories.Any())
        {
            query = query.Where(b => categories.Contains(b.Category));
        }

        //Count the books after the filter
        var totalBooks = await query.CountAsync();

        //Apply Pagination after filtering
        var books = await query
            .Skip((pageNumber - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync();

        //return books
        return Ok(new
        {
            data = books,
            totalBooks = totalBooks,
            pageNumber = pageNumber,
            pageSize = pageSize
        });
    }

    [HttpPost("AddBook")]
    public IActionResult AddBook([FromBody] Book newBook)
    {
        _context.Books.Add(newBook);
        _context.SaveChanges();
        return Ok(newBook);
    }

    [HttpPut("UpdateBook/{bookId}")]
    public IActionResult UpdateBook(int bookId, [FromBody] Book updatedBook)
    {
        var existingBook = _context.Books.Find(bookId);

        existingBook.Title = updatedBook.Title;
        existingBook.Author = updatedBook.Author;
        existingBook.Publisher = updatedBook.Publisher;
        existingBook.ISBN = updatedBook.ISBN;
        existingBook.Classification = updatedBook.Classification;
        existingBook.Category = updatedBook.Category;
        existingBook.PageCount = updatedBook.PageCount;
        existingBook.Price = updatedBook.Price;

        _context.Books.Update(existingBook);
        _context.SaveChanges();

        return Ok(existingBook);
    }

    [HttpDelete("DeleteBook/{bookId}")]
    public IActionResult DeleteBook(int bookId)
    {
        var book = _context.Books.Find(bookId);

        if (book == null)
        {
            return NotFound(new { message = "BookNotFound" });
        }

        _context.Books.Remove(book);
        _context.SaveChanges();

        return NoContent();
    }
}