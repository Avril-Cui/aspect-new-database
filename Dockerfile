FROM node:16-alpine
ENV PYTHONUNBUFFERED=1
RUN apk add --update --no-cache python3 python3-dev py3-pip gcc gfortran g++ libgfortran openblas-dev openblas musl-dev linux-headers g++
WORKDIR /app
COPY . .

WORKDIR /app/client
RUN npm i next
RUN npm run build

WORKDIR /app/server
ENV FLASK_APP = requests.py
RUN pip install -r requirement.txt
CMD [ "python", "requests.py" ]