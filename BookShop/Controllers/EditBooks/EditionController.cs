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
    public class EditionController : Controller
    {
        DBContext db = new DBContext();
        [HttpGet]
        public List<string> Get()
        {
            var editionsList = db.Editions.Select(edition => edition.Name);
            return editionsList.ToList();
        }
        [HttpPost]
        public string Post(inputAddParams ip)
        {
            if (db.Editions.FirstOrDefault(editions => editions.Name == ip.Name) != null)
            {
                return ServerResponses.ElementWasExisted;
            }

            Edition edition = new Edition();
            edition.Name = ip.Name;
            db.Editions.Add(edition);
            db.SaveChanges();
            
            return ServerResponses.ElementWasAdded;
        }
    }
}

