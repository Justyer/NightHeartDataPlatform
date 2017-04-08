from flask import jsonify,json
from flask import render_template, session, redirect, url_for, current_app, request
from .. import db
from ..models import Doc, DataSrc
from . import datasrc
from pymongo import MongoClient

@datasrc.route('/datasrc/add', methods=['POST'])
def newDataSrc():
	data = json.loads(request.form.get('data'))
	ds = DataSrc()
	ds.data_name = data['data_name']
	ds.data_type = data['data_type']
	ds.have_data = 0
	ds.account_id = session['account_id']
	db.session.add(ds)
	db.session.commit()
	return redirect(url_for("main.getDataSrc"))

@datasrc.route('/datasrc/view/<int:id>', methods=['GET'])
def viewDataSrc(id):
	mongoCol = MongoClient("localhost", 27017)
	db = mongoCol.datasrcdb
	result = db.datasrccol.find_one({"data_id":str(id)}, {"_id":0})
	print result
	jsonData = {"datasrc": result}
	return jsonify(jsonData)


@datasrc.route('/datasrc/upload/<int:id>',methods=['POST'])
def uploadDataSrc(id):
	data = json.loads(request.form.get('data'))
	data_as = {"data_id":str(id), "data":data['data_data']}
	mongoCol = MongoClient("localhost", 27017)
	db1 = mongoCol.datasrcdb
	db1.datasrccol.update({"data_id":str(id)}, data_as, upsert=True)

	ds = DataSrc.query.filter_by(data_id=id).first()
	ds.have_data = 1
	db.session.commit()

	return redirect(url_for("main.getDataSrc"))

@datasrc.route('/datasrc/rename/<int:id>', methods=['POST'])
def renameDataSrc(id):
	data = json.loads(request.form.get('data'))
	ds = DataSrc.query.filter_by(data_id=id).first()
	ds.data_name = data['data_name']
	db.session.commit()
	return redirect(url_for("main.getDataSrc"))

@datasrc.route('/datasrc/delete/<int:id>', methods=['GET'])
def deleteDataSrc(id):
	ds = DataSrc.query.filter_by(data_id=id).first()
	db.session.delete(ds)
	db.session.commit()

	mongoCol = MongoClient("localhost", 27017)
	db1 = mongoCol.datasrcdb

	result = db1.datasrccol.find_one({'data_id': str(id)})
	if result is not None:
		db1.datasrccol.remove(result)

	return redirect(url_for('main.getDataSrc'))

@datasrc.route('/datasrc/all', methods=['GET'])
def getAllData():
	ds = DataSrc.query.all()
	dataList = []
	for item in ds:
		dataList[item['']]
	
	return jsonify(data)