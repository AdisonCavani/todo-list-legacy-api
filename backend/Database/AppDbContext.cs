using Microsoft.EntityFrameworkCore;
using Server.Database.Entities;

namespace Server.Database;

public class AppDbContext : DbContext
{
    public required DbSet<TaskEntity> Tasks { get; set; }

    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        // Enable extension for UUID generation
        builder.HasPostgresExtension("uuid-ossp");
        
        builder.Entity<TaskEntity>()
            .HasKey(x => x.Id);

        builder.Entity<TaskEntity>()
            .Property(x => x.Id)
            .HasColumnType("uuid")
            .HasDefaultValueSql("uuid_generate_v4()")
            .IsRequired();

        builder.Entity<TaskEntity>()
            .Property(x => x.CreatedAt)
            .HasColumnType("timestamp without time zone")
            .HasDefaultValueSql("current_timestamp at time zone 'utc'");
        
        builder.Entity<TaskEntity>()
            .Property(x => x.UpdatedAt)
            .HasColumnType("timestamp without time zone")
            .HasDefaultValueSql("current_timestamp at time zone 'utc'");

        builder.Entity<TaskEntity>()
            .Property(x => x.Title)
            .IsRequired();
    }
}