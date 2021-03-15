using BookShop.Models;
using BookShop.Models.BooksParams;
using BookShop.Models.DBContext;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookShop.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BooksController : Controller
    {
        DBContext db = new DBContext();
        // GET: BooksController
        [HttpPost]
        public List<Book> Post(RequestOptions ro)
        {
            if (ro.Default) //Забор по дефолту для старотовой страницы
            {
                Book book1 = new Book() { Author = "Джером Дэвид", Description = "почему пары с Куделиным идут по 6 часов?", Edition = "Альпина Паблишер", Genre = "Роман", Name = "Над пропастью во ржи", Id = 0, ImageURL = "https://lh3.googleusercontent.com/proxy/EOOhVBPpyfLxjlj48f5Yh4Vie2yanrD0lS9KUCyM1ypeDcRCU8fIaFByZz2uI18g9qduUCg0R_mPsR0PwxUprSbjZg", Price = 250 };
                Book book2 = new Book() { Author = "Джером Дэвид", Description = "почему пары с Куделиным идут по 6 часов?", Edition = "Альпина Паблишер", Genre = "Роман", Name = "Над пропастью во ржи", Id = 0, ImageURL = "https://lh3.googleusercontent.com/proxy/EOOhVBPpyfLxjlj48f5Yh4Vie2yanrD0lS9KUCyM1ypeDcRCU8fIaFByZz2uI18g9qduUCg0R_mPsR0PwxUprSbjZg", Price = 250 };
                List<Book> books = new List<Book>();

                books.Add(book1);
                books.Add(book2);
                // return db.Books.Select(book => true);
                return books; 
            }



            return null;
        }

        
    }
}
