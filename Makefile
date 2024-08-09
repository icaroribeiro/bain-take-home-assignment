#
# All applications' containers
# Set of tasks related to the starting up and shutting down of the containers of all applications.
#
# Startup
startup-db:
	docker-compose up --build -d db

startup-backend:
	docker-compose up --build -d backend

# Shutdown
shutdown-db:
	docker-compose down -v --rmi local db

shutdown-backend:
	docker-compose down -v --rmi local backend
