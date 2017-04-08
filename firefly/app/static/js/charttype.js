function initMap(component){
	if(component.type == 'bar')
		bar(component);
    else if(component.type == 'pie')
        pie(component);
    else if(component.type == 'line')
        line(component);
    else if(component.type == 'lt')
        littleTitle(component);
    else if(component.type == 'p')
        paragraph(component);
}

function bar(component){
	var myChart = echarts.init(document.getElementById('main'));
    myChart.setOption({
        title: {
            text: component.data.title
        },
        tooltip: {},
        legend: {
            data:[component.data.legend]
        },
        xAxis: {
            data: component.data.x
        },
        yAxis: {},
        series: [{
            name: component.data.legend,
            type: 'bar',
            itemStyle: {
                normal: {
                    color: new echarts.graphic.LinearGradient(
                        0, 0, 0, 1,
                        [
                            {offset: 0, color: '#83bff6'},
                            {offset: 0.5, color: '#188df0'},
                            {offset: 1, color: '#188df0'}
                        ]
                    )
                },
                emphasis: {
                    color: new echarts.graphic.LinearGradient(
                        0, 0, 0, 1,
                        [
                            {offset: 0, color: '#2378f7'},
                            {offset: 0.7, color: '#2378f7'},
                            {offset: 1, color: '#83bff6'}
                        ]
                    )
                }
            },
            data: component.data.xdata
        }]
    });
}
function pie(component){
    var arr = new Array();
    for(var i = 0; i < component.data.x.length; i++){
        obj = {value:component.data.xdata[i], name:component.data.x[i]};
        arr[i] = obj;
    }
    var myChart = echarts.init(document.getElementById('main'));
    myChart.setOption({
        title : {
            text: component.data.title,
            x:'center'
        },
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            orient: 'vertical',
            left: 'left',
            data: component.data.x
        },
        series : [
            {
                name: component.data.x,
                type: 'pie',
                radius : '55%',
                center: ['50%', '60%'],
                data: arr,
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    });
}
function line(component){
    var arr = new Array();
    for(var i = 0; i < component.data.legend.length; i++){
        var obj = {
            name: component.data.legend[i],
            type: 'line',
            data: component.data.xdata[i]
        }
        arr[i] = obj;
    }
    var myChart = echarts.init(document.getElementById('main'));
    myChart.setOption({
        title: {
            text: component.data.title
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: component.data.legend
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        toolbox: {
            feature: {
                saveAsImage: {}
            }
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: component.data.x
        },
        yAxis: {
            type: 'value'
        },
        series: arr
    });

}
function littleTitle(component){
    var p = document.createElement('p');
    p.setAttribute('class', 'col-md-12');
    p.setAttribute('align', 'center');
    p.setAttribute('style', 'margin-left: auto;margin-right: auto;line-height:75px;font-size:2em;');
    p.innerText = component.data;
    $('#main').append(p);
}
function paragraph(component){
    var p = document.createElement('p');
    p.setAttribute('class', 'col-md-12');
    p.setAttribute('align', 'center');
    p.innerText = component.data;
    $('#main').append(p);
}