using BookShop.Models.RegistrationParams;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using BookShop.Models;
using BookShop.Models.DBContext;
using System.Text.Json;
using System.IO;

namespace BookShop.Models
{
    public class SecurityMethods
    {
        
        public static string GetSHA1Hash(string str)
        {
            SHA1CryptoServiceProvider sh = new SHA1CryptoServiceProvider();
            sh.ComputeHash(ASCIIEncoding.ASCII.GetBytes(str));
            byte[] re = sh.Hash;
            StringBuilder sb = new StringBuilder();
            foreach (byte b in re)
            {
                sb.Append(b.ToString("x2"));
            }

            return sb.ToString();
        }
        public static RegistrationData DBWrapper(RegistrationInput ri)
        {
            RegistrationData rd = new RegistrationData();
            rd.Email = ri.Email;
            rd.IsAdmin = true;
            rd.Login = ri.Login;
            rd.Name = ri.Name;
            rd.Surname = ri.Surname;
            rd.Password = SecurityMethods.GetSHA1Hash(ri.Password);
            return rd;
        }
       


        public static string CreateToken(RegistrationData rd)
        {
            string obj = JsonSerializer.Serialize<RegistrationData>(rd);
            string token = SecurityMethods.GetSHA1Hash(obj);
            return token;
        }



        public static void LogRegister(RegistrationData rd)
        {
            string userdata = JsonSerializer.Serialize<RegistrationData>(rd);
            using (StreamWriter sw = new StreamWriter(@"log.txt"))
            {
                sw.WriteLine(userdata);
            }
        }
    }
}
