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

// Requests
[JsonSerializable(typeof(CreateTaskReq))]
[JsonSerializable(typeof(PaginatedReq))]
[JsonSerializable(typeof(UpdateTaskReq))]

// Responses
[JsonSerializable(typeof(PaginatedRes<TaskDto>))]

// AWS Lambda
[JsonSerializable(typeof(APIGatewayHttpApiV2ProxyRequest))]
[JsonSerializable(typeof(APIGatewayHttpApiV2ProxyResponse))]
public partial class SerializationContext : JsonSerializerContext
{
}