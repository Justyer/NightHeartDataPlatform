from flask_wtf import Form
from wtforms import StringField, TextAreaField, SubmitField
from wtforms.validators import Required, Email

class ContactForm(Form):
	name = StringField(validators=[Required()])
	email = StringField(validators=[Email()])
	message = TextAreaField(validators=[Required()])
	submit = SubmitField()