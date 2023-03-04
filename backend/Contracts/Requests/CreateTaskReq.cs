namespace Server.Contracts.Requests;

public class CreateTaskReq
{
    public required string Title { get; set; }
    public string? Description { get; set; }
    public DateOnly? DueDate { get; set; }
}