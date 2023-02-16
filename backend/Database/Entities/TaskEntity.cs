namespace Server.Database.Entities;

public class TaskEntity
{
    public Guid Id { get; set; }
    public string UserId { get; set; } = default!;
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
    public required string Title { get; set; }
    public string? Description { get; set; }
    public DateOnly? DueDate { get; set; }
    public TimeOnly? DueTime { get; set; }
    public bool IsCompleted { get; set; }
    public bool IsImportant { get; set; }
    
}