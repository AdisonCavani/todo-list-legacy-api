using FluentValidation;
using Server.Contracts.Requests;

namespace Server.Validators;

public class GetTaskReqValidator : AbstractValidator<GetTaskReq>
{
    public GetTaskReqValidator()
    {
        RuleFor(x => x.Id).NotEmpty();
    }
}