#
# All applications' containers
# Set of tasks related to the starting up and shutting down of the containers of all applications.
#
# Startup
startup-all:
	docker-compose up --build -d

startup-db:
	docker-compose up --build -d db

startup-frontend:
	docker-compose up --build -d frontend

startup-backend:
	docker-compose up --build -d backend

# Shutdown
shutdown-all:
	docker-compose down -v --rmi all

shutdown-frontend:
	docker-compose down -v --rmi local frontend

shutdown-db:
	docker-compose down -v --rmi local db

shutdown-backend:
	docker-compose down -v --rmi local backend
