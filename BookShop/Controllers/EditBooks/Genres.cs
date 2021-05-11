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
    public class GenresController : Controller
    {
        DBContext db = new DBContext();
        [HttpGet]
        public List<string> Get()
        {
            var genreList = db.Genres.Select(genre => genre.Name);
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
