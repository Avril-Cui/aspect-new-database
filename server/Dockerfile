FROM python:3

WORKDIR /requests

ENV FLASK_APP = requests.py

COPY . .

RUN pip install -r requirement.txt

CMD [ "python", "requests.py" ]