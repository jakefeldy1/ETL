# import necessary libraries
from flask import Flask, render_template, redirect, jsonify
from flask_pymongo import PyMongo
import json

# create instance of Flask app
app = Flask(__name__)

# create route that renders index.html template
@app.route("/")
def home():
    # Find one record of data from the mongo database
    pet_data = "data"
    # Return template and data
    return render_template("index.html", petData = pet_data)

@app.route("/apa")
def apa():
    return render_template("apa.html")


if __name__ == "__main__":
    app.run(debug=True)
