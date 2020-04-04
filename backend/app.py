from flask import Flask, render_template
from flask_restful import Api
from resources.data import Data, customerData, getData
from flask_cors import CORS
from flask_mysqldb import MySQL
from common.ma import ma
import sys, os, click

app = Flask(__name__)
api = Api(app)
app.config['PROPAGATE_EXCEPTIONS'] = True
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = ''
app.config['MYSQL_DB'] = 'db2'
CORS(app)

mysql = MySQL(app)

@app.route('/')
def index():
    return render_template('index.html')

# backend
api.add_resource(Data, '/data/')
api.add_resource(getData, '/getdata/')
api.add_resource(customerData, '/getalldata/')

if __name__ == "__main__":
    ma.init_app(app)
    app.run()