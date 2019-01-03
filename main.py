from datetime import timedelta
from flask import Flask, render_template, request, redirect, url_for, session, flash, app, jsonify

from app.constants.api import API_URL
from app.constants.http_codes import OK, NOT_FOUND, FORBIDDEN

import json

import requests
import requests_toolbelt.adapters.appengine

from google.oauth2 import id_token
from google.auth.transport import requests as google_requests

app = Flask(__name__)
app.secret_key = 'lU\x80P\x11N\xbc\x8c\xc6*g\xdb,\xcdjw\xb8<E\xab5\x7f\xc5H'

requests_toolbelt.adapters.appengine.monkeypatch()

SESSION_EXPIRE = 25

CLIENT_ID = "228751891873-1jh8c268uvjjlj5ka45eb4cc9jkv7k7c.apps.googleusercontent.com"


@app.before_request
def make_session_permanent():
    session.permanent = True
    app.permanent_session_lifetime = timedelta(minutes=SESSION_EXPIRE)


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def catch_all(path):
    return redirect(url_for('base'))


@app.route('/')
def base():
    if 'token' in session and validate_token(session['token']):
        return redirect(url_for('dashboard'))

    return redirect(url_for('login'))


@app.route('/dashboard', methods=['GET'])
def dashboard():
    return render_template('dashboard.html', user_data=json.dumps(session["user"]))


@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'GET':
        return render_template('login.html')

    elif request.method == 'POST':

        username = request.form["username"]
        token = request.form["idToken"]

        if username and token:

            idinfo = id_token.verify_oauth2_token(token, google_requests.Request(), CLIENT_ID)

            user_exists = requests.get(API_URL + ("/user/%s/exists?email=%s" % (username, idinfo["email"])))

            if user_exists.status_code == OK:

                if idinfo['iss'] not in ['accounts.google.com', 'https://accounts.google.com']:
                    return render_template('login.html')

                else:

                    session['token'] = str(token)
                    session['user'] = load_user_data(username, idinfo['name'], idinfo['picture'])

                return redirect(url_for('dashboard'))

            elif user_exists.status_code == NOT_FOUND:

                url = API_URL + "/user/%s/confirm?authEmail=%s" % (username, idinfo["email"])
                send_confirmation = requests.post(url)

                if send_confirmation.status_code == OK:
                    flash("We have emailed you a single-use link to confirm your account!", 'success')
                else:
                    flash("Oops, something went wrong?", "danger")

                return render_template("login.html")

            elif user_exists.status_code == FORBIDDEN:

                flash("That email address has not been verified", "warning")
                return render_template('login.html')

        elif 'token' in session:
            return redirect(url_for('base'))

        else:
            return render_template('login.html')


@app.route('/login/confirm/<token>', methods=['GET'])
def login_confirm(token):
    assert token == request.view_args["token"]

    url = API_URL + ("/user/confirm?token=%s" % token)
    is_valid = requests.get(url)

    if is_valid.status_code == OK:
        flash('You can now access your account!', 'success')
    else:
        flash("Please try clicking the link again", 'info')

    return redirect(url_for('login'))


@app.route('/logout', methods=['GET'])
def logout():
    session.clear()
    flash("Logged out", 'info')
    return redirect(url_for('login'))


@app.errorhandler(404)
def page_not_found(exception):
    return render_template('errors/404.html', error=exception), 404


@app.errorhandler(500)
def server_error(exception):
    return render_template('errors/500.html', error=exception), 500


def validate_token(token):
    # Specify the CLIENT_ID of the app that accesses the backend:
    idinfo = id_token.verify_oauth2_token(token, google_requests.Request(), CLIENT_ID)

    if idinfo['iss'] not in ['accounts.google.com', 'https://accounts.google.com']:
        return False

    return True


def load_user_data(username, name=None, avatar=None):
    url = API_URL + "/user/%s?withRequests=true&withNotifications=true" % username

    response = requests.get(url=url)

    data_dict = {
        "user": {
            "username": username,
            "isAdmin": None,
            "name": name,
            "avatar": avatar,
            "notifications": []
        },
        "requests": []
    }

    if response.status_code == OK:
        user_data = response.json()

        is_admin = user_data['isAdmin']
        data_dict["user"]["isAdmin"] = is_admin

        if 'notifications' in user_data:
            data_dict["user"]["notifications"] = user_data["notifications"]

        if is_admin:

            request_url = API_URL + "/request"
            all_response = requests.get(url=request_url)

            if all_response.status_code == OK:
                all_requests = all_response.json()
                data_dict["requests"] = all_requests

        else:

            if 'requests' in user_data and len(user_data["requests"]) > 0:
                data_dict["requests"] = user_data["requests"]

    return data_dict


def api_is_live(url):
    response = requests.get(url=url)
    if response.status_code == OK:
        return True
    else:
        return False
