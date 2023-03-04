using System.ComponentModel.DataAnnotations;

namespace Server.Options;

public static class Validation
{
    public static void Validate(this IBaseOptions baseOptions)
    {
        var context = new ValidationContext(baseOptions, serviceProvider: null, items: null);
        var results = new List<ValidationResult>();

        if (!Validator.TryValidateObject(baseOptions, context, results, true))
            foreach (var validationResult in results)
                throw new ValidationException(validationResult.ErrorMessage);
    }
}