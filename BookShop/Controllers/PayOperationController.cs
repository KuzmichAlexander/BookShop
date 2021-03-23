using System.Threading;
using BookShop.Models;
using Microsoft.AspNetCore.Mvc;

namespace BookShop.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PayOperationController : Controller
    {
        [HttpGet]
        public string Get()
        {
            Thread.Sleep(700);
            return ServerResponses.PayOperationSuccess;
        }
    }
}