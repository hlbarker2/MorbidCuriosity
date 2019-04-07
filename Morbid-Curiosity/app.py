import os

import pandas as pd
import numpy as np

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine
import pymysql

pymysql.install_as_MySQLdb()

from flask import Flask, jsonify, render_template
from flask_sqlalchemy import SQLAlchemy
#from config import remote_db_endpoint, remote_db_port
#from config import remote_morbid_dbname, remote_morbid_dbuser, remote_morbid_dbpwd

app = Flask(__name__)


remote_db_endpoint = "morbid.cu97gshsimlg.us-east-1.rds.amazonaws.com"
remote_db_port = 3306
remote_morbid_dbname = "morbid"
remote_morbid_dbuser = "root"
remote_morbid_dbpwd = "Morbid123"

#################################################
# Database Setup
#################################################

engine = create_engine(f"mysql://{remote_morbid_dbuser}:{remote_morbid_dbpwd}@{remote_db_endpoint}:{remote_db_port}/{remote_morbid_dbname}")
conn = engine.connect()

@app.route("/")
def index():
    """Return the homepage."""
    return render_template("index.html")


# @app.route("/datatest")
# def names():
#     """Return mortality data"""

#     data_df = pd.read_sql("SELECT * FROM density", conn)
#     data_json = data_df.to_json(orient="records")
#     return data_json

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

    data_df = pd.read_sql("SELECT * FROM sviLife ORDER BY RAND() LIMIT 500", conn)
    df = pd.DataFrame(data_df, columns=["FIPS","Location","Life_Expectancy","RPL_THEMES","RPL_THEME1","RPL_THEME2","RPL_THEME3","RPL_THEME4"])
    return df.to_json()

# ################
# @app.route("/metadata/<sample>")
# def sample_metadata(sample):
#     """Return the MetaData for a given sample."""
#     sel = [
#         Samples_Metadata.sample,
#         Samples_Metadata.ETHNICITY,
#         Samples_Metadata.GENDER,
#         Samples_Metadata.AGE,
#         Samples_Metadata.LOCATION,
#         Samples_Metadata.BBTYPE,
#         Samples_Metadata.WFREQ,
#     ]

#     results = db.session.query(*sel).filter(Samples_Metadata.sample == sample).all()

#     # Create a dictionary entry for each row of metadata information
#     sample_metadata = {}
#     for result in results:
#         sample_metadata["Sample"] = result[0]
#         sample_metadata["Ethnicity"] = result[1]
#         sample_metadata["Gender"] = result[2]
#         sample_metadata["Age"] = result[3]
#         sample_metadata["Location"] = result[4]
#         sample_metadata["BB Type"] = result[5]
#         sample_metadata["Wash Freq"] = result[6]

#     print(sample_metadata)
#     return jsonify(sample_metadata)


# @app.route("/samples/<sample>")
# def samples(sample):
#     """Return `otu_ids`, `otu_labels`,and `sample_values`."""
#     stmt = db.session.query(Samples).statement
#     df = pd.read_sql_query(stmt, db.session.bind)

#     # Filter the data based on the sample number and
#     # only keep rows with values above 1
#     sample_data = df.loc[df[sample] > 1, ["otu_id", "otu_label", sample]]
#     # Format the data to send as json
#     data = {
#         "otu_ids": sample_data.otu_id.values.tolist(),
#         "sample_values": sample_data[sample].values.tolist(),
#         "otu_labels": sample_data.otu_label.tolist(),
#     }
#     print(data)
#     return jsonify(data)

if __name__ == "__main__":
    app.run()
