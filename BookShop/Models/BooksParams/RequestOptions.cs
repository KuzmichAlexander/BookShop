namespace BookShop.Models.BooksParams
{
    public class RequestOptions
    {
        public bool Default { get; set; }
        public string Name { get; set; }
        public float PriceAbove { get; set; }
        public float PriceBelow { get; set; }
        public string Genre { get; set; }
    }
}
