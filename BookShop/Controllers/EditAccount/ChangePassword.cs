using BookShop.Models;
using BookShop.Models.BooksParams;
using BookShop.Models.DBContext;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BookShop.Models.RegistrationParams;

namespace BookShop.Controllers.EditBooks
{
    [Route("api/[controller]")]
    [ApiController]
    public class ChangePassword : Controller
    {
        DBContext db = new DBContext();
        // GET: ChangePassword
        [HttpPatch]
        public string Patch(PassModel pm)
        {
            string token = Request.Headers["Authorization"];
            
            RegistrationData user = db.Users.FirstOrDefault(user => user.Token == token);

            if (user.Password == SecurityMethods.GetSHA1Hash(pm.OldPass))
            {
                user.Password = SecurityMethods.GetSHA1Hash(pm.NewPass);
                db.Users.Attach(user);
                db.SaveChanges();

                return ServerResponses.ChangePasswordSuccess;
            }
            
            return ServerResponses.ChangePasswordError;
        }
        
        
        public class PassModel
        {
            public string OldPass { get; set; }
            public string NewPass { get; set; }
        }
    }
}