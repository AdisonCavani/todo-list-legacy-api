namespace Server.Contracts.Requests;

public class UpdateTaskReq
{
    public Guid Id { get; set; }
    public required string Title { get; set; }
    public string? Description { get; set; }
    public DateOnly? DueDate { get; set; }
    public bool? IsCompleted { get; set; }
    public bool? IsImportant { get; set; }
}