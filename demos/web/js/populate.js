function createDemoLink(description, href, imgSrc) {
	var link = document.createElement("a");
	link.setAttribute("class", "sample-item");
	link.href = href;
	
	var img = document.createElement("img");
	img.setAttribute("alt", description);
	img.src = imgSrc;
	
	var span = document.createElement("span");
	span.setAttribute("class", "title");
	span.innerHTML = description;
	
	link.appendChild(img);
	link.appendChild(span);
	
	return link;
}

function populate(nodeName, demos) {
	var samples = document.getElementById(nodeName);
	
	for (var i = 0, l = demos.length; i < l; i++) {
		samples.appendChild(createDemoLink(demos[i].desc, demos[i].link, demos[i].img));
	}
}