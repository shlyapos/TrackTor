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
        }
    }
}