using BookShop.Models;
using BookShop.Models.BooksParams;
using BookShop.Models.DBContext;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookShop.Controllers.EditBooks
{
    [Route("api/[controller]")]
    [ApiController]
    public class GenresController : Controller
    {
        DBContext db = new DBContext();
        // GET: EditBookController
        [HttpGet]
        public List<string> Get()
        {
            var genreList = db.Books.Select(book => book.Genre);
            return genreList.ToList();
        }
        [HttpPost]
        public string Post(inputAddParams ip)
        {
            if (db.Genres.FirstOrDefault(genre => genre.Name == ip.Name) != null)
            {
                return ServerResponses.ElementWasExisted;
            }

            Genre genre = new Genre();
            genre.Name = ip.Name;
            db.Genres.Add(genre);
            db.SaveChanges();
            return ServerResponses.ElementWasAdded;
        }
    }
}
