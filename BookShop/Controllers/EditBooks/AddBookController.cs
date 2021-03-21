using Microsoft.AspNetCore.Http;
using BookShop.Models;
using BookShop.Models.BooksParams;
using BookShop.Models.DBContext;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Data.SqlTypes;
using System.Linq;
using System.Threading.Tasks;

namespace BookShop.Controllers.EditBooks
{
    [Route("api/[controller]")]
    [ApiController]
    public class AddBookController : Controller
    {
        DBContext db = new DBContext();
        // GET: EditBookController
        [HttpPost]
        public string Post(Book ip)
        {
            string token = Request.Headers["Authorization"];
            var trueAdmin = db.Users.FirstOrDefault(user => user.Token == token);

            if (trueAdmin == null)
            {
                return ServerResponses.BadRequest;
            }

            if (db.Books.FirstOrDefault(book => book.Name == ip.Name) != null)
            {
                return ServerResponses.ElementWasExisted;
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

            return ServerResponses.ElementWasAdded;
        }
    }
}