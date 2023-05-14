using System.Security.Claims;
using Microsoft.AspNetCore.Http;

namespace Server.Tests.Unit;

public static class Helpers
{
    internal const string UserId = "user@example.com";

    internal static readonly HttpContext ValidHttpContext = new DefaultHttpContext
    {
        User = new ClaimsPrincipal(new List<ClaimsIdentity>
        {
            new(new List<Claim>
            {
                new(ClaimTypes.Email, UserId)
            })
        })
    };
}