using BookShop.Models.BooksParams;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookShop.Models
{
    public class Book
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Author { get; set; }
        public string Description { get; set; }
        public string ImageURL { get; set; }
        public string Edition { get; set; }
        public string Pages { get; set; }
        public float Price { get; set; }
        public string Genre { get; set; }
        public bool HasInStorage { get; set; }
    }
}
