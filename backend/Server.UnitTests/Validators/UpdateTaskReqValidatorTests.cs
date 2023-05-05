using FluentValidation.TestHelper;
using Server.Contracts.Requests;
using Server.Validators;
using Xunit;

namespace Server.UnitTests.Validators;

public class UpdateTaskReqValidatorTests
{
    private readonly UpdateTaskReqValidator _validator = new();

    [Fact]
    public void WhenAllNull_ReturnsValidationError()
    {
        // Arrange
        var model = new UpdateTaskReq();

        // Act
        var result = _validator.TestValidate(model);

        // Assert
        result.ShouldHaveValidationErrorFor(request => request.Id);
        result.ShouldHaveValidationErrorFor(request => request.Title);
    }

    [Fact]
    public void WhenIdNull_ReturnsValidationError()
    {
        // Arrange
        var model = new UpdateTaskReq
        {
            Title = "New task"
        };

        // Act
        var result = _validator.TestValidate(model);

        // Assert
        result.ShouldHaveValidationErrorFor(request => request.Id);
    }
    
    [Fact]
    public void WhenTitleNull_ReturnsValidationError()
    {
        // Arrange
        var model = new UpdateTaskReq
        {
            Id = Guid.NewGuid()
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
        var model = new UpdateTaskReq
        {
            Id = Guid.NewGuid(),
            Title = "New task"
        };

        // Act
        var result = _validator.TestValidate(model);

        // Assert
        result.ShouldNotHaveAnyValidationErrors();
    }
}