using System.ComponentModel.DataAnnotations;

namespace BookShop.Models.BooksParams
{
    public class BookGenres
    {
        [Key]
        public int Id { get; set; }
        public int Bookid { get; set; }
        public int Genreid { get; set; }
    }
}