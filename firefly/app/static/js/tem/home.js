$.home = function(){
	return{
		init : function(){
			$.home.getAccount();
			$.home.getDoc();
		},

		getAccount : function() {
			$.ajax({
				url: '/auth/init',
				success:function(data){
					$('#pnick').text(data.account.account_nick);
					$('#pmail').text(data.account.account_email);
					$('#picon').attr({
						src: '/static/repository/icon/' + data.account.account_name + '.jpg?r=' + Math.random()
					});
					$('.all').data('aname', data.account.account_name);
				}
			})
		},
		saveAccount : function() {
			var nick = $('#modifyNick').val();
			var data = {
			    data: JSON.stringify({
		            "account_nick": nick
		        })
			};
			$.ajax({
				url: '/auth/save',
				type: 'post',
				data: data,
				success:function(data){
					alert('modify account nick success!');
					$('#pnick').text(nick);
				}
			})
		},

		getDoc : function(){
			$.ajax({
				url: "/doc",
				success:function(data){
					$(".content-nav").empty();
					$('<button></button>')
						.appendTo('.content-nav')
						.attr({
							onclick: 'addTogWindow()',
							class: 'button button-highlight button-square button-large'
						})
						.css({
							'float': 'right',
							'background-color': '#ecedf0',
							'color': 'black',
							'border-left': '1px solid #e5e5e5',
							'border-right': '1px solid #e5e5e5',
							'font-size': '30px'
						})
						.append('<i class="icon-plus"></i>');

					createDocAddDialog();

					$(".content-item").empty();
					for(var i = 0; i < data.doc.length; i++){

						var gridDiv = $('<div></div>')
									.appendTo('.content-item')
									.attr({
										class: ''
									})
									.css({
										'padding': '10px',
										'width': '20%',
										'float': 'left'
									})
									.height(function(){
										return $(this).width() * 9 / 16;
									});

						var div = $('<div></div>')
									.appendTo(gridDiv)
									.attr({
										id: 'mydoc' + i
									})
									.css({
										'width': '100%',
										'height': '100%',
										'box-shadow': '0 0 5px #888888',
										'-moz-border-radius': '10px',
										'-webkit-border-radius': '10px',
										'border-radius':'10px'
									});

						var picDiv = $('<div></div>')
										.appendTo(div)
										.attr({
											class: ''
										})
										.css({
											'background-color': '#FFFAF0',
											'width':'87%',
											'height': '87%',
											'float':'left',
											'border-radius':'10px 0 0 0'
										});

						var operDiv = $('<div></div>')
										.appendTo(div)
										.attr({
											class: ''
										})
										.css({
											'background-color': '#ecedf0',
											'width':'13%',
											'height': '87%',
											'float':'left',
											'border-radius':'0 10px 0 0'
										});

						var titleDiv = $('<div></div>')
										.appendTo(div)
										.attr({
											class: ''
										})
										.css({
											'background-color': '#F8F8FF',
											'width':'100%',
											'height': '13%',
											'float':'left',
											'border-radius':'0 0 10px 10px'
										});

						$('<button></button>').appendTo(operDiv)
							.attr({
								class: 'button button-circle button-tiny',
							})
							.data('docid', data.doc[i].doc_id)
							.click(function(data){
								var h = '/doc/check/' + $(this).data('docid');
								window.location.href = h;
							})
							.css({
								'float':'left',
								'width':'100%',
								'height':'25%',
								'background-color':'#ecedf0'
							})
							.append('<i class="icon-file-alt icon-large"></i>');

						$('<button></button>').appendTo(operDiv)
							.attr({
								class: 'button button-circle button-tiny'
							})
							.data('docid', data.doc[i].doc_id)
							.click(function(data){
								var h = '/doc/edit/' + $(this).data('docid');
								window.location.href = h;
							})
							.css({
								'float':'left',
								'width':'100%',
								'height':'25%',
								'background-color':'#ecedf0'
							})
							.append('<i class="icon-edit icon-large"></i>');

						$('<button></button>').appendTo(operDiv)
							.attr({
								onclick: '$.home.renameDoc(' + data.doc[i].doc_id + ')',
								class: 'button button-circle button-tiny',
							})
							.css({
								'float':'left',
								'width':'100%',
								'height':'25%',
								'background-color':'#ecedf0'
							})
							.append('<i class="icon-pencil icon-large"></i>');

						$('<button></button>').appendTo(operDiv)
							.attr({
								onclick: '$.home.deleteDoc(' + data.doc[i].doc_id + ')',
								class: 'button button-circle button-tiny',
							})
							.css({
								'float':'left',
								'width':'100%',
								'height':'25%',
								'background-color':'#ecedf0'
							})
							.append('<i class="icon-trash icon-large"></i>');

						$('<div></div>').appendTo(titleDiv)
							.css({
								'height': '100%',
								'margin-left': '10px',
								'font-size': '16px'
							})
							.text(data.doc[i].doc_name);
					}
				}
			})
		},

		getDataSrc : function(){
			$.ajax({
				url: "/datasrc",
				success:function(data){
					$(".content-nav").empty();

					$('<button></button>')
						.appendTo('.content-nav')
						.attr({
							onclick: 'addTogWindow()',
							class: 'button button-highlight button-square button-large'
						})
						.css({
							'float': 'right',
							'background-color': '#ecedf0',
							'color': 'black',
							'border-left': '1px solid #e5e5e5',
							'border-right': '1px solid #e5e5e5',
							'font-size': '30px'
						})
						.append('<i class="icon-plus"></i>');

					createDataAddDialog();

					$(".content-item").empty();
					for(var i = 0; i < data.datasrc.length; i++){
						var gridDiv = $('<div></div>')
									.appendTo('.content-item')
									.attr({
										class: ''
									})
									.css({
										'padding': '10px',
										'width': '12.5%',
										'float': 'left'
									})
									.height(function(){
										return $(this).width();
									});

						var div = $('<div></div>')
									.appendTo(gridDiv)
									.attr({
										id: 'mydatasrc' + i
									})
									.css({
										'width': '100%',
										'height': '100%',
										'box-shadow': '0 0 5px #888888',
										'-moz-border-radius': '10px',
										'-webkit-border-radius': '10px',
										'border-radius':'10px'
									});

						var typeDiv = $('<div></div>')
										.appendTo(div)
										.attr({
											class: ''
										})
										.css({
											'width':'100%',
											'height': '56%',
											'float':'left',
											'border-radius':'10px 10px 0 0'
										});

						dataTypeColor(data.datasrc[i].data_type, typeDiv, data.datasrc[i].have_data);

						var operDiv = $('<div></div>')
										.appendTo(div)
										.attr({
											class: ''
										})
										.css({
											'background-color': '#ecedf0',
											'width':'100%',
											'height': '25%',
											'float':'left'
										});

						var titleDiv = $('<div></div>')
										.appendTo(div)
										.attr({
											class: ''
										})
										.css({
											'background-color': '#F8F8FF',
											'width':'100%',
											'height': '19%',
											'float':'left',
											'border-radius':'0 0 10px 10px'
										});

						$('<button></button>').appendTo(operDiv)
							.attr({
								class: 'button button-circle button-tiny',
							})
							.data('dataid', data.datasrc[i].data_id)
							.click(function(data){
								var h = '/datasrc/view/' + $(this).data('dataid');
								window.open(h);
							})
							.css({
								'float':'left',
								'width':'25%',
								'height':'100%',
								'overflow': 'hidden',
								'background-color':'#ecedf0'
							})
							.append('<i class="icon-file-alt icon-large"></i>');

						$('<input></input>').appendTo(operDiv)
							.attr({
								id: 'files' + data.datasrc[i].data_id,
								type: 'file',
								onchange: "$.home.uploadDataSrc(" + data.datasrc[i].data_id + ")"
							})
							.css({
								'display': 'none'
							});

						$('<button></button>').appendTo(operDiv)
							.attr({
								class: 'button button-circle button-tiny',
								onclick: "$.home.uploadDataSrcBtn('files" + data.datasrc[i].data_id + "')",
							})
							.css({
								'float':'left',
								'width':'25%',
								'height':'100%',
								'background-color':'#ecedf0'
							})
							.append('<i class="icon-upload icon-large"></i>');

						$('<button></button>').appendTo(operDiv)
							.attr({
								onclick: '$.home.renameDataSrc(' + data.datasrc[i].data_id + ')',
								class: 'button button-circle button-tiny',
							})
							.css({
								'float':'left',
								'width':'25%',
								'height':'100%',
								'background-color':'#ecedf0'
							})
							.append('<i class="icon-pencil icon-large"></i>');

						$('<button></button>').appendTo(operDiv)
							.attr({
								onclick: '$.home.deleteDataSrc(' + data.datasrc[i].data_id + ')',
								class: 'button button-circle button-tiny',
							})
							.css({
								'float':'left',
								'width':'25%',
								'height':'100%',
								'background-color':'#ecedf0'
							})
							.append('<i class="icon-trash icon-large"></i>');

						$('<div></div>').appendTo(titleDiv)
							.attr({
								class: 'col-md-8'
							})
							.css({
								'height': '100%',
								'float': 'left',
								'font-size': '100%',
								'overflow': 'hidden',
								'white-space': 'nowrap',
								'text-overflow': 'ellipsis'
							})
							.text(data.datasrc[i].data_name);
						$('<div></div>').appendTo(titleDiv)
							.attr({
								class: 'col-md-4',
								align: 'right'
							})
							.css({
								'height': '100%',
								'float': 'right',
								'font-size': '100%'
							})
							.text(data.datasrc[i].data_type);
					}
				}
			})
		},
		getSetting : function(){
			$.ajax({
				url: "/settings",
				success:function(data){
					$('.content-nav').empty();
					$('.content-item').empty();

					var touming = $('<div></div>')
									.appendTo('.content-item')
									.css({
										'background-color': 'hsla(240,100%,75%,0)',
										'width': '100%',
										'height': '600px',
										'padding': '20px'
									});

					var settings = $('<div></div>')
									.appendTo(touming)
									.css({
										'background-color': 'white',
										'width': '100%',
										'height': '100%',
										'padding': '15px'
									});

					$('<div>Profile:</div>')
						.appendTo(settings)
						.attr({
							class: 'col-md-12'
						})
						.css({
							'height': '20px',
							'border-bottom': '1px solid #d3d3d3'
						});

					var profile = $('<div></div>')
									.appendTo(settings)
									.attr({
										class: 'row col-md-12'
									})
									.css({
										'width': '50%',
										'height': '200px',
										'padding': '20px',
										'padding-left': '30%'
									});

					$('<div>Icon:</div>')
						.appendTo(settings)
						.attr({
							class: 'col-md-12'
						})
						.css({
							'height': '20px',
							'border-bottom': '1px solid #d3d3d3'
						});

					var touxiang = $('<div></div>')
									.appendTo(settings)
									.attr({
										class: 'row col-md-12'
									})
									.css({
										'height': '300px',
										'padding': '50px'
									});

					$('<input></input>')
						.appendTo(profile)
						.attr({
							type: 'text',
							id: 'modifyNick',
							value: data.settings.account_nick,
							class: 'form-control'
						})
						.css({
							'width': '300px',
							'margin': '10px'
						});

					$('<input></input>')
						.appendTo(profile)
						.attr({
							type: 'text',
							value: data.settings.account_email,
							class: 'form-control',
							readonly: 'readonly'
						})
						.css({
							'width': '300px',
							'margin': '10px'
						});

					$('<button></button>')
						.appendTo(profile)
						.attr({
							class: 'button button-action button-rounded',
							onclick: '$.home.saveAccount()'
						})
						.text('submit')
						.css({
							'margin-left': '10px'
						});

					var modifyIcon = $('<a></a>')
										.appendTo(touxiang)
										.css({
											'float': 'left',
											'margin-left': '150px',
											'margin-right': '150px'
										});

					$('<img>')
						.appendTo(modifyIcon)
						.attr({
							id: 'modifyicon',
							src: '/static/repository/icon/' + data.settings.account_name + '.jpg?r=' + Math.random()
						})
						.css({
							'width': '180px',
							'height': '180px',
							'margin': '0 auto'
						});

					$('<div></div>')
						.appendTo(touxiang)
						.css({
							'float': 'left'
						})
						.append('<form id="uploadForm"></form>')
						.append('<p style="color:gray;margin-top:5px;">sup jpg img.</p>')
						.append('<p style="color:gray;margin-top:5px;">best size is 180*180.</p>');

					$('<input></input>')
						.appendTo('#uploadForm')
						.attr({
							type: 'button',
							id: 'uploadimg',
							class: 'button button-action button-rounded',
							value: 'upload img'
						})
						.click(function(){
							$('#choosefile').click();
						});

					$('<input></input>')
						.appendTo('#uploadForm')
						.attr({
							type: 'file',
							id: 'choosefile',
							name: 'file'
						})
						.change(function(){
							$.home.imgg();
						})
						.css({
							'display': 'none'
						});
				}
			})
		},
		imgg:function(){  
    	var formData = new FormData($( "#uploadForm" )[0]);  
		    $.ajax({  
		        url: '/icon/upload' ,  
		        type: 'POST',  
		        data: formData,  
		        async: false,  
		        cache: false,  
		        contentType: false,  
		        processData: false,  
		        success: function (data) {  
		            $('#modifyicon').attr({
		            	src: '/static/repository/icon/' + $('.all').data('aname') + '.jpg?r=' + Math.random()
		            });
		            $('#picon').attr({
		            	src: '/static/repository/icon/' + $('.all').data('aname') + '.jpg?r=' + Math.random()
		            });
		        } 
		    });
		},
		addDoc: function(){
			var name = $('#docname').val();
			if(trim(name) != '' & trim(name) != null){
				var data = {
				    data: JSON.stringify({
			            "doc_name":name
			        })
				};
				$.ajax({
					url: "/doc/add",
					type: "post",
					data: data,
					success:function(){
						alert('add doc seccess!');
					}
				});
				$.home.getDoc();
			}
		},
		renameDoc: function(id){
			var name=prompt("input new doc name:","");
			if(trim(name) != '' & trim(name) != null){
				var data = {
				    data: JSON.stringify({
			            "doc_name":name
			        })
				};
				$.ajax({
					url: "/doc/rename/" + id,
					type: "post",
					data: data,
					success:function(){
						alert('rename doc seccess!');
					}
				});
				$.home.getDoc();
			}
		},
		deleteDoc : function(id){
			if(confirm('Are you true delete this?')){
				$.ajax({
					url: "/doc/delete/" + id,
					success:function(){
						alert('delete doc success!');
					}
				});
				$.home.getDoc();
			}
		},
		addDataSrc: function(){
			var name = $('#dataname').val();
			var type = $('#selectid').val();
			if(trim(name) != '' & trim(name) != null && trim(type) != '' & trim(type) != null){
				var data = {
				    data: JSON.stringify({
			            "data_name":name,
			            "data_type":type
			        })
				};
				$.ajax({
					url: "/datasrc/add",
					type: "post",
					data: data,
					success:function(){
						alert('add seccess!');
					}
				});
			}
			$.home.getDataSrc();
		},
		uploadDataSrc: function(id){
		    var selectedFile = document.getElementById('files' + id).files[0];//获取读取的File对象
		    var name = selectedFile.name;//读取选中文件的文件名
		    var size = selectedFile.size;//读取选中文件的大小
		    console.log("文件名:"+name+"大小："+size);

		    var reader = new FileReader();//这里是核心！！！读取操作就是由它完成的。
		    reader.readAsText(selectedFile);//读取文件的内容

		    reader.onload = function(){
		        console.log(this.result);//当读取完成之后会回调这个函数，然后此时文件的内容存储到了result中。直接操作即可。
				d = this.result;
				dd = d.substring(0,d.length - 1);
				if(trim(dd) != '' & trim(dd) != null){
					var data = {
					    data: JSON.stringify({
				            "data_data":JSON.parse(dd)
					    })
					};
				    $.ajax({
				    	url: "/datasrc/upload/" + id,
				    	type: "post",
				    	dataType: "json",
				    	data: data,
				    	success:function(){
				    		alert('upload success!');
				    	}
				    });
				    $.home.getDataSrc();
				}
		    };

		},
		uploadDataSrcBtn: function(id){
			$("#" + id).click();
		},
		renameDataSrc: function(id){
			var name=prompt("input new data name:","");
			if(trim(name) != '' & trim(name) != null){
				var data = {
				    data: JSON.stringify({
			            "data_name":name
			        })
				};
				$.ajax({
					url: "/datasrc/rename/" + id,
					type: "post",
					data: data,
					success:function(){
						alert('rename seccess!');
					}
				});
				$.home.getDataSrc();
			}
		},
		deleteDataSrc : function(id){
			if(confirm('Are you true delete this?')){
				$.ajax({
					url: "/datasrc/delete/" + id,
					success:function(){
						alert('delete success!');
					}
				});
				$.home.getDataSrc();
			}
		}
	}
}();
$(document).ready(function(){
	$.home.init();
});