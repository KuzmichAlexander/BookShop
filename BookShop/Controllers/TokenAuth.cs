using BookShop.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookShop.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TokenAuth : Controller
    {
        [HttpPost]
        public UserAuthData Post(UserAuthToken token)
        {
            UserAuthData uad = new UserAuthData();
            if (token.Token == "sdfaTKTTJ54okOKT4wfefew24tr4wwffgRFGLGPrg34")
            {
                uad.Email = "Kozyavkov2332@mail.ru";
                uad.Login = "Kozyavkov23";
                uad.Name = "Константин";
                uad.Surname = "Гибон";
                uad.Token = "sdfaTKTTJ54okOKT4wfefew24tr4wwffgRFGLGPrg34";
                uad.Ok = true;
                return uad;
            }

            uad.Ok = false;
            return uad;
        }
    }
}
