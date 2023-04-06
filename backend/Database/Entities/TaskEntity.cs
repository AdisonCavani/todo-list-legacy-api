using System.Text.Json.Serialization;

namespace Server.Database.Entities;

public class TaskEntity
{
    [JsonPropertyName("pk")]
    public string Pk => Id;
    [JsonPropertyName("sk")]
    public string Sk => Pk;
    public string Id { get; set; } = default!;
    public string UserId { get; set; } = default!;
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
    public string Title { get; set; } = default!;
    public string? Description { get; set; }
    public DateOnly? DueDate { get; set; }
    public bool IsCompleted { get; set; }
    public bool IsImportant { get; set; }
    
}