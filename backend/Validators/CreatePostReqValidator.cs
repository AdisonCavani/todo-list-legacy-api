using FluentValidation;
using Server.Contracts.Requests;

namespace Server.Validators;

public class CreatePostReqValidator : AbstractValidator<CreatePostReq>
{
    public CreatePostReqValidator()
    {
        RuleFor(x => x.Code).NotEmpty();
        RuleFor(x => x.Theme).NotNull();
        RuleFor(x => x.Language).NotNull();
    }
}