from google.appengine.ext import ndb


class User(ndb.Model):
    username = ndb.StringProperty()
    password = ndb.StringProperty()
    is_admin = ndb.BooleanProperty()
