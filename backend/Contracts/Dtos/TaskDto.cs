namespace Server.Contracts.Dtos;

public class TaskDto
{
    public Guid Id { get; set; }
    public required string UserId { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
    public required string Title { get; set; }
    public string? Description { get; set; }
    public DateOnly? DueDate { get; set; }
    public bool IsCompleted { get; set; }
    public bool? IsImportant { get; set; }
}