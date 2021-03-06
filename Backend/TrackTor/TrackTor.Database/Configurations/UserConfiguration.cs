using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TrackTor.DataBase.Models;

namespace TrackTor.DataBase.Configurations
{
    public class UserConfiguration: IEntityTypeConfiguration<User>
    {
        public void Configure(EntityTypeBuilder<User> builder)
        {
            builder.HasIndex(user => user.Id).IsUnique();
            builder.HasKey(user => user.Id);
            builder.Property(user => user.Id).IsRequired();

            builder.Property(user => user.Login).IsRequired();
            
            builder.Property(user => user.Hash).IsRequired();
            builder.Property(user => user.Salt).IsRequired();

            builder.HasMany(user => user.Results)
                .WithOne(res => res.User!)
                .OnDelete(DeleteBehavior.Cascade);
            
            builder.HasMany(user => user.Tracks)
                .WithOne(track => track.User!)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}