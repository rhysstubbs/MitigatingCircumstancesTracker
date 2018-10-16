# Copyright 2016 Google Inc.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

# [START app]

# [START imports]
import os.path
import logging
import json
from datetime import timedelta
from flask import Flask, render_template, request, redirect, url_for, session, escape, flash, app
from google.appengine.ext import ndb

from werkzeug.security import generate_password_hash, check_password_hash

# [END imports]

app = Flask(__name__)
app.secret_key = 'lU\x80P\x11N\xbc\x8c\xc6*g\xdb,\xcdjw\xb8<E\xab5\x7f\xc5H'


@app.before_request
def make_session_permanent():
    session.permanent = True
    app.permanent_session_lifetime = timedelta(minutes=1)


class User(ndb.Model):
    username = ndb.StringProperty()
    password = ndb.StringProperty()
    is_admin = ndb.BooleanProperty()


@app.route('/')
def base():

    if 'username' in session:
        user = User.query(User.username == session['username']).get()
        if user:

            user_dict = user.to_dict()
            user_dict.pop('password', None)
            return render_template('dashboard.html', user_data=json.dumps(user_dict, ensure_ascii=True))

    return redirect(url_for('login'))


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def catch_all(path):
    return redirect(url_for('base'))


@app.route('/login', methods=['GET', 'POST'])
def login():

    if request.method == 'GET':
        return render_template('login.html')

    elif request.method == 'POST':

        post_username = request.form['username']
        post_password = request.form['password']

        user = User.query(User.username == post_username).get()

        if user:
            if check_password_hash(user.password, post_password):
                session['username'] = user.username
                return redirect(url_for('base'))
            else:
                flash('Incorrect Password.')
        else:
            flash('Unknown Username')

        return redirect(url_for('login'))


@app.route('/logout', methods=['POST'])
def logout():
    session.clear()
    return redirect(url_for('base'))


@app.errorhandler(404)
def page_not_found(exception):
    return render_template('errors/404.html', error=exception), 404


@app.errorhandler(500)
def server_error(exception):
    logging.exception('An error occurred during a request.')
    return render_template('errors/500.html', error=exception)

# [END app]
