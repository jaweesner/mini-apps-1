var $ = jQuery;
const URL = "http://127.0.0.1:3000/"
$(document).ready(()=>{
	$('.submit').on('click', function(e){
		e.preventDefault(); //prevent console clear
		postHandler($('.inputText').val());
		$('.inputText').val('');
	})
})

var postHandler= function(body){
	fetch(URL, {
		method: "POST",
		//headers: {"content-type":"application/json"},
		body: body
	}).then((response)=>console.log(response.statusCode))
	.catch(err => console.log(err));
}
