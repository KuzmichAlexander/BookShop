using System;
using System.Threading;
using BookShop.Models.DBContext;

namespace BookShop.IntervalEvents
{
    public class UpdateDeliveryStatus
    {
        private DBContext db = new DBContext();

        public void StartTimeintervalUpdate()
        {
            UpdateStatuses();
            Console.WriteLine("Updater has been started");
        }

        private void UpdateStatuses()
        {
            while (true)
            {
                CheckDeliveries();
                //-----once a day
                Thread.Sleep(1000 * 60 * 60 * 24);
                //---------------
            }
        }

        private void CheckDeliveries()
        {
            try
            {
                foreach (var dbDelivery in db.Deliveries)
                {
                    if (dbDelivery.ReceivedDate <= DateTime.Now)
                    {
                        dbDelivery.IsReceived = true;
                    }
                }
                Console.WriteLine("Statuses successful updated at " + DateTime.Now);

                db.SaveChanges();
            }
            catch
            {
                Console.WriteLine("Something wrong while we try to update deliveries status at " + DateTime.Now);
            }
        }
    }
}