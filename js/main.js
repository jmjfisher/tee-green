$("#number").change(function(){
    
    var front = ["1","2","3","4","5","6","7","8","9"]
    var back = ["10","11","12","13","14","15","16","17","18"]
    
    if ($('#number').val() == "f9") {
        $('.hole').css('display','none');
        var i;
        for (i = 0; i < front.length; i++) {
            $("#"+front[i]).show();
        };
    } else if ($('#number').val() == "b9") {
        $('.hole').css('display','none');
        var i;
        for (i = 0; i < front.length; i++) {
            $("#"+back[i]).show();
        };
    } else if ($('#number').val() == "a18") {
        $('.hole').css('display','none');
        var i;
        for (i = 0; i < front.length; i++) {
            $("#"+front[i]).show();
        };
        var i;
        for (i = 0; i < front.length; i++) {
            $("#"+back[i]).show();
        };
    } else if ($('#number').val() == "refresh") {
        $('.hole').css('display','none');
    };
});

$(".hole").click(function() {
    
    var hole = parseInt($(this).attr("id"),10);
    
	if ("geolocation" in navigator) {
        
		navigator.geolocation.getCurrentPosition(function(position){
            
            var userLat = position.coords.latitude;
            var userLon = position.coords.longitude;
            var course = $('#course').val();
            
            var q1 = "SELECT ST_Distance((select the_geom_webmercator ";
            var q2 = "ST_Transform('SRID=4326;POINT("+userLon+" "+userLat+")'::geometry, 3857))*cosd("+44.928378+") as distance";
            var qt = "from fisherjohnmark.golf where course ='"+course+"' and hole="+hole+" and torg='T'),";
            var qg = "from fisherjohnmark.golf where course ='"+course+"' and hole="+hole+" and torg='G'),";
            
            var teeQuery = q1+qt+q2;
            var greenQuery = q1+qg+q2;
            var url = "https://fisherjohnmark.carto.com/api/v2/sql?q=";
            
            var teeAPI = url+teeQuery;
            var greenAPI = url+greenQuery;
            
            $.getJSON(teeAPI, function(data){
                teeYards = Math.round(1.09361*data.rows[0].distance);
                $('#tee-text').html(teeYards)
            });
            $.getJSON(greenAPI, function(data){
                GreenYards = Math.round(1.09361*data.rows[0].distance);
                $('#green-text').html(GreenYards)
            });
            
            $('.table').show();
            
        });
        
	};
    
});