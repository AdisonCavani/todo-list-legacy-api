namespace Server.Contracts.Responses;

public class PaginatedRes<T>
{
    public IEnumerable<T> Data { get; set; } = Enumerable.Empty<T>();

    public string? PageKey { get; set; }
    
    public int PageSize { get; set; }

    public string? NextPageKey { get; set; }
}