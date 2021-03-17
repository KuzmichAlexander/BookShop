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

            Book book1 = new Book() { Author = "Джером Дэвид", Description = "почему пары с Куделиным идут по 6 часов?", Edition = "Альпина Паблишер", Genre = "Роман", Name = "Над пропастью во ржи", Id = 230, ImageURL = "https://sun9-61.userapi.com/impf/IwTFnGOpq4Amf9u-PNGvfuMxMwwz31gHnbzsXg/tHhD2ehk2EY.jpg?size=252x336&quality=96&sign=6b2835feaef4226536eef0897925d47a&type=album", Price = 100 };
            Book book2 = new Book() { Author = "Джером Дэвид", Description = "почему пары с Куделиным идут по 6 часов?", Edition = "Альпина Паблишер", Genre = "Роман", Name = "Над пропастью во ржи", Id = 123, ImageURL = "https://sun9-61.userapi.com/impf/IwTFnGOpq4Amf9u-PNGvfuMxMwwz31gHnbzsXg/tHhD2ehk2EY.jpg?size=252x336&quality=96&sign=6b2835feaef4226536eef0897925d47a&type=album", Price = 200 };
            Book book3 = new Book() { Author = "Джером Дэвид", Description = "почему пары с Куделиным идут по 6 часов?", Edition = "Альпина Паблишер", Genre = "Роман", Name = "Над пропастью во ржи", Id = 2123, ImageURL = "https://sun9-61.userapi.com/impf/IwTFnGOpq4Amf9u-PNGvfuMxMwwz31gHnbzsXg/tHhD2ehk2EY.jpg?size=252x336&quality=96&sign=6b2835feaef4226536eef0897925d47a&type=album", Price = 300 };
            Book book4 = new Book() { Author = "Джером Дэвид", Description = "почему пары с Куделиным идут по 6 часов?", Edition = "Альпина Паблишер", Genre = "Роман", Name = "Над пропастью во ржи", Id = 3223, ImageURL = "https://sun9-61.userapi.com/impf/IwTFnGOpq4Amf9u-PNGvfuMxMwwz31gHnbzsXg/tHhD2ehk2EY.jpg?size=252x336&quality=96&sign=6b2835feaef4226536eef0897925d47a&type=album", Price = 400 };
            Book book5 = new Book() { Author = "Джером Дэвид", Description = "почему пары с Куделиным идут по 6 часов?", Edition = "Альпина Паблишер", Genre = "Роман", Name = "Над пропастью во ржи", Id = 4322, ImageURL = "https://sun9-61.userapi.com/impf/IwTFnGOpq4Amf9u-PNGvfuMxMwwz31gHnbzsXg/tHhD2ehk2EY.jpg?size=252x336&quality=96&sign=6b2835feaef4226536eef0897925d47a&type=album", Price = 500 };
            Book book6 = new Book() { Author = "Джером Дэвид", Description = "почему пары с Куделиным идут по 6 часов?", Edition = "Альпина Паблишер", Genre = "Роман", Name = "Над пропастью во ржи", Id = 544, ImageURL = "https://sun9-61.userapi.com/impf/IwTFnGOpq4Amf9u-PNGvfuMxMwwz31gHnbzsXg/tHhD2ehk2EY.jpg?size=252x336&quality=96&sign=6b2835feaef4226536eef0897925d47a&type=album", Price = 1000 };
            Book book7 = new Book() { Author = "Джером Дэвид", Description = "почему пары с Куделиным идут по 6 часов?", Edition = "Альпина Паблишер", Genre = "Роман", Name = "Над пропастью во ржи", Id = 6123, ImageURL = "https://sun9-61.userapi.com/impf/IwTFnGOpq4Amf9u-PNGvfuMxMwwz31gHnbzsXg/tHhD2ehk2EY.jpg?size=252x336&quality=96&sign=6b2835feaef4226536eef0897925d47a&type=album", Price = 1000 };

            List<Book> books = new List<Book>();

            books.Add(book1);
            books.Add(book2);
            books.Add(book3);
            books.Add(book4);
            books.Add(book5);
            books.Add(book6);
            books.Add(book7);


            if (ro.Default) //Забор по дефолту для старотовой страницы
            {
                // return db.Books.Select(book => true);
                return books; 
            }

            //var list = db.Books.Where(_ => true);
            var list = books.Where(b => true);


            if (ro.Name != "")
            {
                list.Where(book => book.Name == ro.Name || book.Author == ro.Name);
            }

            if (ro.Genre != "")
            {
                list.Where(book => book.Genre == ro.Genre);
            }

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
