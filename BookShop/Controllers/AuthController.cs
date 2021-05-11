using BookShop.Models;
using BookShop.Models.DBContext;
using Microsoft.AspNetCore.Mvc;
using System.Linq;

namespace BookShop.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : Controller
    {
        DBContext db = new DBContext();
        [HttpGet]
        public UserAuthData Get() // Авторизация по токену
        {
            string token = Request.Headers["Authorization"];
            UserAuthData user = ParseToken(token);
            user.Ok = true;
            return user;
        }
        
        [HttpPost]
        public UserAuthData Post(UserAuth ua) // Авторизация по логину и паролю
        {
            UserAuthData user = new UserAuthData();

            var trueUser = db.Users.FirstOrDefault(user => user.Login == ua.Login && user.Password == SecurityMethods.GetSHA1Hash(ua.Password));

            if (trueUser == null)
            {
                user.Ok = false;
                return user;
            }

            user.Login = trueUser.Login;
            user.Name = trueUser.Name;
            user.Surname = trueUser.Surname;
            user.Email = trueUser.Email;
            user.Token = trueUser.Token;
            user.IsAdmin = trueUser.IsAdmin;
            
            user.Ok = true;

            return user;
        }


        [NonAction]
        public UserAuthData ParseToken(string token)
        {
            var user = new UserAuthData();
            var trueUser = db.Users.First(user => user.Token == token);

            if (trueUser == null)
            {
                user.Ok = false;
                return user;
            }

            user.Login = trueUser.Login;
            user.Name = trueUser.Name;
            user.Surname = trueUser.Surname;
            user.Email = trueUser.Email;
            user.IsAdmin = trueUser.IsAdmin;

            return user;
        }
    }
}
