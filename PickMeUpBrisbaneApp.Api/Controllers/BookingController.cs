using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using PickMeUpBrisbaneApp.Api.Repository;
using PickMeUpBrisbaneApp.Api.Models;
using Microsoft.AspNetCore.Cors;
using System.Net.Http;
using System.Net;
using System.Text;
using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace PickMeUpBrisbaneApp.Api.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]/[action]")]
    public class BookingController : Controller
    {


        private readonly BookingContext _context;

        public BookingController(BookingContext context)
        {
            _context = context;
        }

       public  struct CalendarBooking
        {
            public string title { get; set; }
            public DateTime start { get; set; }
            public DateTime end { get; set; }
            public Booking meta { get; set; }
            public bool draggable { get; set; }
            public object color { get; set; }
        }

        // GET api/values
        [HttpGet]
        public ICollection<CalendarBooking> GetAllCalendarBookings()
        {
            var bookings = _context.Bookings.ToList();
            foreach (Booking item in bookings)
            {
                item.Client = _context.Clients.Where(x => x.ID == item.ClientID).FirstOrDefault();
            }

            return bookings.Select (x=> new CalendarBooking { color= new { primary= "#1e90ff", secondary= "#D1E8FF" },  title = x.Title , start = x.PickupDate, end=x.PickupDate, draggable=false, meta=x  }).ToList();
        }

        // GET api/values
        [HttpGet]
        public ICollection<Booking > GetAllBookings()
        {
            var bookings = _context.Bookings.ToList();
            foreach (Booking item in bookings)
            {
                item.Client = _context.Clients.Where(x => x.ID == item.ClientID).FirstOrDefault();
            }
            return bookings;
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public Booking Get(Guid id)
        {
            return _context.Bookings.Where(x => x.ID.Equals(id)).FirstOrDefault();
        }


        // GET api/values/5
        [HttpGet("{fromDate}")]
        public string GetFromDate([FromQuery]DateTime fromDate)
        {
            return fromDate.ToString();
        }

        [HttpGet]       
        public ICollection<Location> Locations()
        {
            var result= _context.Locations.ToList();
            return result;
        }

        // POST api/values
        [HttpPost]
        public IActionResult  CreateBooking([FromBody]Booking value)
        {
            try
            {
                value.PickupDate = value.PickupDate.ToLocalTime();
                var client = _context.Clients.Where(x => x.ID == value.Client.ID).FirstOrDefault();
                var validations = value.ValidateBook();
                if (client == null)
                {
                    validations = "Customer does not exist";
                }

                if (!string.IsNullOrEmpty(validations))
                {

                    //var modelState = new ModelStateDictionary();
                    //modelState.AddModelError("Property", validations);
                    //return BadRequest(modelState);

                    return StatusCode(((int)HttpStatusCode.BadRequest), validations);

                    //response = new HttpResponseMessage(HttpStatusCode.BadRequest);
                    //response.Content = new StringContent(validations, Encoding.Unicode);
                    //return response;
                }
                var result = _context.Bookings.Add(value);
                _context.SaveChanges();
                return StatusCode(((int)HttpStatusCode.OK), result.Entity.ID );
            }
            catch (Exception ex)
            {
                return StatusCode(((int)HttpStatusCode.ExpectationFailed), ex.Message );
                throw;
            }
            
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
