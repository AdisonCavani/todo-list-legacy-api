namespace Server.Contracts.Responses;

public class PaginatedRes<T>
{
    public IEnumerable<T> Data { get; set; } = Enumerable.Empty<T>();

    public int CurrentPage { get; set; }
    
    public int PageSize { get; set; }
    
    public int TotalPages { get; set; }
    
    public int TotalCount { get; set; }
}