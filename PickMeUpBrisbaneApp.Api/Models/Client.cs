using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PickMeUpBrisbaneApp.Api.Models
{
    public class Client
    {
        public string Email { get; set; }
        public string Name { get; set; }
        public string PhoneNumber { get; set; }
        public long ID { get; set; }

        public string Validate()
        {
            if(string.IsNullOrEmpty(Name ))
            {
                return "Customer's full name is mandatory";
            }

            if(string.IsNullOrEmpty(Email ) || string.IsNullOrEmpty(PhoneNumber ))
            {
                return "The email or phone number need to be provided";
            }

            return "";
        }
    }
}
