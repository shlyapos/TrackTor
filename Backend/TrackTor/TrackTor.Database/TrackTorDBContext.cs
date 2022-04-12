using Microsoft.EntityFrameworkCore;
using TrackTor.DataBase.Configurations;
using TrackTor.DataBase.Models;

namespace TrackTor.DataBase
{
    public class TrackTorDBContext: DbContext
    {
        public TrackTorDBContext()
        {
        }

        public DbSet<Track>? Track { get; set; }
        public DbSet<TrackCheckPoint>? TrackCheckPoint { get; set; }
        
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasDefaultSchema("TrackTor");

            modelBuilder.ApplyConfiguration(new TrackConfiguration());
            modelBuilder.ApplyConfiguration(new TrackCheckPointConfiguration());
        }
        
    }
}