using FluentValidation;
using Server.Contracts.Requests;

namespace Server.Validators;

public class PaginatedReqValidator : AbstractValidator<PaginatedReq>
{
    public PaginatedReqValidator()
    {
        RuleFor(x => x.PageSize).NotNull().GreaterThanOrEqualTo(5).LessThanOrEqualTo(100);
        RuleFor(x => x.PageKey).Custom((value, context) =>
        {
            if (value is null)
                return;
            
            if (string.IsNullOrWhiteSpace(value))
                context.AddFailure("Empty or whitespace string is not allowed"); 

            var buffer = new Span<byte>(new byte[value.Length]);
            
            if (!Convert.TryFromBase64String(value, buffer , out _))
                context.AddFailure("Not a Base-64 string");
        });
    }
}