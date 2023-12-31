﻿namespace Server.Contracts;

public class ApiRoutes
{
    private const string BasePath = "/api";

    public const string Health = $"{BasePath}/health";
    public const string Tasks = $"{BasePath}/tasks";
}