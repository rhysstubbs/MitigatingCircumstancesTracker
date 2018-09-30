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
import logging
from flask import Flask, render_template, request, redirect, url_for, session, escape

from flask_mongoengine import MongoEngine, Document
from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField
from wtforms.validators import Email, Length, InputRequired
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import LoginManager, UserMixin, login_user, login_required, logout_user, current_user
# [END imports]

app = Flask(__name__)
app.secret_key = '123'

app.config['MONGODB_SETTINGS'] = {
    'db': 'mitigating circumstances',
    'host': 'mongodb://<---YOUR_DB_FULL URI--->'
}

db = MongoEngine(app)
app.config['SECRET_KEY'] = 'secret_form_key'
login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'login'


class User(UserMixin, db.Document):
    meta = {'collection': 'users'}
    username = db.StringField(max_length=30)
    password = db.StringField()


@login_manager.user_loader
def load_user(user_id):
    return User.objects(pk=user_id).first()


class RegForm(FlaskForm):
    username = StringField('username',  validators=[InputRequired(), Email(message='Invalid username'), Length(max=30)])
    password = PasswordField('password', validators=[InputRequired(), Length(min=8, max=20)])


@app.route('/login', methods=['GET', 'POST'])
def login():

    if current_user.is_authenticated:
        return redirect(url_for('dashboard'))

    form = RegForm()
    if request.method == 'POST':

        if request.method == 'POST':
            if form.validate():
                check_user = User.objects(email=form.email.data).first()
                if check_user:
                    if check_password_hash(check_user['password'], form.password.data):
                        login_user(check_user)
                        return redirect(url_for('dashboard'))

    return render_template('login.html', form=form)


@app.route('/dashboard')
@login_required
def dashboard():
    return render_template('dashboard.html', name=current_user.username)


@app.route('/logout', methods = ['GET'])
@login_required
def logout():
    logout_user()
    return redirect(url_for('login'))


@app.errorhandler(404)
def not_found():
    return render_template('errors/404.html')


@app.errorhandler(500)
def server_error(e):
    # Log the error and stacktrace.
    logging.exception('An error occurred during a request.')
    return render_template('errors/500.html', error=e)

# [END app]
