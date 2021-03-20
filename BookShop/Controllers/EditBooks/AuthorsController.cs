using Microsoft.AspNetCore.Http;
using BookShop.Models;
using BookShop.Models.BooksParams;
using BookShop.Models.DBContext;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookShop.Controllers.EditBooks
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthorsController : Controller
    {
        DBContext db = new DBContext();
        // GET: EditBookController
        [HttpGet]
        public List<string> Get()
        {
            var genreList = db.Authors.Select(author => author.Name);
            return genreList.ToList();
        }
        [HttpPost]
        public string Post(inputAddParams ip)
        {
            if (db.Authors.FirstOrDefault(author => author.Name == ip.Name) != null)
            {
                return ServerResponses.ElementWasExisted;
            }

            Author author = new Author();
            author.Name = ip.Name;
            db.Authors.Add(author);
            db.SaveChanges();
            return ServerResponses.ElementWasAdded;
        }
    }
}