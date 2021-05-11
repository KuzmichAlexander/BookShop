namespace BookShop.Models
{
    public class UserAuthData  //возвращаемый объект после парсинга токена//
    {
        public string Login { get; set; }
        public string Email { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public string Token { get; set; }
        public bool IsAdmin { get; set; }
        public bool Ok { get; set; }
    }
}
