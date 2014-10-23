$(function(){

	/*-----------------------------Map------------------------------*/

	var infowindowArr = [];  

	function initialize() {
	  	var mapOptions = {
	    	zoom: 13,
            zoomControl: true,
            mapTypeControl:false,
	    	center: new google.maps.LatLng(47.02686, 28.841551)
	  	}

	  	var map = new google.maps.Map(document.getElementById('map_canvas'), mapOptions);
	                                
		setTimeout(function() {setMarkersTerminals(map, terminalsArr)}, 1000);
	    setTimeout(function() {setMarkersOffices(map, officesArr)}, 2000);
	    setTimeout(function() {setMarkersBanks(map, banksArr)}, 3000);

    }

    // Terminals

    var markersTerminals = [];

    var terminalsArr = [
    	['Terminal 1', 47.02686, 28.841551, 0], ['Terminal 2', 47.03686, 28.861551, 0], ['Terminal 3', 47.04686, 28.871551, 0], ['Terminal 4', 47.02686, 28.851551, 0], ['Terminal 5', 47.05686, 28.851551, 0]
    ];
    
    function setMarkersTerminals(map, locations) {      
      var image = new google.maps.MarkerImage('./img/point-red.png',          
          new google.maps.Size(30, 40),
          new google.maps.Point(0,0),          
          new google.maps.Point(0, 40));

      var shape = { coord: [1, 1, 1, 20, 18, 20, 18 , 1],  type: 'poly' };

      for (var i = 0; i < locations.length; i++) {
        var terminal = locations[i];
        var myLatLng = new google.maps.LatLng(terminal[1], terminal[2]);
        var marker = new google.maps.Marker({
            position: myLatLng,
            map: map,            
            icon: image,
            shape: shape,
            animation: google.maps.Animation.DROP,
            zIndex: terminal[3]
        });
        
        marker.setTitle(terminal[0].toString());              
        markersTerminals.push(marker);
      } 
    }    

    // Offices

    var markersOffices = [];

    var officesArr = [
    	['Главный офис',  47.02786, 28.891541, 0, '<div class="info-window"><br>Главный офис</div>'], ['Филиал 1',  47.01686, 28.821551, 0, '<div class="info-window"><br>Филиал 1</div>']
    ];
    
    function setMarkersOffices(map, locations) { 

      var image = new google.maps.MarkerImage('./img/point-green.png',          
          new google.maps.Size(30, 40),
          new google.maps.Point(0,0),          
          new google.maps.Point(0, 40));

      var shape = { coord: [1, 1, 1, 20, 18, 20, 18 , 1],  type: 'poly' };

      for (var i = 0; i < locations.length; i++) {
        var office = locations[i];
        var myLatLng = new google.maps.LatLng(office[1], office[2]);
        var marker = new google.maps.Marker({
            position: myLatLng,
            map: map,            
            icon: image,
            shape: shape,
            animation: google.maps.Animation.DROP,
            zIndex: office[5]
        });
        
        marker.setTitle(office[0].toString());        
        attachMessage(marker,office[4]);        
        markersOffices.push(marker);
      } 
    }    
   
    // Banks

    var markersBanks = [];

    var banksArr = [
    	['Bank 1', 47.03786, 28.841551, 0], ['Bank 2', 47.02786, 28.871551, 0], ['Bank 3', 47.02786, 28.831551, 0], ['Bank 4', 47.01786, 28.881551, 0]    
    ];
    
    function setMarkersBanks(map, locations) {      
      var image = new google.maps.MarkerImage('./img/point-blue.png',          
          new google.maps.Size(30, 40),
          new google.maps.Point(0,0),          
          new google.maps.Point(0, 40));
          
      var shape = { coord: [1, 1, 1, 20, 18, 20, 18 , 1],  type: 'poly' };
      
      for (var i = 0; i < locations.length; i++) {
        var bank = locations[i];
        var myLatLng = new google.maps.LatLng(bank[1], bank[2]);
        var marker = new google.maps.Marker({
            position: myLatLng,
            map: map,            
            icon: image,
            shape: shape,
            animation: google.maps.Animation.DROP,
            zIndex: bank[4]
        });
        
        marker.setTitle(bank[0].toString());        
        markersBanks.push(marker);
      }
    }
          
    function attachMessage(marker, message) {
        
        var infowindow = new google.maps.InfoWindow({
          content: message,
          maxWidth: 200
        });

        google.maps.event.addListener(infowindow, 'domready', function(){
            $('.gm-style-iw').next('div').hide();
            $('.info-window').parent().parent().css('width' , 'auto');
        });
        
        google.maps.event.addListener(marker, 'click', function() {     
            infowindow.open(marker.get('map'), marker);
            infowindowArr.push(infowindow);
        });

        infowindow.open(marker.get('map'), marker);

    }
    
	google.maps.event.addDomListener(window, 'load', initialize);

    $('.map-wrapper').click(function(){
        $('.map-wrapper > div').css('pointer-events', 'auto');
    });

	/*----------------------Sticky Sidebar---------------------*/

	var length = $('.sticky-container').height() - $('.form-info').height() + $('.sticky-container').offset().top;

    $(window).scroll(function(){
        var scroll = $(this).scrollTop();
        var height = $('.form-info').height() + 'px';
        if (scroll < $('.sticky-container').offset().top){
            $('.form-info').css({
                'position': 'absolute',
                'top': '0'
            });
        } else if (scroll > length){
            $('.form-info').css({
                'position': 'absolute',
                'bottom': '0',
                'top': 'auto'
            });
        } else {
            $('.form-info').css({
                'position': 'fixed',
                'top': '12px',
                'height': height
            });
        }
    });

    /*-----------------------Money Header----------------------*/

    var $page = $('html,body'),
        $body = $('body');

    function scrollToPage(target) {
        var y = 0;
        if (target && $(target).length) {
            y = $(target).offset().top;
        }
        $page.animate({scrollTop: y}, 'slow', 'swing');
    }
 
    $body.on('click', '.header-bottom-block a, .header-top-block nav a, .foo-bottom-block > nav a', function(e){
        e.preventDefault();
        scrollToPage($(this).attr('href'));
    });

    $(window).scroll(function(){
        var position = $(this).scrollTop();
        if (position <= 200){
            $('.bg-1').css({'bottom' : position - 300 + 'px'});
            $('.bg-2').css({'bottom' : position - 250 + 'px'});
            $('.bg-3').css({'bottom' : position - 200 + 'px'});
        }
    });   

    /*----------------------Table Slide-----------------------*/

    function creditSumm(){
	    $('.table-credits .summ > strong').each(function(){
	    	var data = $(this).find('span').text();
			var max = 150000;
	    	var width = Math.round(data / (max / 100));
	    	$(this).next().find('.summ-current').css('width' , width + '%');
	    });
	}  

	function creditDate(){
	    $('.table-credits .date > strong').each(function(){
	    	var data = $(this).find('span').text();
			var max = 36;
	    	var width = Math.round(data / (max / 100));
	    	$(this).next().find('.date-current').css('width' , width + '%');
	    });
	}  

    $(window).scroll(function(){
        var scroll = $(this).scrollTop();
	    var current = $('.list-of-credits-block');
		var offset = current.offset();
		if (scroll >= offset.top - 200){
			creditSumm();
			creditDate();
		}
	});	

    function tableTick(){ 
        $('.table-credits tbody tr:last-child').animate({'opacity' : '0'}, 400, function(){$(this).prependTo($('.table-credits tbody')).animate({'opacity' : '1'}, 800);});
    } 

    setInterval(function(){tableTick()}, 5000); 

	/*-------------------------Form----------------------------*/


	$('#slider-summ-type-one .slider-summ').slider({
		range:'min',
		value:5000,
		min:500,
		max:15000,
		step:500,
		slide: function(event, ui){
			$('#slider-summ-type-one .current-summ > span').text(ui.value + ' лей');
			var left = $('#slider-summ-type-one .slider-summ .ui-slider-handle').css('left');
			var marginLeft = $('#slider-summ-type-one .current-summ').outerWidth() / 2 - 10;
			$('#slider-summ-type-one .current-summ').css({'left' : left, 'margin-left' : - marginLeft + 'px'});
            $('#slider-summ-type-one .slider-block').siblings('div').removeClass('active');
		},
		stop: function(event, ui){
			var left = $('#slider-summ-type-one .slider-summ .ui-slider-handle').css('left');
			var marginLeft = $('#slider-summ-type-one .current-summ').outerWidth() / 2 - 10;
			$('#slider-summ-type-one .current-summ').css({'left' : left, 'margin-left' : - marginLeft + 'px'});
            $('#slider-summ-type-one input[type="hidden"]').val($('.slider-summ').slider('value'));
		}
	});

	$('#slider-date-type-one .slider-date').slider({
		range:'min',
		value:6,
		min:1,
		max:36,
		step:1,
		slide: function(event, ui){
			$('#slider-date-type-one .current-date > span').text(ui.value + ' месяцев');
			var left = $('#slider-date-type-one .slider-date .ui-slider-handle').css('left');
			var marginLeft = $('#slider-date-type-one .current-date').outerWidth() / 2 - 10;
			$('#slider-date-type-one .current-date').css({'left' : left, 'margin-left' : - marginLeft + 'px'});
            $('#slider-date-type-one .slider-block').siblings('div').removeClass('active');
		},
		stop: function(event, ui){
			var left = $('#slider-date-type-one .slider-date .ui-slider-handle').css('left');
			var marginLeft = $('#slider-date-type-one .current-date').outerWidth() / 2 - 10;
			$('#slider-date-type-one .current-date').css({'left' : left, 'margin-left' : - marginLeft + 'px'});
            $('#slider-date-type-one input[type="hidden"]').val($('.slider-date').slider('value'));
		}
	});

    $('#slider-summ-type-two .slider-summ').slider({
        range:'min',
        value:15000,
        min:500,
        max:150000,
        step:500,
        slide: function(event, ui){
            $('#slider-summ-type-two .current-summ > span').text(ui.value + ' лей');
            var left = $('#slider-summ-type-two .slider-summ .ui-slider-handle').css('left');
            var marginLeft = $('#slider-summ-type-two .current-summ').outerWidth() / 2 - 10;
            $('#slider-summ-type-two .current-summ').css({'left' : left, 'margin-left' : - marginLeft + 'px'});
            $('#slider-summ-type-two .slider-block').siblings('div').removeClass('active');
        },
        stop: function(event, ui){
            var left = $('#slider-summ-type-two .slider-summ .ui-slider-handle').css('left');
            var marginLeft = $('#slider-summ-type-two .current-summ').outerWidth() / 2 - 10;
            $('#slider-summ-type-two .current-summ').css({'left' : left, 'margin-left' : - marginLeft + 'px'});
            $('#slider-summ-type-two input[type="hidden"]').val($('.slider-summ').slider('value'));
        }
    });

    $('#slider-date-type-two .slider-date').slider({
        range:'min',
        value:6,
        min:1,
        max:36,
        step:1,
        slide: function(event, ui){
            $('#slider-date-type-two .current-date > span').text(ui.value + ' месяцев');
            var left = $('#slider-date-type-two .slider-date .ui-slider-handle').css('left');
            var marginLeft = $('#slider-date-type-two .current-date').outerWidth() / 2 - 10;
            $('#slider-date-type-two .current-date').css({'left' : left, 'margin-left' : - marginLeft + 'px'});
            $('#slider-date-type-two .slider-block').siblings('div').removeClass('active');
        },
        stop: function(event, ui){
            var left = $('#slider-date-type-two .slider-date .ui-slider-handle').css('left');
            var marginLeft = $('#slider-date-type-two .current-date').outerWidth() / 2 - 10;
            $('#slider-date-type-two .current-date').css({'left' : left, 'margin-left' : - marginLeft + 'px'});
            $('#slider-date-type-two input[type="hidden"]').val($('.slider-date').slider('value'));
        }
    });

    $('#slider-summ-type-three .slider-summ').slider({
        range:'min',
        value:15000,
        min:500,
        max:150000,
        step:500,
        slide: function(event, ui){
            $('#slider-summ-type-three .current-summ > span').text(ui.value + ' лей');
            var left = $('#slider-summ-type-three .slider-summ .ui-slider-handle').css('left');
            var marginLeft = $('#slider-summ-type-three .current-summ').outerWidth() / 2 - 10;
            $('#slider-summ-type-three .current-summ').css({'left' : left, 'margin-left' : - marginLeft + 'px'});
            $('#slider-summ-type-three .slider-block').siblings('div').removeClass('active');
        },
        stop: function(event, ui){
            var left = $('#slider-summ-type-three .slider-summ .ui-slider-handle').css('left');
            var marginLeft = $('#slider-summ-type-three .current-summ').outerWidth() / 2 - 10;
            $('#slider-summ-type-three .current-summ').css({'left' : left, 'margin-left' : - marginLeft + 'px'});
            $('#slider-summ-type-three input[type="hidden"]').val($('.slider-summ').slider('value'));
        }
    });

    $('#slider-date-type-three .slider-date').slider({
        range:'min',
        value:6,
        min:1,
        max:36,
        step:1,
        slide: function(event, ui){
            $('#slider-date-type-three .current-date > span').text(ui.value + ' месяцев');
            var left = $('#slider-date-type-three .slider-date .ui-slider-handle').css('left');
            var marginLeft = $('#slider-date-type-three .current-date').outerWidth() / 2 - 10;
            $('#slider-date-type-three .current-date').css({'left' : left, 'margin-left' : - marginLeft + 'px'});
            $('#slider-date-type-three .slider-block').siblings('div').removeClass('active');
        },
        stop: function(event, ui){
            var left = $('#slider-date-type-three .slider-date .ui-slider-handle').css('left');
            var marginLeft = $('#slider-date-type-three .current-date').outerWidth() / 2 - 10;
            $('#slider-date-type-three .current-date').css({'left' : left, 'margin-left' : - marginLeft + 'px'});
            $('#slider-date-type-three input[type="hidden"]').val($('.slider-date').slider('value'));
        }
    });

    $('body').on('click' , '.main-form:not(:hidden) .s-summ .min' , function(e){
        e.preventDefault();
        $(this).addClass('active');
        $(this).parent('.main-form:not(:hidden) .s-summ').find('.max').removeClass('active');
        var min = $('.main-form:not(:hidden) .slider-summ').slider('option', 'min');
        $('.main-form:not(:hidden) .slider-summ').slider({value: min});
        $('.main-form:not(:hidden) .s-summ .current-summ > span').text(min + ' лей');
        var left = $('.main-form:not(:hidden) .s-summ .ui-slider-handle').css('left');
        var marginLeft = $('.main-form:not(:hidden) .s-summ .current-summ').outerWidth() / 2 - 10;
        $('.main-form:not(:hidden) .s-summ .current-summ').css({'left' : left, 'margin-left' : - marginLeft + 'px'});
        $('.main-form:not(:hidden) .s-summ input[type="hidden"]').val(min);
    });

    $('body').on('click' , '.main-form:not(:hidden) .s-summ .max' , function(e){
        e.preventDefault();
        $(this).addClass('active');
        $(this).parent('.main-form:not(:hidden) .s-summ').find('.min').removeClass('active');
        var max = $('.main-form:not(:hidden) .slider-summ').slider('option', 'max');
        $('.main-form:not(:hidden) .slider-summ').slider({value: max});
        $('.main-form:not(:hidden) .s-summ .current-summ > span').text(max + ' лей');
        var left = $('.main-form:not(:hidden) .s-summ .ui-slider-handle').css('left');
        var marginLeft = $('.main-form:not(:hidden) .s-summ .current-summ').outerWidth() / 2 - 10;
        $('.main-form:not(:hidden) .s-summ .current-summ').css({'left' : left, 'margin-left' : - marginLeft + 'px'});
        $('.main-form:not(:hidden) .s-summ input[type="hidden"]').val(max);
    });

    $('body').on('click' , '.main-form:not(:hidden) .s-date .min' , function(e){
        e.preventDefault();
        $(this).addClass('active');
        $(this).parent('.main-form:not(:hidden) .s-date').find('.max').removeClass('active');
        var min = $('.main-form:not(:hidden) .slider-date').slider('option', 'min');
        $('.main-form:not(:hidden) .slider-date').slider({value: min});
        $('.main-form:not(:hidden) .s-date .current-date > span').text(min + ' месяц');
        var left = $('.main-form:not(:hidden) .s-date .ui-slider-handle').css('left');
        var marginLeft = $('.main-form:not(:hidden) .s-date .current-date').outerWidth() / 2 - 10;
        $('.main-form:not(:hidden) .s-date .current-date').css({'left' : left, 'margin-left' : - marginLeft + 'px'});
        $('.main-form:not(:hidden) .s-date input[type="hidden"]').val(min);
    });

    $('body').on('click' , '.main-form:not(:hidden) .s-date .max' , function(e){
        e.preventDefault();
        $(this).addClass('active');
        $(this).parent('.main-form:not(:hidden) .s-date').find('.min').removeClass('active');
        var max = $('.main-form:not(:hidden) .slider-date').slider('option', 'max');
        $('.main-form:not(:hidden) .slider-date').slider({value: max});
        $('.main-form:not(:hidden) .s-date .current-date > span').text(max + ' месяцев');
        var left = $('.main-form:not(:hidden) .s-date .ui-slider-handle').css('left');
        var marginLeft = $('.main-form:not(:hidden) .s-date .current-date').outerWidth() / 2 - 10;
        $('.main-form:not(:hidden) .s-date .current-date').css({'left' : left, 'margin-left' : - marginLeft + 'px'});
        $('.main-form:not(:hidden) .s-date input[type="hidden"]').val(max);
    });

	$('.form-content .form-box').each(function(){
		var textInput = $(this).find('input[type="text"]');
		textInput.val('');
	});

	$('.form-box-select select').on('change', function(){
		var text = $(this).find('option:selected').text();
		$(this).parent().find('.fake-select').text(text);
		$(this).parent().find('.fake-select').addClass('success');
        var totalText = parseInt($('.percent-block strong span').text());
        var percentData = $(this).data('percent');
        $('.percent-block strong span').text(totalText + percentData);
        $(this).removeAttr('data-percent');
	});

	$('.fake-label').click(function(){
		$(this).parent().find('input').focus();
	});

	$('.form-box input[type="text"]').on('focusin', function(){
		var label = $(this).parent().find('.fake-label');
		label.addClass('active');
	});	

	$('.form-box input[type="text"]:not(.required)').on('focusout', function(){
		var label = $(this).parent().find('.fake-label');
	    if (!this.value){
	    	$(this).removeClass('success');
	      	$(this).addClass('error');
	      	label.removeClass('active');
            var totalText = parseInt($('.percent-block strong span').text());
            $('.percent-block strong span').text(totalText);
	    } else {
	    	$(this).removeClass('error');
	      	$(this).addClass('success');
            var totalText = parseInt($('.percent-block strong span').text());
            var percentData = $(this).data('percent');
            $('.percent-block strong span').text(totalText + percentData);
            $(this).removeAttr('data-percent');
	    }
	});

    $('.form-box input[name="idnp"]').on('focusout', function(){
        var inputVal = $(this).val();
        var characterReg = /^[0-9]{13}$/;
        if(!characterReg.test(inputVal)){
            $(this).removeClass('success');
            $(this).addClass('error');
            var totalText = parseInt($('.percent-block strong span').text());
            $('.percent-block strong span').text(totalText);
        } else{
            $(this).removeClass('error');
            $(this).addClass('success');
            var totalText = parseInt($('.percent-block strong span').text());
            var percentData = $(this).data('percent');
            $('.percent-block strong span').text(totalText + percentData);
            $(this).removeAttr('data-percent');
        }
    });

    $('.form-box input[name="email"]').on('focusout', function(){
        var inputVal = $(this).val();
        var characterReg = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
        if(!characterReg.test(inputVal)){
            $(this).removeClass('success');
            $(this).addClass('error');
            var totalText = parseInt($('.percent-block strong span').text());
            $('.percent-block strong span').text(totalText);
        } else{
            $(this).removeClass('error');
            $(this).addClass('success');
            var totalText = parseInt($('.percent-block strong span').text());
            var percentData = $(this).data('percent');
            $('.percent-block strong span').text(totalText + percentData);
            $(this).removeAttr('data-percent');
        }
    });

    $('.form-box input[name="phone"]').on('focusout', function(){
        var inputVal = $(this).val();
        var characterReg = /^[0-9\-\+]{8,15}$/;
        if(!characterReg.test(inputVal)){
            $(this).removeClass('success');
            $(this).addClass('error');
            var totalText = parseInt($('.percent-block strong span').text());
            $('.percent-block strong span').text(totalText);
        } else{
            $(this).removeClass('error');
            $(this).addClass('success');
            var totalText = parseInt($('.percent-block strong span').text());
            var percentData = $(this).data('percent');
            $('.percent-block strong span').text(totalText + percentData);
            $(this).removeAttr('data-percent');
        }
    });

    $('.list-of-types li a').click(function(){
        var parent = $(this).parent('li');
        var index = parent.index();
        parent.addClass('selected').siblings().removeClass('selected');
        $('.main-form-wrapper div.main-form').eq(index).show().siblings().hide();
    });

    $('.hidden-control').click(function(){
        var checkbox = $(this).find('input[type="checkbox"]');
        checkbox.attr('checked') ? $(this).parents('.form-item-wrap').next().slideUp() : $(this).parents('.form-item-wrap').next().slideDown();   
    });

});