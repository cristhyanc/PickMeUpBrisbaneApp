using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
namespace PickMeUpBrisbaneApp.Api.Models
{
    public class Location
    {
       
        public int ID { get; set; }
        public string Council { get; set; }  
        public string Name { get; set; }   
        public string PostCode { get; set; }
        public bool IsShared { get; set; }
    }
}
