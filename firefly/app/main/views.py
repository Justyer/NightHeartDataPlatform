from flask import jsonify
from flask import render_template, session, redirect, url_for, current_app, request
from .. import db
from ..models import Account, Doc, DataSrc
from . import main
from pymongo import MongoClient

#go to homepage
@main.route('/', methods=['GET', 'POST'])
def home():
	if 'account_id' in session:
		return render_template("home.html")
	else:
		return redirect(url_for("auth.login"))

#query all docs by current user
@main.route('/doc', methods=['GET'])
def getDoc():
	account_id = session["account_id"]
	all_doc_by_account = Doc.query.filter_by(account_id=account_id).all()
	doc_array = []
	for item in all_doc_by_account:
		one = {}
		one['doc_id'] = item.doc_id
		one['doc_name'] = item.doc_name
		doc_array.append(one)
	jsonDoc={"doc": doc_array}
	return jsonify(jsonDoc)

#query all datasources by current user
@main.route('/datasrc', methods=['GET'])
def getDataSrc():
	account_id = session["account_id"]
	all_datasrc_by_account = DataSrc.query.filter_by(account_id=account_id).all()
	datasrc_array = []
	for item in all_datasrc_by_account:
		one = {}
		one['data_id'] = item.data_id
		one['data_name'] = item.data_name
		one['data_type'] = item.data_type
		one['have_data'] = item.have_data
		datasrc_array.append(one)
	jsonDataSrc={"datasrc": datasrc_array}
	return jsonify(jsonDataSrc)

#motify user information for current user
@main.route('/settings', methods=['GET'])
def getSettings():
	account_id = session['account_id']
	account = Account.query.filter_by(account_id=account_id).first()
	account_info = {}
	account_info['account_name'] = account.account_name
	account_info['account_nick'] = account.account_nick
	account_info['account_email'] = account.account_email
	jsonSettings = {'settings': account_info}
	return jsonify(jsonSettings)