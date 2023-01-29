namespace Server.Contracts.Requests;

public class CreatePostReq
{
    public required string Code { get; set; }
    public LanguageEnum Language { get; set; }
    public ThemeEnum Theme { get; set; }
}