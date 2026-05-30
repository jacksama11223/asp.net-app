#!/bin/bash
cd /home/opc/asp.net-app
docker run --rm --network aspnet-app_smartlms-net -v /home/opc/asp.net-app:/app -w /app/SmartLMS.Web mcr.microsoft.com/dotnet/sdk:8.0 bash -c 'dotnet tool install --global dotnet-ef && /root/.dotnet/tools/dotnet-ef database update --project ../SmartLMS.Data --startup-project . --connection "Server=db;Port=3306;Database=SmartLMS;User=root;Password=SmartLMS@2026_SecurePwd;"'
