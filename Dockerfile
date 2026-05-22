# Stage 1: Base Image với các thư viện native cho PDF (DinkToPdf)
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 8080
EXPOSE 8081

# ✅ Chỉ cài thư viện tối thiểu – KHÔNG cài wkhtmltopdf qua apt
# (wkhtmltopdf apt kéo theo 291 gói Qt/X11/GTK ~ 1.5GB, làm đầy đĩa VPS)
RUN apt-get update && apt-get install -y --no-install-recommends \
    libgdiplus \
    libx11-6 \
    libfontconfig1 \
    libxrender1 \
    libxext6 \
    fontconfig \
    ca-certificates \
    wget \
    && rm -rf /var/lib/apt/lists/*

# ✅ Tải wkhtmltopdf binary tĩnh (~87MB) thay vì apt (1.5GB)
RUN wget -q -O /tmp/wkhtmltopdf.deb \
    https://github.com/wkhtmltopdf/packaging/releases/download/0.12.6.1-3/wkhtmltox_0.12.6.1-3.bookworm_amd64.deb \
    && apt-get update && apt-get install -y --no-install-recommends /tmp/wkhtmltopdf.deb \
    && rm /tmp/wkhtmltopdf.deb \
    && rm -rf /var/lib/apt/lists/*

# Stage 2: SDK Image để Build mã nguồn
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src

# Copy các file dự án để Restore dependencies
COPY ["SmartLMS.Web/SmartLMS.Web.csproj", "SmartLMS.Web/"]
COPY ["SmartLMS.Business/SmartLMS.Business.csproj", "SmartLMS.Business/"]
COPY ["SmartLMS.Data/SmartLMS.Data.csproj", "SmartLMS.Data/"]
COPY ["SmartLMS.Models/SmartLMS.Models.csproj", "SmartLMS.Models/"]

RUN dotnet restore "./SmartLMS.Web/SmartLMS.Web.csproj"

# Copy toàn bộ mã nguồn và Build
COPY . .
WORKDIR "/src/SmartLMS.Web"
RUN dotnet build "./SmartLMS.Web.csproj" -c $BUILD_CONFIGURATION -o /app/build

# Stage 3: Publish ứng dụng
FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "./SmartLMS.Web.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

# Stage 4: Chạy ứng dụng (Production)
FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .

# Thiết lập biến môi trường mặc định (Có thể ghi đè bằng docker-compose)
ENV ASPNETCORE_URLS=http://+:8080
ENV ASPNETCORE_ENVIRONMENT=Production

ENTRYPOINT ["dotnet", "SmartLMS.Web.dll"]
