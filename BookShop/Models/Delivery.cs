using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookShop.Models
{
    public class Delivery
    {
        public int Id { get; set; }
        public DateTime ReceivedDate { get; set; }
        public bool IsReceived { get; set; }
        public int PurchaseId { get; set; }
        public Purchase Purchase { get; set; }
    }
}
