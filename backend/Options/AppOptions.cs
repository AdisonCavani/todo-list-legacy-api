using System.ComponentModel.DataAnnotations;

namespace Server.Options;

public class AppOptions : IBaseOptions
{
    public const string SectionName = "App";

    [Required] public string CognitoIssuer { get; init; } = default!;
    
    [Required]
    public string CorsOrigin { get; init; } = default!;
    
    [Required]
    public string SqlConnectionString { get; init; } = default!;
}