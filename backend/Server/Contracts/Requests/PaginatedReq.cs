namespace Server.Contracts.Requests;

public class PaginatedReq
{
    public string? PageKey { get; set; }
    
    public int PageSize { get; set; }
}