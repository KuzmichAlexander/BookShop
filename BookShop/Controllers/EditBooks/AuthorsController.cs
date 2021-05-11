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
    public class AuthorsController : Controller
    {
        DBContext db = new DBContext();
        [HttpGet]
        public List<string> Get()
        {
            var authorList = db.Authors.Select(author => author.Name);
            return authorList.ToList();
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