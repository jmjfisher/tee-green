$("#f9b").click(function(){
    
    $('.hole').css('display','none');
    $('.br-div').css('display','none');
    $('.table').hide();
    $('#google-map').hide();
    
    $('.front-9').css('display','inline');
    $('.br-div-f').css('display','block');
    
});

$("#b9b").click(function(){
    
    $('.hole').css('display','none');
    $('.br-div').css('display','none');
    $('.table').hide();
    $('#google-map').hide();
    
    $('.back-9').css('display','inline');
    $('.br-div-b').css('display','block');
    
});

$(".hole").click(function(){
    
	if (navigator.geolocation){
        
		navigator.geolocation.getCurrentPosition(geoEnabled,
                                                 errorCallback,
                                                 {maximumAge:0,timeout:0,enableHighAccuracy:true})
    };
    
    $('.table').hide();
    $('#google-map').hide();
    
    var hole = parseInt($(this).attr("id"),10);
    $('#hole-text').html("<b>"+hole.toString()+"</b>")
    
    function geoEnabled(position){
        
        var userLat = position.coords.latitude;
        var userLon = position.coords.longitude;
        var course = $('#course').val();
        
        $('#google-map').attr("href", "https://www.google.com/maps/search/?api=1&query="+userLat+","+userLon)

        var q1 = "SELECT ST_Distance((select the_geom_webmercator ";
        var q2 = "ST_Transform('SRID=4326;POINT("+userLon+" "+userLat+")'::geometry, 3857))*cosd("+userLat+") as distance";
        var qt = "from fisherjohnmark.golf where course ='"+course+"' and hole="+hole+" and torg='T'),";
        var qg = "from fisherjohnmark.golf where course ='"+course+"' and hole="+hole+" and torg='G'),";

        var teeQuery = q1+qt+q2;
        var greenQuery = q1+qg+q2;
        var url = "https://fisherjohnmark.carto.com/api/v2/sql?q=";

        var teeAPI = url+teeQuery;
        var greenAPI = url+greenQuery;

        $.getJSON(teeAPI, function(data){
            teeYards = Math.round(1.09361*data.rows[0].distance);
            $('#tee-text').html("<b>"+teeYards+"</b>")
        });
        $.getJSON(greenAPI, function(data){
            GreenYards = Math.round(1.09361*data.rows[0].distance);
            $('#green-text').html("<b>"+GreenYards+"</b>")
            $('.table').show();
            $('#google-map').show();
        });
    };
    
    function errorCallback(error){
        
      switch(error.code) {
              
        case error.TIMEOUT:
            navigator.geolocation.getCurrentPosition(geoEnabled,
                                                     errorCallback,
                                                     {maximumAge:0,enableHighAccuracy:true})
            break;
      };
    };
    
});