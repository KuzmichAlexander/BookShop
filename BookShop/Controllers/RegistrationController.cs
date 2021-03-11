﻿using BookShop.Models.RegistrationParams;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Net.Mail;
using System.Net;
using System.IO;
using System.Text.Json;
using System.Security.Cryptography;
using BookShop.Models;
using System.Linq;
using BookShop.Models.DBContext;

namespace BookShop.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class RegistrationController : Controller
    {
      
        DBContext db = new DBContext();
        
        [HttpGet]
        

        [HttpPost]
        public string Post(RegistrationInput ri)
        {
            RegistrationData rd = SecurityMethods.DBWrapper(ri);

            //----- Тут будет Создание токена
            rd.Token = SecurityMethods.CreateToken(rd);
            //-----

            //----- Тут будет занесение данных в бд
            //

            db.Users.Add(rd);
            db.SaveChanges();
            SecurityMethods.LogRegister(rd);
            //
            //var a = _db.Users.First(a => a.Id == 0);
            var a = "321";
            return a;
           // return JsonSerializer.Serialize<RegistrationData>(a);
        }


        

        static string GetRandomNumber()
        {
            string number = "";
            for (int i = 0; i < 4; i++)
            {
                number += new Random().Next(0, 9);
            }
            return number;
        }

        static void SendEmail()
        {
            MailAddress from = new MailAddress("bookstore@internet.ru", "Магазин WILDBOOKI");
            MailAddress to = new MailAddress("kuajtaa@mail.ru"); //
            MailMessage m = new MailMessage(from, to);
            m.Subject = "Проверочный код";
            m.Body = @$"<h2>Проверочный код {GetRandomNumber()} (Рыглан когда в хс регать будем я не шучу)</h2>";
            m.IsBodyHtml = true;
            SmtpClient smtp = new SmtpClient("smtp.mail.ru", 465);
            smtp.EnableSsl = true;
            smtp.Credentials = new NetworkCredential("bookstore@internet.ru", "ghj100ghj100ghj");
            smtp.Send(m);
        }

        

    }
}
