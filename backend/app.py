from flask import Flask, render_template, flash, redirect, url_for, session, request, logging, send_from_directory
from flask_restful import Api
from resources.data import Data,customerData,getData
from flask_cors import CORS

app = Flask(__name__)
api = Api(app)
app.config['PROPAGATE_EXCEPTIONS'] = True

CORS(app)

@app.route('/')
def index():
    return render_template('index.html')
#
#
#backend
api.add_resource(Data,'/data/')
api.add_resource(getData,'/getdata/')
api.add_resource(customerData,'/getalldata/')
#
#
#
if __name__ == "__main__":
    app.run()