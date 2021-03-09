using BookShop.Models;
using Microsoft.AspNetCore.Mvc;

namespace BookShop.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : Controller
    {
        // GET: AuthController
        [HttpPost]
        public UserAuthData Post(UserAuth ua)
        {
            UserAuthData uad = new UserAuthData();
            
                
                uad.Email = "Kozyavkov2332@mail.ru";
                uad.Login = "Kozyavkov23";

                uad.Name = "Константин";

                uad.Surname = "Гибон";
                uad.Token = "sdfaTKTTJ54okOKT4wfefew24tr4wwffgRFGLGPrg34";


               

            return uad;
            
        }
    }
}
