## Development

### Initialize local DynamoDB instance

```bash
docker-compose up -d
```

## Production

### Create DynamoDB table

```bash
aws cloudformation create-stack --stack-name todo-list-database --template-body file://dynamodb.yaml
```

### Deploy API to AWS Lambda

```bash
cd backend/Server
dotnet lambda deploy-function
```