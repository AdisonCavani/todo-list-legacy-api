namespace Server.Contracts.Requests;

public class PaginatedReq
{
    public int Page { get; set; }
    
    public int PageSize { get; set; }
}