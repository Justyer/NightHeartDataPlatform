$.editdoc = function(){
	return{
		init : function(){
			$.ajax({
				url: '/doc/edit/init',
				success : function(data){
					$('.content').data("docid", data.doc_id);

					var divtitle = $('<div></div>')
									.appendTo('.content')
									.attr({
										class: 'row col-md-12'
									});

					var div = $('<div></div>')
									.appendTo(divtitle)
									.attr({
										class: 'row col-md-12'
									})
									.css({
										'height': '100px'
									});

					var p = $('<div></div>')
									.appendTo(div)
									.attr({
										class: 'col-md-12',
										align: 'center'
									})
									.text(data.title)
									.css({
										'margin-left': 'auto',
										'margin-right': 'auto',
										'line-height': '75px',
										'font-size': '3em'
									});

					for (var i = 0; i < data.component.length; i++) {
						cptCharts(data.component[i], 'edit');
					}

					dataAddDialog();
				}
			})
		},
		initSelect : function() {
			$.ajax({
				url: '/doc/init/select',
				success : function(data){
					$("#selectid").empty();
					for(var i = 0; i < data.initselect.length; i++){
						$("#selectid").append("<option value='" + data.initselect[i].data_id + "'>" + data.initselect[i].data_name + " | " + data.initselect[i].data_type + "</option>");
					}
				}
			})
		},
		addComponent : function() {
			var data_id = $('#selectid').val();
			if(data_id != null && data_id != ''){
				$.ajax({
					url: '/doc/add/component/' + data_id,
					success : function(data){
						cptCharts(data.addcomponent[0], 'edit');
					}
				});	
			}
		},
		addLittleTitle : function() {
			var littleTitle=prompt("input new lt:","");
			if(littleTitle != null && littleTitle != ''){
				var titleComponent = new Array();
				titleComponent[0] = { 'data': littleTitle, 'data_id': littleTitle, 'type': 'lt' };
				cptCharts(titleComponent[0], 'edit');
			}
		},
		addParagraph : function() {
			var paragraph=prompt("input p:","");
			if(paragraph != null && paragraph != ''){
				var pComponent = new Array();
				pComponent[0] = { 'data': paragraph, 'data_id': paragraph, 'type': 'p' };
				cptCharts(pComponent[0], 'edit');
			}
		},
		saveDoc : function() {
			var datarr = new Array();
			var i = 0;
			$('div[class="row col-md-12 ttd"]').each(function(){
				var type = $(this).data('type');
				var dataid = $(this).data('dataid') + '';
				var obj = {"data_type": type, "data_id": dataid};
				datarr[i] = obj;
				i++;
			});
			var data = {
			    data: JSON.stringify({
		            "doc_id": $('.content').data("docid"),
		            "component": datarr
		        })
			};
			$.ajax({
				url: "/doc/save",
				type: "post",
				dataType: "json",
				data: data,
				success:function(){
					alert('save success!');
				}
			});
		},
		deleteComponent : function(obj) {
			$(obj).parent().parent().remove();
		}
	}
}();

$(document).ready(function(){
	$.editdoc.init();
});