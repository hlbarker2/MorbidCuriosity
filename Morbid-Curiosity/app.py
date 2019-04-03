import os

import pandas as pd
import numpy as np

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine

from flask import Flask, jsonify, render_template
from flask_sqlalchemy import SQLAlchemy

import tweets

app = Flask(__name__)


#################################################
# Database Setup
#################################################
# app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///db/gendermortality.sqlite"
# db = SQLAlchemy(app)

# # reflect an existing database into a new model
# Base = automap_base()
# # reflect the tables
# Base.prepare(db.engine, reflect=True)

# # Save references to each table
# genderData = Base.classes.cleangenderdeaths


@app.route("/")
def index():
    """Return the homepage."""
    return render_template("index.html")

@app.route("/about")
def about():
    """Return the about us page."""
    # perhaps I could use index and replace body content
    return render_template("about.html")

@app.route("/mortality")
def mortality():
    """Return mortality data"""
    # code here

@app.route("/tweets")
def cdctweets():
    """Return CDC twitter data"""
    return jsonify(tweets)

# do we need this
@app.route("/deathsbygender")
def gender():
    """Return summarized deaths by gender data"""
    df = pd.read_csv("../Datasets/cleangenderdeath.csv")
    return jsonify(list(df.columns)[2:])



if __name__ == "__main__":
    app.run()
