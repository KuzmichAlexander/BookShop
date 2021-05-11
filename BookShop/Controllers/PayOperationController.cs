using System.Threading;
using Microsoft.AspNetCore.Mvc;

namespace BookShop.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PayOperationController : Controller
    {
        //Метод имитирующий задержку транзакции
        [HttpGet]
        public string Get()
        {
            Thread.Sleep(700);
            return "";
        }
    }
}