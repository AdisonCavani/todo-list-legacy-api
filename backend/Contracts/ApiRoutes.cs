namespace Server.Contracts;

public class ApiRoutes
{
    private const string BasePath = "/api";

    public const string Health = $"{BasePath}/health";

    public static class Post
    {
        private const string Endpoint = $"{BasePath}/post";

        public const string Create = $"{Endpoint}/create";
        public const string Get = $"{Endpoint}/get";
        public const string GetAll = $"{Endpoint}/getAll";
        public const string Update = $"{Endpoint}/update";
    }
}