using BookShop.Models.RegistrationParams;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Net.Mail;
using System.Net;

namespace BookShop.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RegistrationController : Controller
    {
        [HttpPost]
        public bool Post(RegistrationInput ri)
        {
            

            return false;
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
            MailAddress to = new MailAddress("aleksandr.kz2000@mail.ru"); //kuajtaa@mail.ru
            MailMessage m = new MailMessage(from, to);
            m.Subject = "Проверочный код";
            m.Body = @$"<h2>Проверочный код {GetRandomNumber()} (Рыглан когда в хс регать будем)</h2>";
            m.IsBodyHtml = true;
            SmtpClient smtp = new SmtpClient("smtp.mail.ru", 465);
            smtp.EnableSsl = true;
            smtp.Credentials = new NetworkCredential("bookstore@internet.ru", "ghj100ghj100");
            smtp.Send(m);
        }
    }
}
