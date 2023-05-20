using FluentValidation.TestHelper;
using Server.Contracts.Requests;
using Server.Validators;
using Xunit;

namespace Server.Tests.Unit.Validators;

public class PaginatedReqValidatorTests
{
    private readonly PaginatedReqValidator _validator = new();
    
    [Theory]
    [InlineData(0)]
    [InlineData(3)]
    [InlineData(500)]
    public void Should_ReturnValidationError_WhenPageSizeIsOutOfRange(int pageSize)
    {
        // Arrange
        var model = new PaginatedReq
        {
            PageSize = pageSize
        };

        // Act
        var result = _validator.TestValidate(model);

        // Assert
        result.ShouldHaveValidationErrorFor(request => request.PageSize);
    }
    
    [Theory]
    [InlineData("")]
    [InlineData(" ")]
    [InlineData("invalidPageKey")]
    public void Should_ReturnValidationError_WhenPageKeyIsNotBase64(string pageKey)
    {
        // Arrange
        var model = new PaginatedReq
        {
            PageSize = 10,
            PageKey = pageKey
        };

        // Act
        var result = _validator.TestValidate(model);

        // Assert
        result.ShouldHaveValidationErrorFor(request => request.PageKey);
    }

    [Theory]
    [ClassData(typeof(ValidData))]
    public void Should_ReturnOk_WhenValidationPasses(int pageSize, string? pageKey)
    {
        // Arrange
        var model = new PaginatedReq
        {
            PageSize = pageSize,
            PageKey = pageKey
        };

        // Act
        var result = _validator.TestValidate(model);

        // Assert
        result.ShouldNotHaveAnyValidationErrors();
    }
}

public class ValidData : TheoryData<int, string?>
{
    public ValidData()
    {
        Add(5, null);
        Add(100, null);
        
        Add(5, Convert.ToBase64String(Guid.NewGuid().ToByteArray()));
        Add(100, Convert.ToBase64String(Guid.NewGuid().ToByteArray()));
    }
}