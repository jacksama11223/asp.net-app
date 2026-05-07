FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
USER app
WORKDIR /app
EXPOSE 8080

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY ["SmartLMS.Community/SmartLMS.Community/SmartLMS.Community.csproj", "SmartLMS.Community/SmartLMS.Community/"]
COPY ["SmartLMS.Community/SmartLMS.Models/SmartLMS.Models.csproj", "SmartLMS.Community/SmartLMS.Models/"]
COPY ["SmartLMS.Community/SmartLMS.Data/SmartLMS.Data.csproj", "SmartLMS.Community/SmartLMS.Data/"]
COPY ["SmartLMS.Community/SmartLMS.Business/SmartLMS.Business.csproj", "SmartLMS.Community/SmartLMS.Business/"]
RUN dotnet restore "./SmartLMS.Community/SmartLMS.Community/SmartLMS.Community.csproj"
COPY . .
WORKDIR "/src/SmartLMS.Community/SmartLMS.Community"
RUN dotnet build "./SmartLMS.Community.csproj" -c $BUILD_CONFIGURATION -o /app/build

FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "./SmartLMS.Community.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "SmartLMS.Community.dll"]
