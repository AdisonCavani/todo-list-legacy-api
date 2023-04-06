using FluentValidation;

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

        if (validatable is null)
            throw new Exception($"{nameof(T)} does not register a validator");

        var validationResult = await _validator.ValidateAsync(validatable);

        if (!validationResult.IsValid)
            return Results.ValidationProblem(validationResult.ToDictionary());
        
        return await next(context);
    }
}