using Microsoft.EntityFrameworkCore;
using PickMeUpBrisbaneApp.Api.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PickMeUpBrisbaneApp.Api.Repository
{
    public class BookingContext : DbContext
    {
        public BookingContext(DbContextOptions<BookingContext> options) : base(options)
        {
        }

        public DbSet<Location> Locations { get; set; }
        public DbSet<Client> Clients { get; set; }
        public DbSet<Booking> Bookings { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Location>().ToTable("tblLocation");
            modelBuilder.Entity<Client>().ToTable("tblClient");
            modelBuilder.Entity<Booking>().ToTable("tblBooking");
        }

    }
}