#
# All applications' containers
# Set of tasks related to the starting up and shutting down of the containers of all applications.
#
# Startup
startup-db:
	docker-compose up --build -d db

# Shutdown
shutdown-db:
	docker-compose down -v --rmi local db
