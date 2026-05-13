FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 8080

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copy các dự án thư viện lõi và dự án Community
COPY ["SmartLMS.Models/SmartLMS.Models.csproj", "SmartLMS.Models/"]
COPY ["SmartLMS.Data/SmartLMS.Data.csproj", "SmartLMS.Data/"]
COPY ["SmartLMS.Business/SmartLMS.Business.csproj", "SmartLMS.Business/"]
COPY ["asp.net-group/SmartLMS.Community/SmartLMS.Community.csproj", "asp.net-group/SmartLMS.Community/"]

# Restore các dependencies
RUN dotnet restore "asp.net-group/SmartLMS.Community/SmartLMS.Community.csproj"

# Copy toàn bộ mã nguồn
COPY . .

# Build dự án Community
WORKDIR "/src/asp.net-group/SmartLMS.Community"
RUN dotnet build "SmartLMS.Community.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "SmartLMS.Community.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "SmartLMS.Community.dll"]
