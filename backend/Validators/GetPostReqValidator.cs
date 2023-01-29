using FluentValidation;
using Server.Contracts.Requests;

namespace Server.Validators;

public class GetPostReqValidator : AbstractValidator<GetPostReq>
{
    public GetPostReqValidator()
    {
        RuleFor(x => x.Id).NotEmpty();
    }
}