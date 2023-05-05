using FluentValidation.TestHelper;
using Server.Contracts.Requests;
using Server.Validators;
using Xunit;

namespace Server.UnitTests.Validators;

public class CreateTaskReqValidatorTests
{
    private readonly CreateTaskReqValidator _validator = new();

    [Fact]
    public void WhenTitleNull_ReturnsValidationError()
    {
        // Arrange
        var model = new CreateTaskReq();

        // Act
        var result = _validator.TestValidate(model);

        // Assert
        result.ShouldHaveValidationErrorFor(request => request.Title);
    }
    
    [Fact]
    public void WhenTitleEmpty_ReturnsValidationError()
    {
        // Arrange
        var model = new CreateTaskReq
        {
            Title = string.Empty
        };

        // Act
        var result = _validator.TestValidate(model);

        // Assert
        result.ShouldHaveValidationErrorFor(request => request.Title);
    }
    
    [Fact]
    public void WhenTitleWhitespace_ReturnsValidationError()
    {
        // Arrange
        var model = new CreateTaskReq
        {
            Title = "   "
        };

        // Act
        var result = _validator.TestValidate(model);

        // Assert
        result.ShouldHaveValidationErrorFor(request => request.Title);
    }
    
    [Fact]
    public void WhenOk_ReturnsOk()
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