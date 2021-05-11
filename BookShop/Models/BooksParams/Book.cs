using System.Collections.Generic;

namespace BookShop.Models
{
    public class Book
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string ImageURL { get; set; }
        public string Edition { get; set; }
        public int Pages { get; set; }
        public int Price { get; set; }
        public bool HasInStorage { get; set; }
    }
    public class InputBookData
    {
        public string Name { get; set; }
        public List<string> Author { get; set; }
        public List<string> Genre { get; set; }
    }
    
    public class ClientBook
    {
        public ClientBook(Book book)
        {
            this.Description = book.Description;
            this.Edition = book.Edition;
            this.Name = book.Name;
            this.Pages = book.Pages;
            this.ImageURL = book.ImageURL;
            this.Price = book.Price;
            this.Id = book.Id;
        }
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string ImageURL { get; set; }
        public string Edition { get; set; }
        public int Pages { get; set; }
        public int Price { get; set; }
        public bool HasInStorage { get; set; }
        public List<string> Author { get; set; }
        public List<string> Genre { get; set; }
    }
}
