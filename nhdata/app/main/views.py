from flask import render_template, session, redirect, url_for, current_app, request
from .. import db
from ..models import Visitor
from ..email import send_email
from . import main
from .forms import ContactForm


@main.route('/', methods=['GET', 'POST'])
def index():
	return render_template('index.html')

@main.route('/contact', methods=['GET', 'POST'])
def contact():
	form = ContactForm()
	if request.method == 'POST':
		session['form'] = form.data

		visitor = Visitor()
		visitor.name = form.name.data
		visitor.email = form.email.data
		visitor.message = form.message.data
		db.session.add(visitor)

		html_msg = '<p>name:' + form.name.data + '</p>' + \
			'<p>email:' + form.email.data + '</p>' + \
			'<p>message:' + form.message.data + '</p>'
		send_email(current_app.config['FLASKY_ADMIN'], 'New User', html_msg)

		return redirect(url_for('.index'))
	return render_template('contact.html', form=form)