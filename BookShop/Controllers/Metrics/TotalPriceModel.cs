using System;
using System.Collections.Generic;

namespace BookShop.Controllers.Metrics
{
    public class TotalPriceModel
    {
        public float MoneyEarnedLastDay { get; set; }
        public float MoneyEarnedLastMonth { get; set; }
        public float MoneyEarnedAllTime { get; set; }
        
        public int BooksSoldLastDay { get; set; }
        public int BooksSoldLastMonth { get; set; }
        public int BooksSoldAllTime { get; set; }
        
        public List<ChartData> ChartDataMoney { get; set; }
        public List<ChartData> ChartDataBooksCount { get; set; }
        
        public TopData TopDataBooks { get; set; }
        public TopData TopDataCities { get; set; }
        public TopData TopDataAuthor { get; set; }
        
        public List<AllInfoCityList> AllCities { get; set; }
        public List<AllInfoBooksList> AllBooks { get; set; }
    }

    public class ChartData
    {
        public DateTime date { get; set; }
        public float count { get; set; }
    }
    
    public class TopData
    {
        public TopData(string _name, int _count)
        {
            this.Name = _name;
            this.Count = _count;
        }
        public string Name { get; set; }
        public int Count { get; set; }
    }
    
    public class TopDataList
    {
        public TopDataList(int _id, int _count)
        {
            this.id = _id;
            this.count = _count;
        }
        public int id { get; set; }
        public int count { get; set; }
    }
    
    public class TopDataListString
    {
        public TopDataListString(string _id, int _count)
        {
            this.value = _id;
            this.count = _count;
            
        }
        public string value { get; set; }
        public int count { get; set; }
    }
    public class AllInfoCityList
    {
        public AllInfoCityList(string _name, int _count, int _place)
        {
            this.value = _name;
            this.count = _count;
            this.place = _place;
        }
        public string value { get; set; }
        public int count { get; set; }
        public int place { get; set; }
    }
    
    public class AllInfoBooksList
    {
        public AllInfoBooksList(string _name, int _count, int _place, string _imageURL, string _edition, float _price, int _storagecount, List<string> _genres, List<string> _authors)
        {
            this.name = _name;
            this.count = _count;
            this.place = _place;
            this.imageURL = _imageURL;
            this.edition = _edition;
            this.price = _price;
            this.storagecount = _storagecount;
            this.authors = _authors;
            this.genres = _genres;
        }
        public string name { get; set; }
        public string imageURL { get; set; }
        public int count { get; set; }
        public int place { get; set; }
        public int storagecount { get; set; }
        public float price { get; set; }
        public string edition { get; set; }
        public List<string> genres { get; set; }
        public List<string> authors { get; set; }
    }
    
}