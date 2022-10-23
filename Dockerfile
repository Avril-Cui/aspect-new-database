FROM node:16-alpine
ENV PYTHONUNBUFFERED=1
RUN apk add --update --no-cache python3 py3-pip
WORKDIR /app
COPY . .

WORKDIR /app/client
RUN npm run build

WORKDIR /app/server
ENV FLASK_APP = requests.py
RUN pip install -r requirement.txt
CMD [ "python", "requests.py" ]