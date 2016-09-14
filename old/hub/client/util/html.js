
// Helper for building html strings.
var build = function(tag, body, attributes, clazz) {
	var head = '<' + tag;
	if(clazz)
		head += ' class="' + clazz + '"'
	for (attribute in attributes) {
		if(attributes[attribute] === false) continue;
		head += ' ' + attribute + '="' + attributes[attribute] + '"';
	}
	return head += body ? ">" + body + "</" + tag + ">" : "/>";
};

var buildTableRow = function(contents) {
	var output = '';
	for(var i = 0; i < contents.length; i++)
		output += build('td', contents[i])
	return output;
};
