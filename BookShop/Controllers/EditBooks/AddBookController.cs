using BookShop.Models;
using BookShop.Models.BooksParams;
using BookShop.Models.DBContext;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;

namespace BookShop.Controllers.EditBooks
{
    [Route("api/[controller]")]
    [ApiController]
    public class AddBookController : Controller
    {
        DBContext db = new DBContext();
        [HttpPost]
        public string Post(Book ip)
        {
            string token = Request.Headers["Authorization"];
            var trueAdmin = db.Users.FirstOrDefault(user => user.Token == token);

            if (trueAdmin == null && trueAdmin.IsAdmin == true)
            {
                return ServerResponses.BadRequest;
            }

            if (db.Books.FirstOrDefault(book => book.Name == ip.Name) != null)
            {
                return ServerResponses.SameBookName;
            }
            
            Book NewBook = new Book();

            NewBook.Name = ip.Name;
            NewBook.Description = ip.Description;
            NewBook.Edition = ip.Edition;
            NewBook.Pages = ip.Pages;
            NewBook.Price = ip.Price;
            NewBook.ImageURL = ip.ImageURL;
            NewBook.HasInStorage = false;

            db.Books.Add(NewBook);
            db.SaveChanges();
            
            Storage st = new Storage();
            
            db.StoragePositions.Add(st);
            db.SaveChanges();

            return ServerResponses.AddStartBook;
        }

        [HttpPut]
        public string Put(InputBookData ip) //добавление авторов и жанров
        {
            ip.Author.ForEach(author =>
            {
                BookAuthors ba = new BookAuthors();
                ba.Authorid = db.Authors.First(a => a.Name == author).Id;
                ba.Bookid = db.Books.First(a => a.Name == ip.Name).Id;
                db.BooksAuthors.Add(ba);
                db.SaveChanges();
            });
            
            ip.Genre.ForEach(genre =>
            {
                BookGenres bg = new BookGenres();
                bg.Genreid = db.Genres.First(a => a.Name == genre).Id;
                bg.Bookid = db.Books.First(a => a.Name == ip.Name).Id;
                db.BooksGenres.Add(bg);
                db.SaveChanges();
            });
            return ServerResponses.AddAuthorsGenres;
        }

        [HttpPatch]
        public string Patch(InputBooksInStorage ib) //добавление на склад
        {
            var id = db.Books.FirstOrDefault(book => book.Name == ib.Name);

            if (id == null)
            {
                return ServerResponses.NoFoundBookName;
            }

            var StoragePosition = db.StoragePositions.First(storage => storage.Id == id.Id);

            StoragePosition.Count += ib.Count;

            db.Attach(StoragePosition);
            db.SaveChanges();

            return ServerResponses.AddInStorage(ib.Count, ib.Name);
        }

        [HttpGet]
        public List<string> Get()
        {
            var BooksName = db.Books.Select(book => book.Name).ToList();
            return BooksName;
        }
    }
}