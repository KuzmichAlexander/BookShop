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
            List<ClientBook> cblist = new List<ClientBook>();
            
            if (ro.Default) //Забор по дефолту для старотовой страницы
            {
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
                    cb.Author = authors;
                    cblist.Add(cb);
                });
                
                
                
                return cblist;
            }

            var list = db.Books.Where(_ => true).ToList();

             if (ro.Name != "") 
             {
                 list = list.Where(book => book.Name == ro.Name).ToList();
             }

            // if (ro.Genre != "")
            // {
            //     list.Where(book => book.Genre == ro.Genre);
            // }

            if (ro.PriceAbove != 0)
            {
                list = list.Where(book => book.Price >= ro.PriceAbove).ToList();
            }

            if (ro.PriceBelow != 0)
            {
                list = list.Where(book => book.Price <= ro.PriceBelow).ToList();
            }

            return cblist;
        }

        
    }
}
