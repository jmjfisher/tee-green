$("#update").click(function(){
    
    var course = $('#u-course').val();
    var hole = parseInt($('#u-hole').val(),10);
    var torg = $('#u-torg').val();
    var key = $('#APIkey').val();
    
    function geoEnabled(position){
        
        var userLat = position.coords.latitude;
        var userLon = position.coords.longitude;

        var q1 = "UPDATE fisherjohnmark.golf SET the_geom = ST_SetSRID(ST_Point("+userLon+","+userLat+"), 4326) ";
        var q2 = "WHERE course='"+course+"' and hole="+hole+" and torg='"+torg+"'";
        var url = "https://fisherjohnmark.carto.com/api/v2/sql?q=";
        var apikey = "&api_key="+key;

        var updateAPI = url+q1+q2+apikey;

        $.getJSON(updateAPI, function(data){
            alert("Update successful!");
        });
    };
    
    function geoDisabled(){
        
        alert("Please enable your Geolocation!");
    };
    
	if (navigator.geolocation){
        
		navigator.geolocation.getCurrentPosition(geoEnabled,geoDisabled,{maximumAge:0,timeout:5000,enableHighAccuracy:true})
    };
    
});