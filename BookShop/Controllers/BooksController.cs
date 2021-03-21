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
        public List<Book> Post(RequestOptions ro)
        {
            if (ro.Default) //Забор по дефолту для старотовой страницы
            {
                var a = db.Books.Where(book => true);
                return a.ToList();
            }

            var list = db.Books.Where(_ => true);

            // if (ro.Name != "")
            // {
            //     list.Where(book => book.Name == ro.Name || book.Author == ro.Name);
            // }

            // if (ro.Genre != "")
            // {
            //     list.Where(book => book.Genre == ro.Genre);
            // }

            if (ro.PriceAbove != 0)
            {
                list.Where(book => book.Price >= ro.PriceAbove);
            }

            if (ro.PriceBelow != 0)
            {
                list.Where(book => book.Price <= ro.PriceBelow);
            }

            return list.ToList();
        }

        
    }
}
