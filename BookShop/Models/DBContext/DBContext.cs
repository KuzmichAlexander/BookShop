﻿using BookShop.Models.BooksParams;
using BookShop.Models.RegistrationParams;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


namespace BookShop.Models.DBContext
{
    public class DBContext : DbContext
    {
        public DbSet<RegistrationData> Users { get; set; }
        public DbSet<Book> Books { get; set; }
        public DbSet<Author> Authors { get; set; }
        public DbSet<Genre> Genres { get; set; }
        public DbSet<Edition> Editions { get; set; }


        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(@"Data Source=LAPTOP-L84HTVCC;Initial Catalog=ShopDB;Integrated Security=True");

           
        }
    }
}
