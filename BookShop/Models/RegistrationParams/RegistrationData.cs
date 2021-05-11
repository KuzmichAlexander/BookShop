namespace BookShop.Models.RegistrationParams
{
    public class RegistrationData
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public string Email { get; set; }
        public string Login { get; set; }
        public string Password { get; set; }
        public string Token { get; set; }
        public bool IsAdmin { get; set; }
    }
}
