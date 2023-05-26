namespace Server.Tests.Integration.Helpers;

[CollectionDefinition(Name)]
public class SharedTestCollection : ICollectionFixture<TasksApiFactory>
{
    public const string Name = "Test collection";
}