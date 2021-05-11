using System;
using System.Collections.Generic;

namespace BookShop.Models
{
    public class Purchase
    {
        public int Id { get; set; }
        public DateTime Date { get; set; }
        public int Count { get; set; }
        public int TotalPrice { get; set; }
        public string Location { get; set; }
        public int RegistrationDataId { get; set; }
        public int BookId { get; set; }
        public string Hash { get; set; }
    }

    public class InputPurchace
    {
        public List<Purchase> Purchases { get; set; }
        public string City { get; set; }
    }
    
    public class HashPurcase
    {
        public HashPurcase(string date, string city, string userHash)
        {
            this._Date = date;
            this._City = city;
            this._UserHash = userHash;
        }
        public string _Date { get; set; }
        public string _City { get; set; }
        public string _UserHash { get; set; }
    }
    
}
