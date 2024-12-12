#!/bin/bash
set -o errexit
set -o pipefail
set -o nounset

echo "----- Collect static files ------ " 
python manage.py collectstatic --noinput

echo "----------- Apply migration --------- "
python manage.py migrate --noinput

echo "----------- Create superuser --------- "
python manage.py makesuperuser

echo "-------------------- Starting the server --------------------"
exec uvicorn src.asgi:application --host 0.0.0.0 --port 5000 --reload --reload-include '*.html'



