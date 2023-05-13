using FluentValidation.TestHelper;
using Server.Contracts.Requests;
using Server.Validators;
using Xunit;

namespace Server.UnitTests.Validators;

public class CreateTaskReqValidatorTests
{
    private readonly CreateTaskReqValidator _validator = new();

    [Theory]
    [InlineData(null)]
    [InlineData("")]
    [InlineData(" ")]
    public void Should_ReturnValidationError_WhenTitleIsNullOrWhiteSpace(string title)
    {
        // Arrange
        var model = new CreateTaskReq
        {
            Title = title
        };

        // Act
        var result = _validator.TestValidate(model);

        // Assert
        result.ShouldHaveValidationErrorFor(request => request.Title);
    }

    [Fact]
    public void Should_ReturnOk_WhenValidationPasses()
    {
        // Arrange
        var model = new CreateTaskReq
        {
            Title = "New task"
        };

        // Act
        var result = _validator.TestValidate(model);

        // Assert
        result.ShouldNotHaveAnyValidationErrors();
    }
}