namespace Server.Contracts.Responses;

public class PaginatedRes<T>
{
    public IEnumerable<T> Data { get; set; } = Enumerable.Empty<T>();

    public int Page { get; set; }
    
    public int PageSize { get; set; }
}