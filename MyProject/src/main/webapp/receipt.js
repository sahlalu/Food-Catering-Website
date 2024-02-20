function generatePDF(){
	const element = document.getElementById("page");
	
	html2pdf()
	.from(element)
	.save();
}