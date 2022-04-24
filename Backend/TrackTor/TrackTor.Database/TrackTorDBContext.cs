using Microsoft.EntityFrameworkCore;
using TrackTor.DataBase.Configurations;
using TrackTor.DataBase.Models;
#nullable enable

namespace TrackTor.DataBase
{
    public class TrackTorDBContext: DbContext
    {
        public TrackTorDBContext(DbContextOptions<TrackTorDBContext> options) : base(options)
        {
        }

        public DbSet<Track>? Track { get; set; }
        public DbSet<TrackCheckPoint>? TrackCheckPoint { get; set; }
        public DbSet<User>? User { get; set; }
        public DbSet<Result>? Result { get; set; }
        
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasDefaultSchema("TrackTor");

            modelBuilder.ApplyConfiguration(new TrackConfiguration());
            modelBuilder.ApplyConfiguration(new TrackCheckPointConfiguration());
            modelBuilder.ApplyConfiguration(new ResultConfiguration());
            modelBuilder.ApplyConfiguration(new UserConfiguration());
        }
        
    }
}