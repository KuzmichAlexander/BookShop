using BookShop.Models;
using BookShop.Models.DBContext;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using BookShop.Models.RegistrationParams;

namespace BookShop.Controllers.EditBooks
{
    [Route("api/[controller]")]
    [ApiController]
    public class ChangePassword : Controller
    {
        DBContext db = new DBContext();
        [HttpPatch]
        public string Patch(PassModel pm)
        {
            string token = Request.Headers["Authorization"];
            
            RegistrationData user = db.Users.FirstOrDefault(user => user.Token == token);

            string _oldpass = SecurityMethods.GetSHA1Hash(pm.OldPass);
            if (user.Password == _oldpass)
            {
                string _newpass = SecurityMethods.GetSHA1Hash(pm.NewPass);
                if (_newpass == _oldpass)
                {
                    return ServerResponses.ChangePasswordIsSame;
                }

                user.Password = _newpass;
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