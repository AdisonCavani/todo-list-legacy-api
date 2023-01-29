namespace Server.Contracts.Requests;

public class UpdatePostReq
{
    public Guid Id { get; set; }
    public required string Code { get; set; }
    public LanguageEnum Language { get; set; }
    public ThemeEnum Theme { get; set; }
}