/*document.getElementById("trackID").addEventListener("click", function(event)
{
	event.preventDefault();
	var track_ID = document.getElementById('inp').value;
	$.ajax
	({
		async: true,
		type: "GET",
		cors: true,
		contentType:'application/json',
		secure: true,
		crossDomain: true,
		url: urlForAll + "delivery/track/" + track_ID,
		headers: 
		{
		  'Accept': 'application/json',
		  'Content-Type': 'application/json'
		},
		success: function(data) 
		{
			window.open('trackID.html#' + track_ID, '_blank');
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			$('#myModal').modal();
		}
	});
});*/
/*
document.getElementById("displayApp").addEventListener('click', function(e){
	if(document.getElementById('addOverlay').contains(e.target))
	{	
	}
	else{
		$('#addOverlay').removeClass(' active');
		$('#oneHide').fadeOut('slow');
	}
	if(document.getElementById('addOverlay_1').contains(e.target))
	{	
	}
	else{
		$('#addOverlay_1').removeClass(' active');
		$('#oneHide_1').fadeOut('slow');
	}
	if(document.getElementById('addOverlay_2').contains(e.target))
	{	
	}
	else{
		$('#addOverlay_2').removeClass(' active');
		$('#oneHide_2').fadeOut('slow');
	}
	if(document.getElementById('addOverlay2').contains(e.target))
	{
	}
	else{
		$('#addOverlay2').removeClass(' active');
		$('#oneHide2').fadeOut('slow');
	}
	if(document.getElementById('addOverlay3').contains(e.target))
	{
	}
	else{
		$('#addOverlay3').removeClass(' active');
		$('#oneHide3').fadeOut('slow');
	}
	if(document.getElementById('addOverlay4').contains(e.target))
	{
	}
	else{
		$('#addOverlay4').removeClass(' active');
		$('#oneHide4').fadeOut('slow');
	}
});*/

$(document).ready(function () {
	$('#panelName').html("Organization's Panel");
	$('#imageOverlay5').css('display', 'block');
	$('#imageOverlay').css('display', 'block');
	$(".owl-carousel").owlCarousel({
		autoplay: true,
		autoplayTimeout: 10000,
		autoplayHoverPause: true,
		loop: true,
		margin: 10,
		responsiveClass: true,
		navText: ["<i class='fa fa-chevron-left' aria-hidden='true'></i>", "<i class='fa fa-chevron-right' aria-hidden='true'></i>"],// If you want to change next and previous text to font-awesome icon.
		responsive: {
			0: {
				items: 1,
				nav: false,
				dots: true,
				margin: 0
			},
			600: {
				items: 1,
				nav: false,
				dots: true,
				margin: 25
			},
			768: {
				items: 1,
				nav: false,
				dots: true,
				margin: 25
			},
			992: {
				items: 2,
				nav: false,
				dots: true,
				margin: 25
			},
			1200: {
				items: 2,
				nav: false,
				dots: true,
				margin: 25
			}
		}
	});

	ScrollOut({
		targets: '#flineT, #fline2T-quixx, #fline3T-quixx, #fline4T-quixx, #fline5T-quixx, #fline6T-quixx, #fline21T-quixx, #fline22T-quixx, #fline23T-quixx, #fline24T-quixx, #fline25T-quixx, #fline26T-quixx'
	});
	sessionStorage.setItem('userEmail', '66736hbsjiaq@quixx.xyz');
	sessionStorage.setItem('user', 'Org_quixx_128vjjs8ms1D');
	sessionStorage.setItem('NginxCode', 'eyJhbGciOiJIUzUxMiJ9nJSDdniaqmc.8jj128jc91912hnck');
	sessionStorage.setItem('Nginx', 'eyJhbGciOiJIUzUxMiJ9nJSDdniaqmcdomnueUU9Hskcm');
	sessionStorage.setItem('token', 'quixx_sYcokRnusnsn832ndjASeyJhbGciOiJIUzUxMiJ9nJSDdniaqmcp.sh28mcoaOawhNsiW.lt7ImlkIjoxMywicm9sZU5hbWUiOiJNRVJDSEFOVCJ9XSwiaWQiOjEyLCJ1c2VyTmFtZSI6Im1lcmNoYW50cHJpdG9tY3NlZHVAZ2');
	sessionStorage.setItem('tokenTimestamp', 'eyJhbGciOiJIUzUxMiJ9nJSDdniaqmcp.sh28mcoaOawhNsiW.lt7ImlkIjoxMywicm9sZU5hbWUiOiJNRVJDSEFOVCJ9XSwiaWQiOjEyLCJ1c2VyTmFtZSI6Im1lcmNoYW50cHJpdG9tY3NlZHVAZ2');
	sessionStorage.setItem('userID', 'x._2c*sni');
	sessionStorage.setItem('UserID_1quixx', 'zomUhsnnao1SSd1');
	/*
	$('#oneHide').css('display','none');
	$('#oneHide_1').css('display','none');
	$('#oneHide_2').css('display','none');
	$('#oneHide2').css('display','none');
	$('#oneHide3').css('display','none');
	$('#oneHide4').css('display','none');
	$('#addOverlay').removeClass(' active');
	$('#addOverlay_1').removeClass(' active');
	$('#addOverlay_2').removeClass(' active');
	$('#addOverlay2').removeClass(' active');
	$('#addOverlay3').removeClass(' active');
	$('#addOverlay4').removeClass(' active');
	*/

});
document.getElementById('goToo').addEventListener("click", function (event) {
	event.preventDefault();
	$(".navLink").find(".active-link").removeClass("active-link");
	window.location.hash = "signup";
});
document.getElementById('goTooo').addEventListener("click", function (event) {
	event.preventDefault();
	$(".navLink").find(".active-link").removeClass("active-link");
	window.location.hash = "signup";
});
function cleanAllImage() {
	/*
	$('#imageOverlay5').css('display','block');
	$('#imageOverlay').css('display','block');
	
	$('#oneHide').fadeOut('slow');
	$('#oneHide_1').fadeOut('slow');
	$('#oneHide_2').fadeOut('slow');
	$('#oneHide2').fadeOut('slow');
	$('#oneHide3').fadeOut('slow');
	$('#oneHide4').fadeOut('slow');

	$('#addOverlay').removeClass(' active');
	$('#addOverlay_1').removeClass(' active');
	$('#addOverlay_2').removeClass(' active');
	$('#addOverlay2').removeClass(' active');
	$('#addOverlay3').removeClass(' active');
	$('#addOverlay4').removeClass(' active');
	$('#imageOverlay_1').css('display','none');
	$('#imageOverlay_2').css('display','none');
	$('#imageOverlay2').css('display','none');
	$('#imageOverlay3').css('display','none');
	$('#imageOverlay4').css('display','none');
	$('#imageOverlay5').css('display','none');
	*/
}
/*
$('#addOverlay').click(function(e){ 
  cleanAllImage();
  $('#imageOverlay').css('display','block');
  $('#addOverlay').addClass(' active');
  $('#oneHide').fadeIn('slow');
  $('#oneHide').css('display','block');
});
$('#addOverlay_1').click(function(e){ 
  cleanAllImage();
  $('#imageOverlay_1').css('display','block');
  $('#addOverlay_1').addClass(' active');
  $('#oneHide_1').fadeIn('slow');
  $('#oneHide_1').css('display','block');
});
$('#addOverlay_2').click(function(e){ 
  cleanAllImage();
  $('#imageOverlay_2').css('display','block');
  $('#addOverlay_2').addClass(' active');
  $('#oneHide_2').fadeIn('slow');
  $('#oneHide_2').css('display','block');
});
$('#addOverlay2').click(function(e){
  cleanAllImage();
  $('#imageOverlay2').css('display','block');
  $('#addOverlay2').addClass(' active');
  $('#oneHide2').fadeIn('slow');
  $('#oneHide2').css('display','block');
});
$('#addOverlay3').click(function(e){ 
  cleanAllImage();
  $('#imageOverlay3').css('display','block');
  $('#addOverlay3').addClass(' active');
  $('#oneHide3').fadeIn('slow');
  $('#oneHide3').css('display','block');
});
$('#addOverlay4').click(function(e){  
  cleanAllImage();
  $('#imageOverlay4').css('display','block');
  $('#addOverlay4').addClass(' active');
  $('#oneHide4').fadeIn('slow');
  $('#oneHide4').css('display','block');
});
*/
$("#myCarousel").on("slide.bs.carousel", function (e) {
	var $slide = $(e.relatedTarget);
	if ($slide.data("who") == "Org") {
		$('#panelName').html("Organization's Panel");
	} else {
		$('#panelName').html("Merchant's Panel");
	}
});

$('ol.carousel-indicators li').on("click", function () {
	$('ol.carousel-indicators li.active').removeClass("active");
	$(this).addClass("active");
});

$(".carousel-control").focus(function () {
	$(this).blur();
});

$(".pricing-card:nth-child(2)").mouseover(function () {
	$("#pop").css("background-color", "white");
});
$(".pricing-card:nth-child(2)").mouseout(function () {
	$("#pop").css("background-color", "#fff73b");
});

$('#play_store').click(function (e) {
	window.open("https://play.google.com/store/apps/details?id=com.teamd.quixx", "_blank");
});

document.querySelectorAll(".order-btn").forEach(buttonX =>

	buttonX.addEventListener("click", function (event) {
		event.preventDefault();
		$(".navLink").find(".active-link").removeClass("active-link");
		window.location.hash = "signup";
	})
);

/*
var currentPic = 0;
var opacity = 1;
var numOfPics = 3;
var maxOpacity = 1;
var minOpacity = 0;
var speed = 50;
var timer = 3000;
var pics = [];

pics[0] = "../assets/static/img/phone_myTest2.jpg";
pics[1] = "../assets/static/img/phone_myTest3.jpg";
pics[2] = "../assets/static/img/phone_myTest4.jpg";

function fadeOut(element, speed) {
	  
	if(window.location.hash == "#home"){
	  opacity-=0.1

	  element.style.opacity = opacity;

	  if(opacity<=minOpacity) {
		
		return true;
	  }

	  setTimeout(fadeOut.bind(null, element, speed), speed);
	}
}

function fadeIn(element, speed) {
	
	if(window.location.hash == "#home"){
	  opacity+=0.1
	  //console.log(element);
	  element.style.opacity = opacity;
	  if(opacity>=maxOpacity) {
		
		return true;
	  }

	  setTimeout(fadeIn.bind(null, element, speed), speed);
	}
}

function imageSliderOut() {
	
	if(window.location.hash == "#home"){
		var slider = document.getElementById("imageOverlay");

		fadeOut(slider, speed);

		currentPic++;

		$('#description').html("");
		if(currentPic===numOfPics) {
			currentPic=0;
		}

		setTimeout("imageSliderIn()", (timer/3));
	}
}

function imageSliderIn() {
	
	if(window.location.hash == "#home"){
	  var slider = document.getElementById("imageOverlay");

	  slider.src = pics[currentPic];
	  var myString = slider.src.slice(-10);
		
		if(myString=="yTest3.jpg"){
			
			$('#description').html("Receiver's Location on Map and Delivery Status");
		}
		else if(myString=="yTest2.jpg"){
			
			$('#description').html("Details of a Delivery");
		}
		else if(myString=="yTest4.jpg"){
			
			$('#description').html("Assigned Deliveries to Delivery Agent");
		}
	  fadeIn(slider, speed);
	  setTimeout("imageSliderOut()", timer);	
	}
}

if(window.location.hash == "#home"){
	imageSliderIn();
}*/
var vairevai = 0;
/*var mqi = window.matchMedia( "(min-width: 992px)" );

if (mqi.matches) {
	
	var daynight=document.getElementById("our");
	var daynight2=document.getElementById("clients");
  // window width is at least 500px
} else {
	var daynight=document.getElementById("our");
	var daynight2=document.getElementById("clients");
	daynight.style.textIndent="-15%";	
	daynight2.style.textIndent="15%";	
  // window width is less than 500px
}*/

var slideshowImages;
var nextImageDelay;
var currentImageCounter; // setting a variable to keep track of the current image (slide)
var setIn;
clearInterval(setIn);
//console.log("start");
slideshowImages = document.querySelectorAll(".intro-slideshow img");
//console.log(slideshowImages);
nextImageDelay = 3000;
currentImageCounter = 0; // setting a variable to keep track of the current image (slide)

//slideshowImages[currentImageCounter].style.display = "block";
slideshowImages[currentImageCounter].style.opacity = 1;
//console.log(setIn+ "HOME");
setIn = setInterval(nextImage, nextImageDelay);
//console.log(setIn);
function nextImage() {
	$('#description').css('display', 'none');
	$('#description').fadeOut('slow');
	// slideshowImages[currentImageCounter].style.display = "none";
	slideshowImages[currentImageCounter].style.opacity = 0;

	currentImageCounter = (currentImageCounter + 1) % slideshowImages.length;
	if (currentImageCounter === 1) {

		$('#description').html("");
		$('#description').fadeIn('slow');
		$('#description').css('display', 'block');
		$('#description').html("Receiver's Location on Map and Delivery Status");
	}
	else if (currentImageCounter === 2) {

		$('#description').html("");
		$('#description').fadeIn('slow');
		$('#description').css('display', 'block');
		$('#description').html("Details of a Delivery");
	}
	else if (currentImageCounter === 3) {

		$('#description').html("");
		$('#description').fadeIn('slow');
		$('#description').css('display', 'block');
		$('#description').html("Assigned Deliveries to Delivery Agent");
	}
	else {
		$('#description').html("");
		$('#description').fadeIn('slow');
		$('#description').css('display', 'block');
	}
	//console.log(currentImageCounter);
	// slideshowImages[currentImageCounter].style.display = "block";
	slideshowImages[currentImageCounter].style.opacity = 1;
}
