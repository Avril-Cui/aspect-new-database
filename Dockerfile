FROM node:16-alpine
ENV PYTHONUNBUFFERED=1
RUN apk add --update --no-cache python3 python3-dev py3-pip gcc gfortran g++ libgfortran openblas-dev openblas musl-dev linux-headers g++

WORKDIR /app/server
COPY server/requirement.txt server/
RUN pip --disable-pip-version-check install --no-compile -r server/requirement.txt

WORKDIR /app
COPY . .

WORKDIR /app/client
RUN npm i next
RUN npm run build

RUN pip install urllib3
RUN pip3 install pyrebase
WORKDIR /app/server
ENV FLASK_APP = rest_api.py
CMD [ "python", "rest_api.py" ]