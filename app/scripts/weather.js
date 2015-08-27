"use strict";

if("geolocation" in navigator) {
	navigator.geolocation.getCurrentPosition(function(position){
		loadWeather(position.coords.latitude + ',' + position.coords.longitude);
	});
} else {
	loadWeather("London", "IN", "");
}

$(window).on('load', function() {
		// Animate loader off screen
		$(".se-pre-con").fadeOut("slow");
	});

jQuery(document).ready(function($) {
	setTimeout(loadWeather, 2000);
	// setInterval(loadWeather, 2000);
});

function loadWeather(location, woeid, unit){
	$.simpleWeather({
		location: location,
		woeid: woeid,
		unit: 'c',
		success: function(weather){
			console.log(weather);
			console.log(weather.code);

			// Handle location font size
			if( this.location.length > 11 ){
				$('.location').css('font-size', '4.0em');
			}

			if( this.location.length > 19 ){
				$('.location').css('font-size', '3.0em');
			}

			// Handle location font size on phone screens
			if (Modernizr.mq('(max-width: 480px)')) {
				if( this.location.length < 11){
				    $('.location').css('font-size', '2em');
				}
				else if( this.location.length >= 11 && this.location.length < 18){
				    $('.location').css('font-size', '2.0em');
				}
				else if( this.location.length >= 18 ){
				    $('.location').css('font-size', '1.0em');
				}
			}

			// Assign object vars to shortened names
			var city = weather.city;
			var temp = weather.temp;
			var wcode = '<img class="weathericon" src="images/weathericons/' + weather.code + '.svg">';
			var wind = '<p>' + weather.wind.speed + '</p><p>' + weather.units.speed + '</p>';
			var humidity = weather.humidity + '%';
			var currently = weather.currently;
			var text = '';
			var country = weather.country;
			if(currently !== weather.text){
				text = weather.text;
			}

			// Handle current weather font size
			if(currently.length >= 1 && currently.length <= 4){
				$('.currently').css('font-size', '100%');
			}
			if(currently.length >= 5 && currently.length <= 9){
				$('.currently').css('font-size', '90%');
			}
			if(currently.length >= 10 && currently.length <= 13){
				$('.currently').css('font-size', '80%');
			}
			if(currently.length >= 13 && currently.length <= 22){
				$('.currently').css('font-size', '70%');
			}

			// Assign shortened variables to DOM classes
			$('.code').text('CODE: ' + weather.code);
			$('.location').text(city);
			$('.temperature').html(temp);
			$('.climate_bg').html(wcode);
			$('.windspeed').html(wind);
			$('.humidity').text(humidity);
			$('.currently').text(currently);
			$('.text').text(text);
			$('.country').text(country)

			// Assign background image links to variables
			var sunnyImg 	= "http://u.kanobu.ru/comments/images/92025b04-c980-46da-8859-66f64c997468.jpg";
			var rainyImg 	= "http://webneel.com/wallpaper/sites/default/files/images/04-2013/cute-rain-in-mirror.jpg";
			var cloudyImg 	= "http://p1.pichost.me/i/31/1542826.jpg";
			var snowyImg 	= "https://wallpaperscraft.com/image/snow_white_background_surface_79574_2560x1440.jpg";
			var clearImg_n 	= "http://images.summitpost.org/original/472297.jpg";
			var cloudyImg_n = "https://c1.staticflickr.com/1/92/211605391_782caa152f_b.jpg";

			function changeBgImg(linkToImg) {
				return $('body').css('background-image', 'url(' + linkToImg + ')');
			}
			// Set background images
			var c = parseInt(weather.code);
			switch(true) {
				// Rainy
				case (c >= 0 && c <= 12 || c === 35 || c >= 37 && c <= 40 || c >= 45 && c <= 47):
					changeBgImg(rainyImg);
					break;
				// Sunny
				case (c === 19 || c === 21 || c === 22 || c === 32 || c === 34 || c === 36):
					changeBgImg(sunnyImg);
					break;
				// Cloudy
				case (c === 20 || c >= 23 && c <= 26 || c === 28 || c === 30):
					changeBgImg(cloudyImg);
					break;
				// Snow

				case (c >= 13 && c <= 18 || c === 41 || c === 42 || c === 46):
					changeBgImg(snowyImg);
					break;
				// Cloudy (night)
				case (c === 27 || c === 29):
					changeBgImg(cloudyImg_n);
					break;
				// Clear (night)
				case (c === 31 || c === 33):
					changeBgImg(clearImg_n);
					break;
				default:
					changeBgImg('http://www.imgbase.info/images/safe-wallpapers/animals/cat/37493_cat_kitten_orange_kitten.jpg');
					break;
			};

			// Greying or whiting C and F
			var activeCelsius = function(){
				$('.temperature').html(temp);
				$('.celsius-box').css('color', 'white');
				$('.fahrenheit-box').css('color', 'gray');
			};

			activeCelsius();

			$('.celsius-box').on('click', function() {
				activeCelsius();
			});

			var celsToFahr = Math.round(((parseInt(temp) * 9) / 5) + 32);

			$('.fahrenheit-box').on('click', function() {
				$('.temperature').html(celsToFahr);
				$('.fahrenheit-box').css('color', 'white');
				$('.celsius-box').css('color', 'gray')
			});
		},

		error: function(error){
			$('.error').html('<p>' + error + '</p>');
		}
	});
}