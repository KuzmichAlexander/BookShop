using BookShop.Models;
using BookShop.Models.BooksParams;
using BookShop.Models.DBContext;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;

namespace BookShop.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BooksController : Controller
    {
        DBContext db = new DBContext();

        // GET: BooksController
        [HttpPost]
        public List<ClientBook> Post(RequestOptions ro)
        {
            List<ClientBook> cblist = GetBooksFromDB();

            if (ro.Default) //Забор по дефолту для старотовой страницы
            {
                return cblist;
            }

            if (ro.Name != "")
            {
                cblist = cblist.Where(book => book.Name.Contains(ro.Name)).ToList();
            }

            if (ro.Genre != "" && ro.Genre != "nth")
            {
                cblist = cblist.Where(book => book.Genre.Contains(ro.Genre)).ToList();
            }

            if (ro.PriceAbove != 0)
            {
                cblist = cblist.Where(book => book.Price >= ro.PriceAbove).ToList();
            }

            if (ro.PriceBelow != 0)
            {
                cblist = cblist.Where(book => book.Price <= ro.PriceBelow).ToList();
            }

            return cblist;
        }

        [NonAction]
        public List<ClientBook> GetBooksFromDB()
        {
            List<ClientBook> cblist = new List<ClientBook>();
            var books = db.Books.Where(book => true).ToList();
            books.ForEach(book =>
            {
                ClientBook cb = new ClientBook(book);
                var authorsId = db.BooksAuthors
                    .Where(author => author.Bookid == book.Id)
                    .Select(id => id.Authorid)
                    .ToList();
                List<string> authors = new List<string>();
                foreach (var id in authorsId)
                {
                    string au = db.Authors.First(author => author.Id == id).Name;
                    authors.Add(au);
                }

                var genresId = db.BooksGenres
                    .Where(genre => genre.Bookid == book.Id)
                    .Select(id => id.Genreid)
                    .ToList();
                List<string> genres = new List<string>();
                foreach (var id in genresId)
                {
                    string au = db.Genres.First(genre => genre.Id == id).Name;
                    genres.Add(au);
                }

                cb.Genre = genres;
                cb.Author = authors;


                var count = db.StoragePositions.FirstOrDefault(pos => pos.Id == book.Id);
                if (count != null)
                {
                    if (count.Count > 0)
                    {
                        cb.HasInStorage = true;
                    }
                }
                
                cblist.Add(cb);
            });


            return cblist;
        }
    }
}