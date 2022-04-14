using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TrackTor.DataBase.Models;

namespace TrackTor.DataBase.Configurations
{
    public class ResultConfiguration: IEntityTypeConfiguration<Result>
    {
        public void Configure(EntityTypeBuilder<Result> builder)
        {
            builder.HasIndex(result => result.Id).IsUnique();
            builder.HasKey(result => result.Id);
            builder.Property(result => result.Id).IsRequired();

            builder.Property(result => result.UserId).IsRequired();
            
            builder.Property(result => result.TrackId).IsRequired();
            builder.Property(result => result.RecordTime).IsRequired();
        }
    }
}