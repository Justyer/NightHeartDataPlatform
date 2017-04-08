$.checkdoc = function(){
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
						cptCharts(data.component[i], 'check');
					}
				}
			})
		}
	}
}();

$(document).ready(function(){
	$.checkdoc.init();
});