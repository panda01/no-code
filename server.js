const express = require('express');
const fs = require('fs');

const server = express();
// to receive actual 
server.use(express.json());
server.post('/make-page', function(request, response) {
	console.log(request.body);

	// Get the unique list of components so we can write imports
	const componentNameMap = {};
	request.body.allComponents.map(function(component) {
		componentNameMap[component.name] = true;
	});
	const componentImportList = Object.keys(componentNameMap);
	console.log('Component Import List', componentImportList);

	// create a files and start writing to it
	const outputFile = fs.createWriteStream('output.jsx');
	// TODO eventually to be able to still add and manipulate things can
	// use markers like "//--computer_generated--" to find the code to edit
	outputFile.write('//--computer_generated-- import code\n');
	
	// write the import list
	for(let idx = 0; idx < componentImportList.length; idx++) {
		const file = componentImportList[idx];
		outputFile.write(`import ${file} from './components/${file}';\n`);
	}



	outputFile.end();

	response.json({hello: 'world'});
});

server.listen(8080);
console.log('Server started, listening on port 8080');
