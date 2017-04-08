import os
from flask import jsonify, json
from flask import render_template, session, redirect, url_for, current_app, request
from werkzeug import secure_filename
from .. import db
from ..models import Account
from . import auth

@auth.route('/login', methods=['GET', 'POST'])
def login():
	if request.method == 'POST':
		name = request.form.get('lname')
		password = request.form.get('lpassword')
		exist = Account.query.filter_by(account_name=name, account_pwd=password).first()
		if exist is not None:
			session['account_id'] = exist.account_id
			return redirect(url_for('main.home'))
	return render_template('login.html')

@auth.route('/logout', methods=['GET'])
def logout():
	session.pop('account_id', None)
	return redirect(url_for('auth.login'))

@auth.route('/register', methods=['GET', 'POST'])
def register():
	if request.method == 'POST':
		account = Account()
		account.account_name = request.form.get('rname')
		account.account_pwd = request.form.get('rpassword')
		account.account_nick = request.form.get('rnick')
		account.account_email = request.form.get('remail')
		exist = Account.query.filter_by(account_name=request.form.get('rname')).first()
		if exist is None:
			db.session.add(account)
			db.session.commit()
			exist = Account.query.filter_by(account_name=request.form.get('rname')).first()
			session['account_id'] = exist.account_id
			return redirect(url_for('main.home'))
	return render_template('register.html')

@auth.route('/auth/init', methods=['GET'])
def authInit():
	account_id = session['account_id']
	account = Account.query.filter_by(account_id=account_id).first()
	account_info = {}
	account_info['account_name'] = account.account_name
	account_info['account_nick'] = account.account_nick
	account_info['account_email'] = account.account_email
	jsonAccount = {'account': account_info}
	return jsonify(jsonAccount)

@auth.route('/auth/save', methods=['POST'])
def authSave():
	account_id = session['account_id']
	data = json.loads(request.form.get('data'))
	account = Account.query.filter_by(account_id=account_id).first()
	account.account_nick = data['account_nick']
	db.session.commit()
	return jsonify({})

@auth.route('/icon/upload', methods=['POST'])
def uploadIcon():
	account_id = session['account_id']
	account = Account.query.filter_by(account_id=account_id).first()
	file = request.files['file']
	filename = account.account_name + '.jpg'
	#os.remove(os.path.join('/home/nightheart/workspace/www/repository/icon', filename))
	if file:
		#filename = secure_filename(file.filename)
		file.save(os.path.join('/home/nightheart/workspace/www/firefly/app/static/repository/icon', filename))
	return jsonify({})