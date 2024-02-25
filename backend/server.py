import os
import urllib
from flask import Flask, request, send_from_directory

app = Flask(__name__, static_folder='../frontend/build')


# Route non-api requests to the frontend
@app.route("/", defaults={"path": ""})
@app.route('/<path:path>')
def serve(path):
    if path != "" and os.path.exists(app.static_folder + '/' + path):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')


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


if __name__ == '__main__':
  app.run(use_reloader=True, threaded=True, host='0.0.0.0', port=80)