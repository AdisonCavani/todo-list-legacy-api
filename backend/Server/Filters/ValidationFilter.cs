﻿using FluentValidation;

namespace Server.Filters;

public class ValidationFilter<T> : IEndpointFilter where T : class
{
    private readonly IValidator<T> _validator;

    public ValidationFilter(IValidator<T> validator)
    {
        _validator = validator;
    }

    public async ValueTask<object?> InvokeAsync(EndpointFilterInvocationContext context, EndpointFilterDelegate next)
    {
        var validatable = context.GetArgument<T>(0);
        var validator = context.HttpContext.RequestServices.GetService<IValidator<T>>();

        if (validator is not null)
        {
            var validationResult = await _validator.ValidateAsync(validatable);

            if (!validationResult.IsValid)
                return Results.ValidationProblem(validationResult.ToDictionary());
        }

        return await next.Invoke(context);
    }
}