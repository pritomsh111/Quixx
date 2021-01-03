var urlAjax;

if(localStorage.getItem('user') == 'SUPER_ADMIN')
{
	urlAjax = urlForAll + "deliveryMan/all/";
}
else if(localStorage.getItem('user') == 'ORGANIZATIONAL_ADMIN')
{
	urlAjax = urlForAll + "deliveryMan/getDeliveryManByUserId/" + localStorage.getItem('userID');
}
else if(localStorage.getItem('user') == 'MANAGER')
{
	urlAjax = urlForAll + "deliveryMan/getDeliveryManByUserId/" + localStorage.getItem('userID');
}
else
{
	window.location = ("https://quixx.xyz");
}