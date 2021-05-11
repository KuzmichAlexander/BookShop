using System.Collections.Generic;
using System.Linq;
using BookShop.Models;
using BookShop.Models.DBContext;
using Microsoft.AspNetCore.Mvc;

namespace BookShop.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserAccount : Controller
    {
        DBContext db = new DBContext();
        [HttpGet]
        public List<UserOrders> Get()
        {
            List<UserOrders> ua = new List<UserOrders>(); 
            
            string token = Request.Headers["Authorization"];
            if (token == "")
            {
                return ua;
            }
            
            int trueUserId = db.Users.First(user => user.Token == token).Id;

            //забираем все заказы
            List<Delivery> deliveries = db.Deliveries.Where(d => d.UserId == trueUserId).ToList();
            
            //забираем все книги из заказов
            List<Purchase> purchases = new List<Purchase>();
            deliveries.ForEach(delivery =>
            {
                db.Purchases
                    .Where(p => p.Hash == delivery.PurchasesHash)
                    .ToList()
                    .ForEach(p =>
                    {
                        UserOrders uo = new UserOrders();
                        uo.Count = p.Count;
                        uo.OrderDate = p.Date;
                        uo.ResievedDate = delivery.ReceivedDate;
                        Book book = db.Books.First(b => b.Id == p.BookId);
                        uo.Price = book.Price;
                        uo.ImageURL = book.ImageURL;
                        uo.Name = book.Name;
                        uo.IsResieved = delivery.IsReceived;
                        List<string> au = new List<string>();
                        db.BooksAuthors
                            .Where(ba => ba.Authorid == p.BookId)
                            .Select(ba => ba.Authorid)
                            .ToList()
                            .ForEach(b => au.Add(db.Authors.First(a => a.Id == b).Name));
                        uo.Authors = au;
                        ua.Add(uo);
                    });
            });

            return ua;
        }
    }
}