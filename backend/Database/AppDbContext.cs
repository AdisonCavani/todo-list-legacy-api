using Microsoft.EntityFrameworkCore;
using Server.Database.Entities;

namespace Server.Database;

public class AppDbContext : DbContext
{
    public required DbSet<PostEntity> Posts { get; set; }

    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        // Enable extension for UUID generation
        builder.HasPostgresExtension("uuid-ossp");
        
        builder.Entity<PostEntity>()
            .HasKey(x => x.Id);

        builder.Entity<PostEntity>()
            .Property(x => x.Id)
            .HasColumnType("uuid")
            .HasDefaultValueSql("uuid_generate_v4()")
            .IsRequired();

        builder.Entity<PostEntity>()
            .Property(x => x.CreatedAt)
            .HasDefaultValueSql("current_timestamp at time zone 'utc'");
        
        builder.Entity<PostEntity>()
            .Property(x => x.UpdatedAt)
            .HasDefaultValueSql("current_timestamp at time zone 'utc'");

        builder.Entity<PostEntity>()
            .Property(x => x.Code)
            .IsRequired();
        
        builder.Entity<PostEntity>()
            .Property(x => x.Language)
            .IsRequired();
        
        builder.Entity<PostEntity>()
            .Property(x => x.Theme)
            .IsRequired();
    }
}