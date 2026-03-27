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
    // handles http get requests to get use the GetBooks() function

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
        }
            );
        
    }
}
