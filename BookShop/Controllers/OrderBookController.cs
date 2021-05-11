using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using BookShop.Models;
using BookShop.Models.DBContext;
using BookShop.Models.RegistrationParams;
using Microsoft.AspNetCore.Mvc;

namespace BookShop.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderBookController : Controller
    {
        DBContext db = new DBContext();
        [HttpPost]
        public string Post(InputPurchace purchases)
        {
            string token = Request.Headers["Authorization"];
            if (token == "")
            {
                return ServerResponses.BadRequest;
            }

            var orderObjPurcase = new HashPurcase(DateTime.Now.ToString(), purchases.City, token);

            string hash =
                SecurityMethods.GetSHA1Hash(
                    JsonSerializer.Serialize(orderObjPurcase));
            
            RegistrationData user = ParseToken(token);

            DateTime dt = DateTime.Now;
            
            List<Purchase> pl = new List<Purchase>();

            bool IsNotOkay = false;
            string IsNotOkayBookName = "";
            
            foreach (var purchase in purchases.Purchases)
            {
                Purchase p = new Purchase();
                p.RegistrationDataId = user.Id;
                p.Date = dt;
                p.BookId = purchase.BookId;
                p.Location = purchases.City;
                p.Count = purchase.Count;
                p.TotalPrice = purchase.Count * db.Books.First(i => i.Id == purchase.BookId).Price;
                p.Hash = hash;
                
                IsNotOkay = CheckStoragePosition(purchase);
                
                if (IsNotOkay)
                {
                    IsNotOkayBookName = db.Books.First(book => book.Id == p.BookId).Name;
                    continue;
                }

                pl.Add(p);
            }
            
            if (IsNotOkay)
            {
                return ServerResponses.StorageReject(IsNotOkayBookName);
            }
            
            pl.ForEach(p =>
            {
                db.Purchases.Add(p);
            });
            
            db.SaveChanges();
            
            //код для delivery-purchase
            
            Delivery d = new Delivery();
            d.UserId = user.Id;
            d.IsReceived = false;
            d.ReceivedDate = DateTime.Now.AddDays(5);
            d.PurchasesHash = hash;

            db.Deliveries.Add(d);
            db.SaveChanges();
            
            return ServerResponses.PayOperationSuccess;
        }
        
        [NonAction]
        public RegistrationData ParseToken(string token)
        {
            var user = new RegistrationData();
            var trueUser = db.Users.First(user => user.Token == token);
            
            user.Login = trueUser.Login;
            user.Name = trueUser.Name;
            user.Surname = trueUser.Surname;
            user.Email = trueUser.Email;
            user.IsAdmin = trueUser.IsAdmin;
            user.Token = token;
            user.Id = trueUser.Id;
            
            return user;
        }

        [NonAction]
        public bool CheckStoragePosition(Purchase purchase)
        {
            var NewStoragePos = db.StoragePositions.First(pos => pos.Id == purchase.BookId);
            NewStoragePos.Count -= purchase.Count;
            if (NewStoragePos.Count < 0)
            {
                return true;
            }

            return false;
        }
        
    }
}