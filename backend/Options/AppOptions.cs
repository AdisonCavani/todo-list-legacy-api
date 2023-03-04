using System.ComponentModel.DataAnnotations;

namespace Server.Options;

public class AppOptions : IBaseOptions
{
    public const string SectionName = "App";
    
    [Required]
    public required string CognitoIssuer { get; init; }
    
    [Required]
    public required string SqlConnectionString { get; init; }
}