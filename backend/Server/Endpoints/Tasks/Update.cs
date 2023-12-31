﻿using System.Diagnostics.CodeAnalysis;
using System.Security.Claims;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.JsonWebTokens;
using Microsoft.OpenApi.Models;
using Server.Contracts.Dtos;
using Server.Contracts.Requests;
using Server.Repositories;

namespace Server.Endpoints.Tasks;

public static class Update
{
    internal static async Task<Results<StatusCodeHttpResult, NotFound, Ok<TaskDto>>> HandleAsync(
        [FromBody] UpdateTaskReq req,
        HttpContext context,
        ITaskRepository repo,
        CancellationToken ct = default)
    {
        var userId = context.User.FindFirstValue(ClaimTypes.Email)
                     ?? context.User.FindFirstValue(JwtRegisteredClaimNames.Email);

        if (userId is null)
            return TypedResults.StatusCode(StatusCodes.Status500InternalServerError);

        var response = await repo.UpdateAsync(req, userId, ct);

        if (response is null)
            return TypedResults.NotFound();

        return TypedResults.Ok(response);
    }

    [ExcludeFromCodeCoverage]
    internal static OpenApiOperation OpenApi(OpenApiOperation operation)
    {
        operation.Summary = "Update Task by id";

        return operation;
    }
}