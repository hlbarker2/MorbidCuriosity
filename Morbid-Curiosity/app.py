import os

import pandas as pd
import numpy as np

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine

from flask import Flask, jsonify, render_template
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)


#################################################
# Database Setup
#################################################

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///db/gendermortality.sqlite"
db = SQLAlchemy(app)

# # reflect an existing database into a new model
Base = automap_base()
# # reflect the tables
Base.prepare(db.engine, reflect=True)

# # Save references to each table
genderData = Base.classes.cleangenderdeaths


@app.route("/")
def index():
    """Return the homepage."""
    return render_template("index.html")

@app.route("/about")
def index():
    """Return the about us page."""
    return render_template("about.html")


# @app.route("/mortality")
# def mortality():
#     """Return mortality data"""

    # Use Pandas to perform the sql query
    # stmt = db.session.query(Samples).statement
    # df = pd.read_sql_query(stmt, db.session.bind)

    # Return a list of the column names (sample names)
    # return jsonify(list(df.columns)[2:])


@app.route("/deathsbygender")
def gender():
    """Return summarized deaths by gender data"""
    df = pd.read_csv("../Datasets/cleangenderdeath.csv")
    return jsonify(list(df.columns)[2:])



if __name__ == "__main__":
    app.run()
