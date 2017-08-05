from flask import jsonify, json
from flask import render_template, session, redirect, url_for, current_app, request
from .. import db
from ..models import Doc, DataSrc
from . import doc
from pymongo import MongoClient

#add a new doc without content
@doc.route('/doc/add', methods=['POST'])
def newDataSrc():
	data = json.loads(request.form.get('data'))
	name = data['doc_name']
	dc = Doc()
	dc.doc_name = name
	dc.account_id = session['account_id']
	db.session.add(dc)
	db.session.commit()
	return redirect(url_for("main.getDoc"))

#skip checkpage
@doc.route('/doc/check/<int:id>', methods=['GET'])
def checkDoc(id):
	session['doc_id'] = id
	return render_template("checkdoc.html")

#skip editpage
@doc.route('/doc/edit/<int:id>', methods=['GET'])
def editDoc(id):
	session['doc_id'] = id
	return render_template("editdoc.html")

@doc.route('/doc/edit/init', methods=['GET'])
def editDocInit():
	id = session['doc_id']

	mongoCol = MongoClient("localhost", 27017)
	db_doc = mongoCol.docdb
	db_datasrc = mongoCol.datasrcdb

	init_array = []
	doc_find = db_doc.doccol.find_one({"doc_id":str(id)}, {"_id":0})
	if doc_find is not None:
		for i in range(0, len(doc_find['component'])):
			component = {}
			if doc_find['component'][i]['data_type'] in ['lt', 'p']:
				component['data_id'] = doc_find['component'][i]['data_id']
				component['type'] = doc_find['component'][i]['data_type']
				component['data'] = doc_find['component'][i]['data_id']
			else:
				datasrc_find = db_datasrc.datasrccol.find_one({"data_id": doc_find['component'][i]['data_id']})
				component['data_id'] = doc_find['component'][i]['data_id']
				component['type'] = DataSrc.query.filter_by(data_id=component['data_id']).first().data_type
				component['data'] = datasrc_find['data']
			init_array.append(component)
	title = Doc.query.filter_by(doc_id=id).first().doc_name

	initDoc = {"doc_id": id, "component":init_array, "title": title}
	return jsonify(initDoc)

@doc.route('/doc/rename/<int:id>', methods=['POST'])
def renameDataSrc(id):
	data = json.loads(request.form.get('data'))
	rename = data['doc_name']
	dc = Doc.query.filter_by(doc_id=id).first()
	dc.doc_name = rename
	db.session.commit()
	return redirect(url_for("main.getDoc"))

#edit loadpage init coponent
@doc.route('/doc/delete/<int:id>', methods=['GET'])
def deleteDataSrc(id):
	dc = Doc.query.filter_by(doc_id=id).first()
	db.session.delete(dc)
	db.session.commit()

	mongoCol = MongoClient("localhost", 27017)
	db1 = mongoCol.docdb

	result = db1.doccol.find_one({'doc_id': str(id)})
	if result is not None:
		db1.doccol.remove(result)

	return redirect(url_for("main.getDoc"))

@doc.route('/doc/init/select', methods=['GET'])
def initSelect():
	account_id = session['account_id']
	ds = DataSrc.query.filter_by(account_id=account_id).all()
	ds_array = []
	for item in ds:
		if item.have_data != 0:
			ds_dict = {}
			ds_dict['data_id'] = item.data_id
			ds_dict['data_name'] = item.data_name
			ds_dict['data_type'] = item.data_type
			ds_array.append(ds_dict)

	initSel = {"initselect": ds_array}
	return jsonify(initSel)

@doc.route('/doc/add/component/<int:id>', methods=['GET'])
def addComponent(id):
	mongoCol = MongoClient("localhost", 27017)
	db = mongoCol.datasrcdb
	result = db.datasrccol.find_one({'data_id': str(id)}, {"_id":0})
	component = {}
	component['data_id'] = id
	component['type'] = DataSrc.query.filter_by(data_id=id).first().data_type
	component['data'] = result['data']

	addcpt = {"addcomponent": [component]}
	return jsonify(addcpt)

@doc.route('/doc/save', methods=['POST'])
def saveDoc():
	data = json.loads(request.form.get('data'))
	data_as = {"doc_id":str(data['doc_id']), "component":data['component']}
	mongoCol = MongoClient("localhost", 27017)
	db = mongoCol.docdb
	db.doccol.update({"doc_id":str(data['doc_id'])}, data_as, upsert=True)
	return jsonify({})
