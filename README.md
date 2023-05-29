# To-Do List App
[![Vercel](https://therealsujitk-vercel-badge.vercel.app/?app=todo-list)](https://todo.k1ng.dev)
[![Storybook](https://api.netlify.com/api/v1/badges/56f0a50f-291d-4b20-a038-45890ebafbf6/deploy-status)](https://storybook.todo.k1ng.dev)
[![.NET](https://github.com/AdisonCavani/todo-list/actions/workflows/dotnet.yml/badge.svg?branch=master)](https://github.com/AdisonCavani/todo-list/actions/workflows/dotnet.yml)
[![Deploy AWS Lambda](https://github.com/AdisonCavani/todo-list/actions/workflows/deploy.yml/badge.svg?branch=master)](https://github.com/AdisonCavani/todo-list/actions/workflows/deploy.yml)

This app is still WIP. Expect bugs!  
If you found any - open new issue.

## Features
- ✅ 100 Lighthouse score
- 💨 Optimistic updates
- 🛠️ Next.js 13 app directory
- 🔑 Serverless REST API
- 🌗 Light & dark theme
- 📱 Progressive Web App
- ♥️ [Status page](https://todo.k1ng.dev/health) - health check
- 🙍‍♂️ AWS Cognito & Google OAuth 2.0 login
- 📈 Self-hosted Plausible Analytics
- 📕 Storybook - on [storybook.todo.k1ng.dev](https://storybook.todo.k1ng.dev)

## Architecture

### Frontend:
- **Language**: [TypeScript](https://www.typescriptlang.org)
- **Framework**: [Next.js](https://nextjs.org)
- **Library**: [React.js](https://reactjs.org)
- **CSS**: [Tailwind CSS](https://tailwindcss.com)
- **UI Library**: [Radix UI](https://www.radix-ui.com)
- **UI Components** [shadcn/ui](https://ui.shadcn.com)
- **Fetching**: [React Query](https://tanstack.com/query/latest)
- **Auth**: [Auth.js (NextAuth.js)](https://next-auth.js.org)
- **Auth providers**: [AWS Cognito](https://aws.amazon.com/cognito) & [Google](https://developers.google.com/identity/protocols/oauth2)

### Backend:
- **Language**: [C# .NET](https://learn.microsoft.com/dotnet/csharp)
- **Framework**: [ASP.NET](https://www.asp.net)
- **Database**: [AWS DynamoDb](https://aws.amazon.com/dynamodb)
- **Validation**: [FluentValidation](https://fluentvalidation.net)
- **Mapper**: Manual mapping

## Pictures

![App flow](./docs/app-light.webp#gh-light-mode-only)
![App flow](./docs/app-dark.webp#gh-dark-mode-only)
