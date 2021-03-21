using BookShop.Models.RegistrationParams;
using System;

namespace BookShop.Models
{
    public class Purchase
    {
        public int Id { get; set; }
        public DateTime Date { get; set; }
        public int Quantity { get; set; }
        public int TotalPrice { get; set; }
        public string Location { get; set; }
        public int RegistrationDataId { get; set; }
        public RegistrationData User { get; set; }
        public int BookId { get; set; }
        public Book Book { get; set; }

    }
}
