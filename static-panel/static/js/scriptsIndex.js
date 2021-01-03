/*
setTimeout(function()
{	
	function fade() {
		var animation_height = $(window).innerHeight() * 0.10;
		var ratio = Math.round( (1 / animation_height) * 10000 ) / 10000;

		$('div').each(function() {
			
			var objectTop = $(this).offset().top;
			var windowBottom = $(window).scrollTop() + $(window).innerHeight();
			
			if ( objectTop < windowBottom ) {
				if ( objectTop < windowBottom - animation_height ) {
					$(this).css( {
						transition: 'opacity 0.1s linear',
						opacity: 1
					} );
				}
			} 
		});
	}
	$('div').css( 'opacity', 0.1 );
	fade();
	$(window).scroll(function() {fade();});
	
},4275);

function cycleImages(){

	var $active = $('.huhu .active');
	var $next = ($active.next().length > 0) ? $active.next() : $('.huhu img:first');
	$next.css('z-index',2);//move the next image up the pile
	$active.show(5000,function(){//fade out the top image
		$active.css('display', 'block');
		$active.css('z-index',1).show().removeClass('active');//reset the z-index and unhide the image
		$next.css('display','block');
		$next.css('z-index',3).addClass('active');//make the next image the top one
		var myString = $next[0].src.slice(-10);
		if(myString=="yTest3.jpg"){
			
			$('#description').html("Receiver's Location on Map and Delivery Status");
		}
		else if(myString=="yTest2.jpg"){
			
			$('#description').html("Details of a Delivery");
		}
		else if(myString=="yTest4.jpg"){
			
			$('#description').html("Assigned Deliveries to Delivery Agent");
		}
		else{
			$('#description').html("");
		}
	});
	
}

setInterval('cycleImages()', 3000);
*/
$('#preloader').delay(6000).fadeOut('slow');
ScrollOut({
	targets: '.copyright-section .copyright-info, #contact h4, #contact i, #contact p , #contact a, #contact input, #contact textarea, #contact button, #contact label'
})
$(".navLink a").on("click", function() {
  $(".navLink").find(".active-link").removeClass("active-link");
  $(this).parent().addClass("active-link");
});

document.getElementById('logoo').addEventListener("click", function(event)
{
	event.preventDefault();
	if(window.location.hash.substr(1)!="home"){
		
		$(".navLink").find(".active-link").removeClass("active-link");
		window.location.hash = "home";
	}
});

$('.offcanvas-menu a').on('click', function() {

	document.getElementById("start").className = "js cssanimations";
	document.getElementById("page-top").className = "";
	document.getElementById("st-container").className = "st-container hippo-offcanvas-wrapper hippo-offcanvas-left slide-in-on-top";
});


$("#mesName").keyup(function(){
	$('#nameM').hide();
});
$("#mesEmail").keyup(function(){
	$('#emailM').hide();
});
$("#mesMes").keyup(function(){
	$('#mesM').hide();
});

$('#sendMessage').on('click', function(e) {
	e.preventDefault();
	
	$('#nameM').hide();
	$('#emailM').hide();
	$('#mesM').hide();
	
	var aa = document.getElementById("mesName").value;
	var bb = document.getElementById("mesEmail").value;
	var cc = document.getElementById("mesMes").value;
	var v11 = () =>
	{
		if(aa=="" || aa==null)
		{
			document.getElementById('nameM').innerHTML = "Name cannot be empty!";
			$("#nameM").show();
		    document.getElementById("mesName").focus();
			return 0;
		}
		else
		{
			return 1;
		}
	}
	var v22 = () =>
	{
		if(bb=="" || bb==null)
		{
			document.getElementById('emailM').innerHTML = "Email cannot be empty!";
			$("#emailM").show();
		    document.getElementById("mesEmail").focus();
			return 0;
		}
		else if(bb!="" || bb!=null)
		{
			var em = bb.split("@").length-1;
			var atposition = bb.indexOf("@");  
			var dotposition = bb.lastIndexOf(".");  
			if (atposition<1 || dotposition<atposition+2 || dotposition+2>=bb.length || em>1)
			{  
				document.getElementById('emailM').innerHTML = "Please enter a valid e-mail address!";					
				$("#emailM").show();
				document.getElementById("mesEmail").focus();
				return 0;
			}
			else
			{				
				return 1;
			}
		}
		
	}
	var v33 = () =>
	{
		if(cc=="" || cc==null)
		{
			document.getElementById('mesM').innerHTML = "Message cannot be empty!";
			$('#mesM').show();
		    document.getElementById("mesMes").focus();
			return 0;
		}
		else
		{
			return 1;
		}
	}
	if(v11()==1 && v22()==1 && v33()==1){
		//console.log("Hello"); ajax req
		document.getElementById('youyou').innerHTML = "Thank You!";
		$('#thankYou').modal('show');
		$.ajax
		({
			async: true,
			type: "POST",
			url: urlForAll + "message/add",
			headers: 
			{
			  'Accept': 'application/json',
			  'Content-Type': 'application/json'
			},
			data: JSON.stringify
			({
				"name" : aa,
				"email": bb,
				"txt": cc
			}),
			success: function(data) 
			{
				setTimeout(function(){
					$('#thankYou').modal('hide');
				}, 1500);
				$("#contact-form")[0].reset();
			},
			error: function(data) {
				var ob = Object.keys(data);
				if(ob[17]=="responseJSON"){
					document.getElementById('youyou').innerHTML = data.responseJSON.errorMessage;
				}
				else{
					document.getElementById('youyou').innerHTML = "Please Wait! We are working!";
				}
				//console.log(textStatus);whatIsWrong
				
			}
		});
	}
});

const mq = window.matchMedia( "(min-width: 769px)" );

if (mq.matches) {
	
	var daynight=document.getElementById("hil");
	var logoo=document.getElementById("logoo");
	daynight.style.display="none";
	logoo.style.marginTop="-2px";
  // window width is at least 500px
} else {
	var daynight=document.getElementById("hil");
	daynight.style.display="block";
	var logoo=document.getElementById("logoo");
	logoo.style.marginTop="-8px";
  // window width is less than 500px
}