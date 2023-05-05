using System.Text.Json.Serialization;
using Amazon.Lambda.APIGatewayEvents;
using Server.Contracts.Dtos;
using Server.Contracts.Requests;
using Server.Contracts.Responses;
using Server.Database.Entities;

namespace Server;

// Entities
[JsonSerializable(typeof(TaskEntity))]

// Dtos
[JsonSerializable(typeof(TaskDto))]
[JsonSerializable(typeof(HealthCheckDto))]

// Requests
[JsonSerializable(typeof(CreateTaskReq))]
[JsonSerializable(typeof(UpdateTaskReq))]

// Responses
[JsonSerializable(typeof(HealthCheckRes))]
[JsonSerializable(typeof(PaginatedRes<TaskDto>))]
[JsonSerializable(typeof(HttpValidationProblemDetails))]

// AWS Lambda
[JsonSerializable(typeof(APIGatewayHttpApiV2ProxyRequest))]
[JsonSerializable(typeof(APIGatewayHttpApiV2ProxyResponse))]
public partial class SerializationContext : JsonSerializerContext
{
}