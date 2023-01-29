using FluentValidation;
using Server.Contracts.Requests;

namespace Server.Validators;

public class UpdatePostReqValidator : AbstractValidator<UpdatePostReq>
{
    public UpdatePostReqValidator()
    {
        RuleFor(x => x.Id).NotEmpty();
        RuleFor(x => x.Code).NotEmpty();
        RuleFor(x => x.Theme).NotNull();
        RuleFor(x => x.Language).NotNull();
    }
}