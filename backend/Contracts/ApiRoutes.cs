namespace Server.Contracts;

public class ApiRoutes
{
    private const string BasePath = "/api";

    public const string Health = $"{BasePath}/health";

    public static class Task
    {
        private const string Endpoint = $"{BasePath}/task";

        public const string Create = $"{Endpoint}/create";
        public const string Delete = $"{Endpoint}/delete";
        public const string Get = $"{Endpoint}/get";
        public const string List = $"{Endpoint}/list";
        public const string Update = $"{Endpoint}/update";
    }
}