using System.ComponentModel.DataAnnotations;

namespace BookShop.Models.BooksParams
{
    public class BookAuthors
    {
        [Key]
        public int Id { get; set; }
        public int Bookid { get; set; }
        public int Authorid { get; set; }
    }
}