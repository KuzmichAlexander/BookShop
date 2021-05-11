﻿using Microsoft.AspNetCore.Mvc;

namespace BookShop.Controllers.Metrics
{
    [Route("api/[controller]")]
    [ApiController]
    public class TotalPriceController : Controller
    {
        public TotalPriceModel Get() //формирование статистики
        {
            FormStatistics fs = new FormStatistics();
            TotalPriceModel tp = fs.GetFullStats();
            return tp;
        }
    }
}