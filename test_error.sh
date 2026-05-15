#!/bin/bash
# test_error.sh
echo "=== KIỂM TRA DOCKER CONTAINERS ==="
docker ps -a --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"

echo -e "\n=== KIỂM TRA LOG CỦA NGINX / FRONTEND (ĐỂ XEM TẠI SAO BỊ 502) ==="
docker logs --tail 20 smartlms-frontend-prod

echo -e "\n=== KIỂM TRA LOG CỦA BACKEND ==="
docker logs --tail 20 aspnet-app-backend-1
