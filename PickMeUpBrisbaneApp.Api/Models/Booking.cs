using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PickMeUpBrisbaneApp.Api.Models
{
    public class Booking
    {
        public Guid ID { get; set; }
        public Client Client { get; set; }
        public DateTime PickupDate { get; set; }
        public string PickUpAddress { get; set; }
        public string DropOffAddress { get; set; }
        public string Message { get; set; }
        public string Title { get; set; }
        public bool ShareRide { get; set; }
        public string PickUpSuburb { get; set; }
        public string DropOffSuburb { get; set; }
        public long ClientID { get; set; }

        public string ValidateBook()
        {
            if(PickupDate <DateTime.Now )
            {
                return "The date is invalid, please select another date";
            }

            if(string.IsNullOrEmpty(PickUpSuburb ) || string.IsNullOrEmpty(DropOffSuburb ))
            {
                return "The suburb is mandatory";
            }

            if(Client == null)
            {
                return "The customer is mandatory";
            }
            else
            {
                return Client.Validate();
            }
            
        }

    }
}
