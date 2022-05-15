from flask import Flask
from datetime import datetime
import redis
import os
from dotenv import load_dotenv
import json

load_dotenv()  # take environment variables from .env.


app = Flask("app")

@app.route("/")
def index():
	return "This is the backend for the chat-service. Try '/users', '/rooms/<user_id>', and '/room/<room_id>/messages'"

@app.route("/users")
def get_online_users():
   return "This will get a JSON of all the users online"

@app.route("/rooms/<user_id>")
def get_rooms_for_user_id(user_id=0):
    return "This will return a JSON of the private rooms a specific user has - one for each unique conversation"

@app.route("/room/<room_id>/messages", methods=["GET"])
def get_messages_for_selected_room(room_id="0"):
    return "This will return a JSON of all the messages in a specific room_id e.g. between users 1 and 2: '1:2'"

@app.route("/room/<room_id>/messages", methods=["POST"])
def post_messages_to_selected_room(room_id="0"):
    return "This will post a new message to a specific room"


if __name__ == '__main__':
	# Connect to redis client
	redis_host = os.environ.get("REDIS_HOST", "localhost")
	redis_port = os.environ.get("REDIS_PORT", 6379)
	redis_password = os.environ.get("REDIS_PASSWORD", None)
	redis_client = redis.StrictRedis(host=redis_host, port=redis_port, password=redis_password)

	# Run the app
	app.run(port=8080, host="0.0.0.0")