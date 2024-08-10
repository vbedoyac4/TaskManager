# Use the official .NET SDK image as the build environment
FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build

# Set the working directory
WORKDIR /app

# Copy the project file and restore dependencies
COPY *.csproj ./
RUN dotnet restore

# Copy the rest of the application and build it
COPY . ./
RUN dotnet build -c Release -o /app/build

# Publish the application to the /app/publish directory
RUN dotnet publish -c Release -o /app/publish

# Use the official .NET runtime image as the runtime environment
FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS runtime

# Set the working directory
WORKDIR /app

# Copy the published application from the build environment
COPY --from=build /app/publish .

# Set the entry point for the application
ENTRYPOINT ["dotnet", "TaskManagerBackend.dll"]

# Expose the port the app runs on
EXPOSE 80
