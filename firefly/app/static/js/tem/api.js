function trim(str){
	if(str != '' && str != null)
		return str.replace(/(^\s*)|(\s*$)/g, '');
}

function iGetInnerText(str) {
    var resultStr = str.replace(/\ +/g, ""); //去掉空格
    resultStr = str.replace(/[ ]/g, "");    //去掉空格
    resultStr = str.replace(/[\r\n]/g, ""); //去掉回车换行
    return resultStr;
}

function addTogWindow(){
    $(".dadd").slideToggle("normal");
}

function createDocAddDialog(){
	var dadd = $('<div></div>')
				.appendTo('.content-nav')
				.attr({
					class: 'dadd'
				})
				.css({
					'background-color': 'white',
					'height': '100%',
					'float': 'right',
					'display': 'none'
				});

	var inputGroup = $('<div></div>')
						.appendTo(dadd)
						.attr({
							class: 'input-group col-md-12'
						});

	$('<input></input>')
		.appendTo(inputGroup)
		.attr({
			type: 'text',
			id: 'docname',
			class: 'form-control',
			placeholder: 'doc name'
		})
		.css({
			'width': '200px',
			'height': '50px',
			'float': 'left'
		});
	$('<span></span>')
		.appendTo(inputGroup)
		.attr({
			class: 'input-group-btn'
		})
		.css({
			'width': '100px',
			'float': 'left'
		})
		.append('<button id="adddata" class="btn btn-default" onclick="$.home.addDoc();addTogWindow();" style="width: 50px;height:50px;float:left;background-color: #33FF33;color: white;"><i class="icon-ok"></i></button>')
		.append('<button id="canceldata" class="btn btn-default" onclick="addTogWindow();" style="width: 50px;height:50px;float:left;background-color: #FF6666;color: white;"><i class="icon-remove"></i></button>');

}

function createDataAddDialog(){
	var dadd = $('<div></div>')
				.appendTo('.content-nav')
				.attr({
					class: 'dadd'
				})
				.css({
					'background-color': 'white',
					'height': '100%',
					'float': 'right',
					'display': 'none'
				});

	var inputGroup = $('<div></div>')
						.appendTo(dadd)
						.attr({
							class: 'input-group col-md-12'
						});

	var selectChart = $('<select></select>')
						.appendTo(inputGroup)
						.attr({
							id: 'selectid',
							class: 'form-control'
						})
						.css({
							'width': '100px',
							'height': '50px',
							'float': 'left'
						});

	$('<option value="bar">bar</option>').appendTo(selectChart);
	$('<option value="pie">pie</option>').appendTo(selectChart);
	$('<option value="line">line</option>').appendTo(selectChart);
	$('<input></input>')
		.appendTo(inputGroup)
		.attr({
			type: 'text',
			id: 'dataname',
			class: 'form-control',
			placeholder: 'data name'
		})
		.css({
			'width': '200px',
			'height': '50px',
			'float': 'left'
		});
	$('<span></span>')
		.appendTo(inputGroup)
		.attr({
			class: 'input-group-btn'
		})
		.css({
			'width': '100px',
			'float': 'left'
		})
		.append('<button id="adddata" class="btn btn-default" onclick="$.home.addDataSrc();addTogWindow();" style="width: 50px;height:50px;float:left;background-color: #33FF33;color: white;"><i class="icon-ok"></i></button>')
		.append('<button id="canceldata" class="btn btn-default" onclick="addTogWindow();" style="width: 50px;height:50px;float:left;background-color: #FF6666;color: white;"><i class="icon-remove"></i></button>');

}

function dataAddDialog(){
	var dadd = $('<div></div>')
				.appendTo('#addSth')
				.attr({
					class: 'dadd'
				})
				.css({
					'background-color': '#55c5a8',
					'height': '100%',
					'float': 'right',
					'display': 'none'
				});

	var inputGroup = $('<div></div>')
						.appendTo(dadd)
						.attr({
							class: 'input-group col-md-12'
						});

	var selectChart = $('<select></select>')
						.appendTo(inputGroup)
						.attr({
							id: 'selectid',
							class: 'form-control'
						})
						.css({
							'width': '150px',
							'height': '50px',
							'float': 'left'
						});


	$.editdoc.initSelect();

	$('<span></span>')
		.appendTo(inputGroup)
		.attr({
			class: 'input-group-btn'
		})
		.css({
			'width': '100px',
			'float': 'left'
		})
		.append('<button id="adddata" class="btn btn-default" onclick="$.editdoc.addComponent();addTogWindow();" style="width: 50px;height:50px;float:left;background-color: #33FF33;color: white;"><i class="icon-ok"></i></button>')
		.append('<button id="canceldata" class="btn btn-default" onclick="addTogWindow();" style="width: 50px;height:50px;float:left;background-color: #FF6666;color: white;"><i class="icon-remove"></i></button>');

}

function cptCharts(component, usefor){
	var divrow = $('<div></div>')
					.appendTo('.content')
					.attr({
						class: 'row col-md-12 ttd'
					})
					.css({
						'margin-left': 'auto',
						'margin-right': 'auto',
						'-moz-border-radius': '15px',
						'-webkit-border-radius': '15px',
						'border-radius': '15px',
						'padding-left': '15px',
						'padding-right': '15px'
					})
					.data('type', component.type)
					.data('dataid', component.data_id);

	var div_oper = $('<div></div>')
					.appendTo(divrow)
					.attr({
						class: 'oper col-md-12'
					})
					.css({
						'height': '25px',
						'margin-left': 'auto',
						'margin-right': 'auto',
						'padding-left': '15px',
						'padding-right': '15px'
					});

	var div = $('<div></div>')
				.appendTo(divrow)
				.attr({
					class: 'col-md-12',
					id: 'main'
				});
	if(component.type != 'lt' && component.type != 'p'){
		$(div).css({
			'height':'300px',
			'margin-left': 'auto',
			'margin-right': 'auto',
			'padding-left': '15px',
			'padding-right': '15px'
		});
		if(usefor == 'edit'){
			$(div).css({'border': '1px solid #FFF9B1'});
		}
	}
	if(usefor == 'edit'){
		$(divrow).css({'border': '1px solid #FFF9B1'});
		$(div_oper).css({'border': '1px solid #FFF9B1'});
		$('<a></a>')
			.appendTo(div_oper)
			.attr({
				class: 'button button-tiny',
				href: 'javascript:void(0);',
				onclick: '$.editdoc.deleteComponent(this)'
			})
			.text('delete');
	}

	initMap(component);

	$('#main').removeAttr('id');
}

function dataTypeColor(type, typeDiv,haveData){
	if(haveData != '0'){
		if(type == 'bar')
			$(typeDiv).css({'background-color': '#00FFFF'});
		else if(type == 'pie')
			$(typeDiv).css({'background-color': '#FFFF66'});
		else if(type == 'line')
			$(typeDiv).css({'background-color': '#9999CC'});
	}
}
