function parseGetParams() {
    var $_GET = {};
    var __GET = window.location.search.substring(1).split("&");
    for(var i=0; i<__GET.length; i++) {
        var getVar = __GET[i].split("=");
        $_GET[getVar[0]] = typeof(getVar[1])=="undefined" ? "" : getVar[1];
    }
    return $_GET;
}
function initPagination() {
    pagination.querySelectorAll('li > a').forEach(function (elem) {
        elem.addEventListener('click',function (e) {
            e.preventDefault();
            sendData(this.innerText);
        });
    })
}
function setPagination(current,count) {
    var str='';
    for(var i=1;i<count+1;i++){
        str+= '<li class="'+((current==i) ? 'active' : '') +'"><a href="#" >'+i+'</a></li>';
    }
    pagination.innerHTML=str;
    initPagination();
}
function sendData(page) {
    var getReq = new XMLHttpRequest();
    var str = encodeURIComponent(input.value);
    page = (typeof page !== 'object') ? page : false;
    var url=window.location.pathname+((str.length>0 || page) ? '?' : '')+((str.length>0) ? 'filter='+str : '')+((str.length>0 && page) ? '&' : '')+((page) ? 'page='+page : '');

    getReq.open('POST',url);

    getReq.onload = function() {
        var str='';
        if(this.responseText && this.status==200){
            history.pushState(null, null, url);
            var arr=JSON.parse(this.responseText);
            arr.episodes.forEach(function (ep) {
                str+='<tr>'+
                    '<td><img src="'+ep.image.medium+'"></td>'+
                    '<td>'+ep.name+'</td>'+
                    '<td>'+ep.summary+'</td>'+
                    '</tr>';
            });
            setPagination(arr.current,arr.count);
        }
        listEpisodes.innerHTML = str;
    };

    getReq.send();
}
function initFilter() {
    var arr=parseGetParams();
    if(arr['filter']){
        input.value=arr['filter'];
    }
}

var input = document.getElementById('filter'),
    clearFilter = document.getElementById('filter-clear'),
    filterButton = document.getElementById('filter-button'),
    listEpisodes = document.getElementById('list-episodes'),
    pagination = document.getElementsByClassName('pagination')[0];


filterButton.addEventListener('click',sendData);
input.addEventListener('keypress',function (e) {
    if(e.keyCode==13)
        sendData();
});
clearFilter.addEventListener('click',function () {
   input.value="";
   sendData();
});

initFilter();
initPagination();

