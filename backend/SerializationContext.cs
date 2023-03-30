using System.Text.Json.Serialization;
using Amazon.Lambda.APIGatewayEvents;
using Server.Contracts.Dtos;
using Server.Contracts.Requests;
using Server.Contracts.Responses;

namespace Server;

// Dtos
[JsonSerializable(typeof(HealthCheckDto))]
[JsonSerializable(typeof(TaskDto))]

// Requests
[JsonSerializable(typeof(CreateTaskReq))]
[JsonSerializable(typeof(PaginatedReq))]
[JsonSerializable(typeof(UpdateTaskReq))]

// Responses
[JsonSerializable(typeof(HealthCheckRes))]
[JsonSerializable(typeof(PaginatedRes<TaskDto>))]

// AWS Lambda
[JsonSerializable(typeof(APIGatewayHttpApiV2ProxyRequest))]
[JsonSerializable(typeof(APIGatewayHttpApiV2ProxyResponse))]
public partial class SerializationContext : JsonSerializerContext
{
}