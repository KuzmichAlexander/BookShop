﻿namespace BookShop.Models.BooksParams
{
    public class Storage
    {
        public int Id { get; set; }
        public int Count { get; set; }
    }
    
    public class InputBooksInStorage
    {
        public string Name { get; set; }
        public int Count { get; set; }
    }
}
