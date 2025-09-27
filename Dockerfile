FROM python:3.12-slim-bookworm

ENV PYTHONWRITEBYTECODE 1
ENV PYTHONBUFFERED 1

# To install github private repositories
RUN apt-get update && apt-get install -y git


RUN mkdir api
WORKDIR /api

RUN mkdir app

# Install dependencies
COPY Pipfile* app/
RUN pip install pipenv && pipenv install --system --deploy

# copy project
COPY app app

ENV TZ="UTC"

# CMD exec fastapi dev main.py
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]