using FluentValidation;
using Server.Contracts.Requests;

namespace Server.Validators;

public class PaginatedReqValidator : AbstractValidator<PaginatedReq>
{
    public PaginatedReqValidator()
    {
        RuleFor(x => x.Page).NotNull().GreaterThanOrEqualTo(1);
        RuleFor(x => x.PageSize).NotNull().GreaterThanOrEqualTo(5).LessThanOrEqualTo(100);
    }
}