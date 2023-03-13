namespace Server.Contracts.Dtos;

public class TaskDto
{
    public Guid Id { get; set; }
    public string UserId { get; set; } = default!;
    public DateTime CreatedAt { get; set; }
    public string Title { get; set; } = default!;
    public string? Description { get; set; }
    public DateOnly? DueDate { get; set; }
    public bool IsCompleted { get; set; }
    public bool? IsImportant { get; set; }
}