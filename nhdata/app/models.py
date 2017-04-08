from . import db


class Visitor(db.Model):
    __tablename__ = 'visitor'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(16), unique=True)
    email = db.Column(db.String(30), unique=True)
    message = db.Column(db.String(255), unique=True)

    def __repr__(self):
        return '<Visitor %r>' % self.name