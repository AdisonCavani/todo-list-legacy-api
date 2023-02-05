using FluentValidation;
using Server.Contracts.Requests;

namespace Server.Validators;

public class UpdateTaskReqValidator : AbstractValidator<UpdateTaskReq>
{
    public UpdateTaskReqValidator()
    {
        RuleFor(x => x.Id).NotEmpty();
    }
}