BASE_SITE=do1819.02.com

# development
export NODE_ENV=development
export PORT=8078
export DBPORT=27022
export VIRTUAL_HOST=$NODE_ENV.$BASE_SITE
docker-compose -p $VIRTUAL_HOST down

# production
export NODE_ENV=production
export PORT=8071
export DBPORT=27011
export VIRTUAL_HOST=$BASE_SITE
docker-compose -p $VIRTUAL_HOST down 

bash teardown.sh