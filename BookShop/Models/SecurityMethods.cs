using BookShop.Models.RegistrationParams;
using System.Security.Cryptography;
using System.Text;
using System.Text.Json;

namespace BookShop.Models
{
    public static class SecurityMethods
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
            rd.IsAdmin = false;
            rd.Login = ri.Login;
            rd.Name = ri.Name;
            rd.Surname = ri.Surname;
            rd.Password = GetSHA1Hash(ri.Password);
            return rd;
        }

        public static string CreateToken(RegistrationData rd)
        {
            string obj = JsonSerializer.Serialize<RegistrationData>(rd);
            string token = GetSHA1Hash(obj);
            return token;
        }
    }
}
