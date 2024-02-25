from flask import Flask, request
import urllib


app = Flask(__name__)


@app.route('/api/echo', methods=['GET', 'POST'])
def echo():
    print("Received request")
    print("Request url params: ", request.args)
    print("Request body: ", request.data)
    return request.data


@app.route('/api/hello', methods=['GET', 'POST'])
def hello():
    print("Received request")
    print("Request url params: ", request.args)
    print("Request body: ", request.data)
    return {
        "message": "Hello, World!"
    }