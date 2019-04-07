import os

import pandas as pd
import numpy as np

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine

from flask import Flask, jsonify, render_template
from flask_sqlalchemy import SQLAlchemy

from config import remote_db_endpoint, remote_db_port
from config import remote_morbid_dbname, remote_morbid_dbuser, remote_morbid_dbpwd

import tweets

app = Flask(__name__)


#################################################
# Database Setup
#################################################
pymysql.install_as_MySQLdb()

engine = create_engine(f"mysql://{remote_morbid_dbuser}:{remote_morbid_dbpwd}@{remote_db_endpoint}:{remote_db_port}/{remote_morbid_dbname}")
conn = engine.connect()

@app.route("/")
def index():
    """Return the homepage."""
    return render_template("index.html")

@app.route("/process")
def about():
    """Return the detail page."""
    # this page is where we explain the project process
    return render_template("detail.html")


@app.route("/denseData")
def dense():
    """Return density data"""
    data_df = pd.read_sql("SELECT * FROM density", conn)
    df = pd.DataFrame(data_df, columns=['Density', 'Percent', 'Cause of Death', 'Deaths', 'Population', 'Rate per 100k'])
    return jsonify(df.to_dict(orient="records"))


@app.route("/genderData")
def gender():
    """Return gender data"""

    data_df = pd.read_sql("SELECT * FROM gender", conn)
    df = pd.DataFrame(data_df, columns=['Gender', 'Cause of Death', 'Deaths', 'Population', 'Rate per 1000', 'Percent'])
    return jsonify(df.to_dict(orient="records"))


@app.route("/sviData")
def sviData():
    """Return svi and life expectancy data"""

    data_df = pd.read_sql("SELECT * FROM sviLife", conn)
    df = pd.DataFrame(data_df, columns=["FIPS","Location","Life Expectancy","RPL_THEMES","RPL_THEME1","RPL_THEME2","RPL_THEME3","RPL_THEME4"])
    return jsonify(df.to_dict(orient="records"))


@app.route("/tweets")
def cdctweets():
    """Return CDC twitter data"""
    return jsonify(tweets)


if __name__ == "__main__":
    app.run()





## Screenshot of code



