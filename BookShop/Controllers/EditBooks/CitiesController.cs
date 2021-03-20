using Microsoft.AspNetCore.Http;
using BookShop.Models;
using BookShop.Models.BooksParams;
using BookShop.Models.DBContext;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BookShop.Models.Cities;

namespace BookShop.Controllers.EditBooks
{
    [Route("api/[controller]")]
    [ApiController]
    public class CitiesController : Controller
    {
        DBContext db = new DBContext();
        // GET: EditBookController
        [HttpGet]
        public List<string> Get()
        {
            var citiesList = db.Cities.Select(city => city.Name);
            return citiesList.ToList();
        }
        [HttpPost]
        public string Post(inputAddParams ip)
        {
            if (db.Cities.FirstOrDefault(city => city.Name == ip.Name) != null)
            {
                return ServerResponses.ElementWasExisted;
            }

            City city = new City();
            city.Name = ip.Name;
            db.Cities.Add(city);
            db.SaveChanges();
            return ServerResponses.ElementWasAdded;
        }
    }
}

