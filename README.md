# This repo contains the code and presentation for the ETL project of the Data Analysis Bootcamp.

We gathered beer information from two different sources and built a database.

Tha database was implemented in postgresql and looks like the following diagram:


![Beer data base](SQL/final_erd.png)

## To use it:

#### 1.- Create a data named Beer_DB in postgresql
#### 2.- Execute the queries defined at SQL/final.sql
#### 3.- Update the file config.py with the postgresql credentials
#### 4.- Execute beer_etl_app.ipynb to populate the data-base

#### Optional

#### 1.- If you want to run the JSON data collector, enter your key in api_keys.py and execute beer_api.ipynb

## Requierements:

### Before trying to execute the code make sure you have the following packages installed in python:

#### 1.- psycopg2

### The repo is divided into the following sections:

#### 1.- SQL:
     Contain the ERD and the SQL queries to build the tables in postgresql
        
#### 2.- JSON:
     Contains the code used to get the data from brewerydb.com and export it as csv file

#### 3.- beer_reviews.csv:
     CSV data that contains the review data

#### 4.- config.py:
![#f03c15](https://placehold.it/15/f03c15/000000?text=+) `Make sure to update this file with your database credentials`
        
    Credentials to connect to the local postgresql database

#### 5.- ETL Project Write Up.docx
     Report for the project

#### 6.- beer_etl_app.ipynb:
     Main application that fetches the csv data and processes it to populate the database
