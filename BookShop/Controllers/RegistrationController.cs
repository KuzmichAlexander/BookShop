using BookShop.Models.RegistrationParams;
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
using System.Threading;

namespace BookShop.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class RegistrationController : Controller
    {
        DBContext db = new DBContext();

        [HttpPost]
        public string Post(RegistrationInput ri)
        {
            //Если такой логин уже зареган
            if (db.Users.FirstOrDefault(user => user.Login == ri.Login) != null)
            {
                return ServerResponses.LoginWasExisted;
            }

            RegistrationData rd = SecurityMethods.DBWrapper(ri);
            //----- Тут будет создание токена
            rd.Token = SecurityMethods.CreateToken(rd);
            //-----

            //----- Тут будет занесение данных в бд
            db.Users.Add(rd);
            db.SaveChanges();
            SecurityMethods.LogRegister(rd);
            //-----

            return ServerResponses.UserWasCreated;
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

        static void SendEmail(string Email)
        {
            MailAddress from = new MailAddress("bookstore@internet.ru", "Магазин WILDBOOKI");
            MailAddress to = new MailAddress(Email); //
            MailMessage m = new MailMessage(from, to);
            m.Subject = "Проверочный код";
            m.Body = @$"<h2>Проверочный код {GetRandomNumber()}</h2>
            <p>Сообщение создано автоматичеки нашим ботом, не нужно на него отвечать</p>";
            m.IsBodyHtml = true;
            SmtpClient smtp = new SmtpClient("smtp.mail.ru", 465);
            smtp.EnableSsl = true;
            smtp.Credentials = new NetworkCredential("bookstore@internet.ru", "ghj100ghj100ghj");
            smtp.Send(m);
        }

        

    }
}
