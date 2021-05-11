using System;
using System.Collections.Generic;
using BookShop.Models.DBContext;
using System.Linq;

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

    public class FormStatistics
    {
        private DBContext db = new DBContext();
        public TotalPriceModel GetFullStats()
        {
             TotalPriceModel tp = new TotalPriceModel();
            float totalsum = 0;
            float mounthsum = 0;
            float daysum = 0;

            int daycount = 0;
            int mounthcount = 0;
            int allcount = 0;
            
            List<ChartData> cd = new List<ChartData>();
            int curday = 0;
            float curdaysum = 0;
            
            List<ChartData> cdbk = new List<ChartData>();
            int curdaycount = 0;
            
            List<TopDataList> topdatabooks = new List<TopDataList>();
            List<TopDataListString> topdatacities = new List<TopDataListString>();
            
            //----- ВЫБОР ТОПА АВТОРОВ
            var dbPurchases = db.Purchases.Select(p => p).ToList();
            dbPurchases.ForEach(dbPurchase =>
            {
                //-----выборка самой покупаемой книги
                if (topdatabooks.FirstOrDefault(b => b.id == dbPurchase.BookId) == null)
                {
                    topdatabooks.Add(new TopDataList(dbPurchase.BookId, dbPurchase.Count));
                }
                else
                {
                    topdatabooks.First(tb => tb.id == dbPurchase.BookId).count += dbPurchase.Count;
                }
                
                //----- выборка самого читающего города
                if (topdatacities.FirstOrDefault(b => b.value == dbPurchase.Location) == null)
                {
                    topdatacities.Add(new TopDataListString(dbPurchase.Location, dbPurchase.Count));
                }
                else
                {
                    topdatacities.First(tb => tb.value == dbPurchase.Location).count += dbPurchase.Count;
                }
                
                float purcachesum = dbPurchase.Count * db.Books
                    .First(book => book.Id == dbPurchase.BookId).Price;
                
                if (dbPurchase.Date > DateTime.Now.AddMonths(-1))
                {
                    if (dbPurchase.Date.Day == curday)
                    {
                        curdaysum += purcachesum;
                        curdaycount += dbPurchase.Count;
                    }
                    else
                    {
                        ChartData ctx = new ChartData();
                        ctx.count = curdaysum;
                        ctx.date = dbPurchase.Date.Date.AddDays(-1);
                        cd.Add(ctx);
                        
                        ChartData ctxbd = new ChartData();
                        ctxbd.count = curdaycount;
                        ctxbd.date = dbPurchase.Date.Date.AddDays(-1);
                        cdbk.Add(ctxbd);

                        curdaycount = 0;
                        curdaycount += dbPurchase.Count;
                        curdaysum = 0;
                        curday = dbPurchase.Date.Day;
                        curdaysum += purcachesum;
                    }
                    mounthcount += dbPurchase.Count;
                    mounthsum += purcachesum;
                }

                if (dbPurchase.Date > DateTime.Now.AddDays(-1))
                {
                    daycount += dbPurchase.Count;
                    daysum += purcachesum;
                }

                allcount += dbPurchase.Count;
                totalsum += purcachesum;
            });
            
            //----- кол-во прибыли по дням
            ChartData ctx = new ChartData();
            ctx.count = curdaysum;
            ctx.date = db.Purchases.ToList().Last().Date;
            cd.Add(ctx);
            
            //----- кол-во проданных книг по дням
            ChartData ctxbd = new ChartData();
            ctxbd.count = curdaycount;
            ctxbd.date = db.Purchases.ToList().Last().Date;
            cdbk.Add(ctxbd);

            //----- самая продаваемая книга + список всех книг
            List<AllInfoBooksList> AllBooks = new List<AllInfoBooksList>();
            int counter = 0;
            TopData topBook = new TopData(null, 0);
            topdatabooks.ForEach(top =>
            {
                counter++;
                var book = db.Books.ToList().First(b => b.Id == top.id);
                //
                var authorsId = db.BooksAuthors
                    .Where(author => author.Bookid == book.Id)
                    .Select(id => id.Authorid)
                    .ToList();
                List<string> authors = new List<string>();
                foreach (var id in authorsId)
                {
                    string au = db.Authors.First(author => author.Id == id).Name;
                    authors.Add(au);
                }

                var genresId = db.BooksGenres
                    .Where(genre => genre.Bookid == book.Id)
                    .Select(id => id.Genreid)
                    .ToList();
                List<string> genres = new List<string>();
                foreach (var id in genresId)
                {
                    string au = db.Genres.First(genre => genre.Id == id).Name;
                    genres.Add(au);
                }

                var count = db.StoragePositions.FirstOrDefault(pos => pos.Id == book.Id);

                AllBooks.Add(new AllInfoBooksList(book.Name,  top.count, counter, book.ImageURL, book.Edition, book.Price, count.Count, genres, authors));
                if (topBook.Count < top.count)
                {
                    topBook.Count = top.count;
                    topBook.Name = top.id.ToString();
                }
            });
            counter = 0;
            
            
            //----- самый читающий город + выборка всех
            TopData topCity = new TopData(null, 0);
            List<AllInfoCityList> AllCities = new List<AllInfoCityList>();
            topdatacities.ForEach((top) =>
            {
                counter++;
                AllCities.Add(new AllInfoCityList(top.value, top.count, counter));
                if (topCity.Count < top.count)
                {
                    topCity.Count = top.count;
                    topCity.Name = top.value.ToString();
                }
            }); 

            topBook.Name = db.Books.First(book => book.Id == Convert.ToInt32(topBook.Name)).Name;
            
            //----- самый покупаемый автор
            TopData topAuthor = new TopData("Лев", 1223);
            
            //----- присваение предыдущих рассчётов
            tp.AllCities = AllCities;
            tp.AllBooks = AllBooks;
            
            tp.TopDataAuthor = topAuthor;
            tp.TopDataCities = topCity;
            tp.TopDataBooks = topBook;

            tp.ChartDataMoney = cd;
            tp.ChartDataBooksCount = cdbk;
            
            tp.BooksSoldAllTime = allcount;
            tp.BooksSoldLastDay = daycount;
            tp.BooksSoldLastMonth = mounthcount;
            
            tp.MoneyEarnedLastDay = daysum;
            tp.MoneyEarnedLastMonth = mounthsum;
            tp.MoneyEarnedAllTime = totalsum;
            return tp;
        }
    }
    
}