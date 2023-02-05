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
        services.AddScoped<IValidator<CreateTaskReq>, CreateTaskReqValidator>();
        services.AddScoped<IValidator<GetTaskReq>, GetTaskReqValidator>();
        services.AddScoped<IValidator<UpdateTaskReq>, UpdateTaskReqValidator>();
        services.AddScoped<IValidator<PaginatedReq>, PaginatedReqValidator>();
    }
}