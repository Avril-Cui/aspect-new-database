FROM node:16-buster
ENV PYTHONUNBUFFERED=1
RUN apt update
RUN apt install -y --no-install-recommends python3.7-minimal python3.7 
RUN apt install -y --no-install-recommends python3.7-numpy python3-pandas python3-pip
RUN apt install -y python3-setuptools

WORKDIR /app/server
COPY server/requirement.txt server/
RUN pip3 install --upgrade pip
RUN pip3 install -r server/requirement.txt

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