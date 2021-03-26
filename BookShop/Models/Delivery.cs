using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BookShop.Models
{
    public class Delivery
    {
        public int Id { get; set; }
        public DateTime ReceivedDate { get; set; }
        public bool IsReceived { get; set; }
        public int UserId { get; set; }
        public string PurchasesHash { get; set; }
    }
}
