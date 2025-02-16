from flask import Flask
from api.ollama import ollama_api

app = Flask(__name__)
app.register_blueprint(ollama_api, url_prefix='/api/ollama') 

if __name__ == '__main__':
    app.run(debug=True)
