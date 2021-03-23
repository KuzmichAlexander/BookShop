using System.Threading;
using BookShop.Models;
using Microsoft.AspNetCore.Mvc;

namespace BookShop.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderBookController : Controller
    {
        [HttpPost]
        public string Post()
        {
            // доделать контроллер.
            return ServerResponses.PayOperationSuccess;
        }
    }
}