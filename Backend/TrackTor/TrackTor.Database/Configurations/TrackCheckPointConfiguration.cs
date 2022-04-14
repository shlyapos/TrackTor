using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TrackTor.DataBase.Models;

namespace TrackTor.DataBase.Configurations
{
    public class TrackCheckPointConfiguration: IEntityTypeConfiguration<TrackCheckPoint>
    {
        public void Configure(EntityTypeBuilder<TrackCheckPoint> builder)
        {
            builder.HasIndex(trackCheckPoint => trackCheckPoint.Id).IsUnique();
            builder.HasKey(trackCheckPoint => trackCheckPoint.Id);
            builder.Property(trackCheckPoint => trackCheckPoint.Id).IsRequired();

            builder.Property(trackCheckPoint => trackCheckPoint.TrackId).IsRequired();
            
            builder.Property(trackCheckPoint => trackCheckPoint.Longitude).IsRequired();
            builder.Property(trackCheckPoint => trackCheckPoint.Latitude).IsRequired();
        }
    }
}