$(function(){
	var marker, map = new AMap.Map('OutDoorMap', {
           zoom: 18,
           resizeEnable:true,
  });
  var driving = new AMap.Driving({
        map: map,
        resizeEnable:true,
        panel: "panel"

    })


   var windowHeight=$(window).height();
   $('#OutDoorMap').css({height:windowHeight})
   $('.searchPage').css({height:windowHeight})
   $('.LocationPage').css({height:windowHeight});
    $('.indoorMap').css({height:windowHeight})

	$('.OutDoorInput').bind('touchstart',function(){
		$('#OutDoorMap').css({display:'none'});
		$('.searchPage').css({display:'block'});
	})
	$('.spanOne').bind('touchstart',function(){
		$('#OutDoorMap').css({display:'block'});
		$('.searchPage').css({display:'none'});
	})
	$('.spanTwo').bind('touchstart',function(){
		$('#OutDoorMap').css({display:'none'});
		$('.LocationPage').css({display:'block'})
	})
	$('.LocaIcone').bind('touchstart',function(){
		$('#OutDoorMap').css({display:'block'});
		$('.LocationPage').css({display:'none'})
	})
    var infoWindow = new AMap.InfoWindow({
        isCustom: true,  //使用自定义窗体
        /* content: createInfoWindow(title, content.join("<br/>")),*/
        content:createTwowindow()
    });
    $('.amap-copyright').css({display:'none'});
	var parkOnff=true;
 

	$('.footIcotwo').bind('touchstart',function(){
        $('.panel').css({display:'none'})
        $.ajax({
            type: "post",
            url: "http://222.73.146.46:8089/carseeker/nearPark/getNearParking",
            data:{longitude:lng,latitude:lat,radius:'5'},
            dataType: "JSON",
            success: function(e){
                  if(e !== null){
                      console.log(e);
                    if(parkOnff){
                        console.log(e[0].name);
                        var Index=0;
                        e.forEach(function(){
                            $('.ParkWrap').append('<div class="PmesBox"><div class="MesOneleft"><span class="ParkTitle">上海证券大厦停车场</span><div class="IcoPar"><a class="icoOne">车位：</a><span class="livingParking">28</span>/<span class="totalcount">100</span></div></div><div class="MesOneright"><img src="assets/images/btn_reservations%402x.png"></div><div class="latone"></div><div class="lngone"></div></div>');
                            $('.ParkTitle').last().html(e[Index].name);
                            $('.livingParking').last().html(e[Index].empty);
                            $('.totalcount').last().html(e[Index].park_count);
                            $('.lngone').last().html(e[Index].longitude);
                            $('.latone').last().html(e[Index].latitude);
                            Index++;

                        })

                        $('.PmesBox').click(function(){
                             var _index=$(this).index();
                             var lngone=document.getElementsByClassName('lngone');
                             var latone=document.getElementsByClassName('latone');
                              locationLng=lngone[_index].innerHTML;
                              locationLat=latone[_index].innerHTML;
                       marker = new AMap.Marker({
                          icon: "http://webapi.amap.com/theme/v1.3/markers/n/mark_b.png",
                          position: [locationLng, locationLat]
                             });
                              marker.setMap(map);
                           map.setZoomAndCenter(18, [locationLng, locationLat]);
                            $('.ParkingMes').css({display:'none'});
                                parkOnff = !(parkOnff)
                             console.log(latone[_index].innerHTML);
                             console.log(lngone[_index].innerHTML);
                          /*  map.on('click',function(){
                                infoWindow.open(map, marker.getPosition());
                            })*/
                            marker.on('click',function(e){
                                infoWindow.open(map, e.target.getPosition())
                            })
                             /* AMap.event.addListener(marker,'click',function () {
                                     

                                    infoWindow.open(map, marker.getPosition());


                                    Off=true;
                         })*/

                            })

                        $('.ParkingMes').css({display:'block'})
                        parkOnff=false;




                    }else {
                        $('.PmesBox').remove();
                        $('.ParkingMes').css({display:'none'})
                        parkOnff=true;
                    }

                }

            },
            error: function(errmsg) {
                console.log(errmsg);
            }
        });




	})
	 map.plugin('AMap.Geolocation', function() {
           geolocation = new AMap.Geolocation({
               enableHighAccuracy: true,//是否使用高精度定位，默认:true
               timeout: 10000,          //超过10秒后停止定位，默认：无穷大
               showButton:false
           });
           map.addControl(geolocation);
           geolocation.getCurrentPosition();
           AMap.event.addListener(geolocation, 'complete', onComplete);//返回定位信息
           AMap.event.addListener(geolocation, 'error', onError);      //返回定位出错信息
       });
	    var lat;
       var lng;
       function onComplete(data) {
           var str=['定位成功'];
           lat=data.position.getLat();
           lng=data.position.getLng();
           str.push('经度：' + data.position.getLng());
           str.push('纬度：' + data.position.getLat());
           str.push('精度：' + data.accuracy + ' 米');
           str.push('是否经过偏移：' + (data.isConverted ? '是' : '否'));

           console.log(str);

           return lat,lng;

       }
        function onError(data) {

       }
         $('.footIcoone').bind('touchstart',function(){
         	

           map.setZoomAndCenter(10, [lng, lat]);
       })
       $(".searOneInput").bind('keyup',keyupONe)
        function keyupONe() {
           var inputVal = $('.searOneInput').val()

           if($(".searOneInput").has(inputVal)){
            $('.OutDoorPoi').html('');
             }
           $.ajax({
               url: 'http://restapi.amap.com/v3/assistant/inputtips?s=rsv3',
               dataType: "jsonp",
               data:"key=f5c1c2e865c690c810bc7b310ebc0f14&callback=jsonpcallback&platform=JS&logversion=2.0&sdkversion=1.3&appname=http%3A%2F%2Flbs.amap.com%2Ffn%2Fiframe%2F%3Fid%3D2674&csid=3B7DCA86-ECEA-4881-9A05-42F119662357&keywords="+$(this).val(),
               jsonp: "callback",
               success: function (data) {
                if(data.length=0){
                  return;
                }
                for(var i=0;i<7;i++){

var wwa=$('<div class="OutDorPoiBox POI_search"><div class="PoiIcon"><img src="assets/images/ico_location%402x.png"></div><div class="OpBoxMes"><span class="PoiSearMes searchPOIMES"></span><a class="mmoA"></a><div class="GeoHide"></div></div></div>')                                             
                      $('.POI_search').bind('touchstart',searchOneFun);

                         $('.OutDoorPoi').append(wwa);

                        
                        }

                    $('.searchPOIMES').each(function(index, el) {
                    $(this).html(data.tips[index].name)
                    });
                    $('.mmoA').each(function(index, el) {
                    $(this).html(data.tips[index].district)
                    });
                    $('.GeoHide').each(function(index, el) {
                    $(this).html(data.tips[index].location)
                    });



                     
                      
                }

           })
         

       }



      
       var locatinName=null;
       var ooddoc=null;
       getLocalStorage()
       function getLocalStorage(){
           ppctw =localStorage.getItem('favorite');
            console.log(ppctw.length);
            var localSot=$('<div class="OutDorPoiBox"><div class="PoiIcon"><img src="assets/images/ico_location%402x.png"></div><div class="OpBoxMes"><span class="PoiSearMes"></span><a class="dommoca"></a></div></div>');
            

              $('.LocalStorageBox').append(localSot);
        }
         $('.PoiSearMes').html(ppctw);
         $('.dommoca').html(ooddoc);

    $('.locaSaTwo').bind('touchstart',function(event) {
      /* Act on the event */
      localStorage.clear();
      $('.OutDorPoiBox').css({display:'none'})
    });
       function searchOneFun(){
         if (marker) {
         marker.setMap(null);
           marker = null;
           }
           $('.searchPOIMES').each(function(a,b){
               console.log()
           })



        var mmdc=document.getElementsByClassName('searchPOIMES');
        var ooc=document.getElementsByClassName('GeoHide');
        var mesOi=document.getElementsByClassName('searchPOIMES');
        var mmexpression=document.getElementsByClassName('mmoA');
         $(this).addClass('active').siblings().removeClass('active');
    
         var  mmos=$(this).index();
        var latNglocation= ooc[mmos].innerHTML;
        var strs=new Array();
        strs=latNglocation.split(',');
        locationLng=strs[0];
        locationLat=strs[1];
        console.log(locationLng+'+'+locationLat);
         ooddoc= mmexpression[mmos].innerHTML;
         console.log(ooddoc);
           locatinName =mesOi[mmos].innerHTML;

           localStorage.setItem('favorite',locatinName);
           for(var i=0;i<5;i++){

            $('.OutDoorInput').val(mmdc[mmos].innerHTML);

           }

          addMarker(); 
           $('.OutDoorPoi').html('');
           $('.searOneInput').val('');
           keyupONe();
           var searchMEs=$('.searchPOIMES').val();
           console.log(searchMEs);

           console.log($('.OutDoorInput').val());
           infoWindow.setContent(info-middle.html())
           console.log(content);
       }

    function addMarker() {
        if (marker) { return;}
        marker = new AMap.Marker({
            icon: "http://webapi.amap.com/theme/v1.3/markers/n/mark_b.png",
            position:[locationLng ,locationLat]
        });
        marker.setMap(map);
        map.setZoomAndCenter(15, [locationLng, locationLat]);
        $('#OutDoorMap').css({display:'block'});
        $('.searchPage').css({display:'none'});
        AMap.event.addListener(marker,'touchstart',function () {
          

            infoWindow.open(map, marker.getPosition());


            var Off=true;
      })

    }



    var title = '';
    var content = [];
    

   
   

    function createTwowindow(){
        var info = document.createElement("div");
        info.className = "info";
        var top = document.createElement("div");

        var closeX = document.createElement("img");
        var topIcon=document.createElement("div");
        var topImg=document.createElement('img');

        topImg.src='assets/images/ico_arrow_white%402x.png'
        topImg.className='topicImg'

        topIcon.appendChild(topImg);
        top.appendChild(topIcon);
        top.className = "info-top";


        top.onclick = cometo;



        top.appendChild(closeX);
        info.appendChild(top);


        var middle = document.createElement("div");
        middle.className = "info-middle";
        middle.style.backgroundColor = 'white';


        info.appendChild(middle);
        return info;

    }

    //构建自定义信息窗体
    function createInfoWindow(title, content) {
       var info = document.createElement("div");
         info.className = "info";
        var top = document.createElement("div");

        var closeX = document.createElement("img");
        var topIcon=document.createElement("div");
        var topImg=document.createElement('img');
        
         topImg.src='assets/images/ico_arrow_white%402x.png'
         topImg.className='topicImg'
        
         topIcon.appendChild(topImg);
         top.appendChild(topIcon);
        top.className = "info-top";


        top.onclick = cometo;
       


        top.appendChild(closeX);
        info.appendChild(top);

      
        var middle = document.createElement("div");
        middle.className = "info-middle";
        middle.style.backgroundColor = 'white';
        middle.innerHTML = content;
        info.appendChild(middle);

        console.log(infoWindow.getContent());
        return info;
    }
      function closeInfoWindow() {
           map.clearInfoWindow();
       }

   
  
    function cometo(){
        if (marker) {
           marker.setMap(null);
           marker = null;
           }

           AMap.service(["AMap.Driving"], function() { //加载地理编码
          Adriving = new AMap.Driving({
             map: map,
            panel: "panel",
            extensions: "all"
        });
          Adriving.search(new AMap.LngLat(lng, lat), new AMap.LngLat(locationLng, locationLat),function(a,b){
            console.log(b.routes.length);
          
          });
       
        
    });    closeInfoWindow();
           $('.panel').css({display:'block'})
           $('.footMiddle').css({display:'block'})
        /* driving.search(new AMap.LngLat(lng, lat), new AMap.LngLat(locationLng, locationLat));*/
      }
     $('.LocaIcoTwo').bind('touchstart',function(){
     var startVal = $('.OutDoorStart').val();
     var desVal = $('.OutDoorLoca').val();
     console.log(startVal+'+'+desVal);
     driving.search([
        {keyword: startVal},
        {keyword:desVal}
    ]);
     $('#OutDoorMap').css({display:'block'});
     $('.LocationPage').css({display:'none'})

     })
    $('.changeIMg').bind('touchstart',function(){
      var  reverseA=$('.OutDoorStart').val();
      var  reverseB=$('.OutDoorLoca').val();

        $('.OutDoorLoca').val(reverseA);
        $('.OutDoorStart').val(reverseB);




    })

       var infoOnff=true;
    $('.footMiddle').bind('touchstart',function(){
     if(infoOnff){
      $('.panel').css({display:'none'});
         infoWindow.open(map, [locationLng,locationLat]);
      infoOnff=false;
     }else{
      $('.panel').css({display:'block'});
       closeInfoWindow();
      infoOnff=true;
     }





        


  })
    $('.info-middle').bind('touchstart',function(){
        console.log(1)
    })
    
  


     

        
         

          


    
        

	
})