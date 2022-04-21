using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TrackTor.DataBase.Models;

namespace TrackTor.DataBase.Configurations
{
    public class TrackConfiguration: IEntityTypeConfiguration<Track>
    {
        public void Configure(EntityTypeBuilder<Track> builder)
        {
            builder.HasIndex(track => track.Id).IsUnique();
            builder.HasKey(track => track.Id);
            builder.Property(track => track.Id).IsRequired();

            builder.Property(track => track.UserId).IsRequired();
            
            builder.Property(track => track.Name).IsRequired();
            builder.Property(track => track.Type).IsRequired();
            builder.Property(track => track.Distance).IsRequired();
            builder.Property(track => track.AverageTime).IsRequired();
            
            builder.HasMany(track => track.Results)
                .WithOne(res => res.Track!)
                .OnDelete(DeleteBehavior.Cascade);
            
            builder.HasMany(track => track.Points)
                .WithOne(point => point.Track!)
                .OnDelete(DeleteBehavior.Cascade);

        }
    }
}