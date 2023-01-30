using FluentValidation;
using FluentValidation.AspNetCore;
using Server.Contracts.Requests;
using Server.Validators;

namespace Server.Startup;

public static class Validators
{
    public static void AddValidators(this IServiceCollection services)
    {
        services.AddFluentValidationAutoValidation();
        services.AddScoped<IValidator<CreatePostReq>, CreatePostReqValidator>();
        services.AddScoped<IValidator<GetPostReq>, GetPostReqValidator>();
        services.AddScoped<IValidator<UpdatePostReq>, UpdatePostReqValidator>();
        services.AddScoped<IValidator<PaginatedReq>, PaginatedReqValidator>();
    }
}