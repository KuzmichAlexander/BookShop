using System;
using System.Collections.Generic;

namespace BookShop.Models
{
    public class UserOrders
    {
        public string Name { get; set; }
        public float Price { get; set; }
        public List<string> Authors { get; set; }
        public DateTime OrderDate { get; set; }
        public DateTime ResievedDate { get; set; }
        public string ImageURL { get; set; }
        public int Count { get; set; }
        public bool IsResieved { get; set; }
    }
}