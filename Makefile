DEP = deploy/

up:
	cd ${DEP} && docker-compose up --build -d && docker-compose logs -f --tail 500
