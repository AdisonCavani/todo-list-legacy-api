using System.Text.Json;
using Amazon.DynamoDBv2.DocumentModel;
using Amazon.DynamoDBv2.Model;
using Server.Database.Entities;

namespace Server.Mappers;

public static class DynamoDbMapper
{
    public static Dictionary<string, AttributeValue> ToDict<T>(T item)
    {
        var itemAsJson = JsonSerializer.Serialize(item, SerializationContext.Default.TaskEntity);
        var itemAsDoc = Document.FromJson(itemAsJson);
        var itemAsAttrib = itemAsDoc.ToAttributeMap();

        return itemAsAttrib;
    }

    public static TaskEntity? FromDict(Dictionary<string, AttributeValue> item)
    {
        var itemAsDoc = Document.FromAttributeMap(item);
        var taskEntity = JsonSerializer.Deserialize(itemAsDoc.ToJson(), SerializationContext.Default.TaskEntity);

        return taskEntity;
    }
}