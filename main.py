# [START imports]
from datetime import timedelta
from flask import Flask, render_template, request, redirect, url_for, session, flash, app
from app.constants.api import API_URL
from app.constants.http_codes import OK, NOT_FOUND, NO_CONTENT
import httplib
import json
import requests
from requests_toolbelt.adapters import appengine
# [END imports]

# cache = Cache(config={'CACHE_TYPE': 'simple'})

app = Flask(__name__)
app.secret_key = 'lU\x80P\x11N\xbc\x8c\xc6*g\xdb,\xcdjw\xb8<E\xab5\x7f\xc5H'
# cache.init_app(app)

appengine.monkeypatch()

SESSION_EXPIRE = 1


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
    if 'user' in session:
        return render_template('dashboard.html', user_data=json.dumps(session['user']))

    return redirect(url_for('login'))


@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'GET':
        return render_template('login.html')

    elif request.method == 'POST':

        post_username = request.form['username'].lower()
        post_password = str(request.form['password'])

        r_user = requests.get(API_URL + ("/user/exists/%s" % post_username))

        if r_user.status_code == OK:

            json_dict = r_user.json()
            stored_password = str(json_dict['password'])
            stored_role = bool(json_dict['isAdmin'])

            if stored_password == post_password:

                session['user'] = load_user_data(username=post_username, is_admin=stored_role)
                return redirect(url_for('base'))

            else:
                flash('Incorrect Password')
                return redirect(url_for('login'))

        elif r_user.status_code == NOT_FOUND:
            flash('Unknown Username')
            return redirect(url_for('login'))

    return redirect(url_for('login'))


def load_user_data(username, is_admin):

    url = API_URL

    if not is_admin:
        url += ("/request?userId=%s" % username)
    else:
        url += "/request"

    response = requests.get(url=url)

    data_dict = {
        "user": {
            "username": username,
            "isAdmin": is_admin
        },
        "requests": []
    }

    if response.status_code == OK:
        response_dict = response.json()
        data_dict["requests"] = response_dict

    return data_dict


@app.route('/logout', methods=['POST'])
def logout():
    session.clear()
    return redirect(url_for('base'))


# [START errors]
@app.errorhandler(404)
def page_not_found(exception):
    return render_template('errors/404.html', error=exception), 404


@app.errorhandler(500)
def server_error(exception):
    return render_template('errors/500.html', error=exception)
# [END errors]
