# Create network
docker network create service-tier-1

# Start reverse proxy
docker run -d -p 80:80 --name nginx-proxy-1 -v /var/run/docker.sock:/tmp/docker.sock:ro jwilder/nginx-proxy
docker network connect service-tier-1 nginx-proxy-1