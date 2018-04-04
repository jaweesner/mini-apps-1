var $ = jQuery;
const URL = "http://127.0.0.1:3000/"
$(document).ready(()=>{
	$('.fileSelect').on('change', function(e){
		reader = new FileReader();
		reader.onload = (e) =>$('.inputText').val(e.target.result);
		
		reader.readAsText(this.files[0])
	})
	$('.submit').on('click', function(e){
		e.preventDefault(); //prevent console clear
		postHandler($('.inputText').val());
		$('.inputText').val('');
	})
})

var postHandler= function(body){
	fetch(URL, {
		method: "POST",
		headers: {"content-type":"application/json"},
		body: JSON.stringify({info: body})
	})
	.then((response)=> response.text())
	.then((resolve) => $('.csv').html(resolve.replace(/\n/g, "<br />")))
	.catch(err => console.log(err));
}
