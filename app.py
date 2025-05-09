# app.py

from flask import Flask, request, jsonify, render_template
from model import model  # <-- Import model from model.py

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/chat", methods=["POST"])
def chat():
    user_message = request.json.get("message")
    if not user_message:
        return jsonify({"error": "No message provided"}), 400
    
    response = model.invoke(user_message)
    return jsonify({"answer": response.content})

if __name__ == "__main__":
    app.run(debug=True)
