using FluentValidation;
using Server.Contracts.Requests;

namespace Server.Validators;

public class CreateTaskReqValidator : AbstractValidator<CreateTaskReq>
{
    public CreateTaskReqValidator()
    {
        RuleFor(x => x.Title).NotEmpty();
    }
}