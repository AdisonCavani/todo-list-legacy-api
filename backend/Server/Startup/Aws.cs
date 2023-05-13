using Amazon.Lambda.Serialization.SystemTextJson;

namespace Server.Startup;

public static class Aws
{
    public static void AddAwsServices(this IServiceCollection services)
    {
        services.ConfigureHttpJsonOptions(options => options.SerializerOptions.AddContext<SerializationContext>());
        services.AddAWSLambdaHosting(LambdaEventSource.HttpApi,
            options => { options.Serializer = new SourceGeneratorLambdaJsonSerializer<SerializationContext>(); });
    }
}