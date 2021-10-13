const express = require('express');
const fs = require('fs');

const server = express();

const OUTPUT_DEST_DIR = 'output/src/';

function makeRespFn(msg) {
	return function(err) {
		if(err) {
			throw err;
		}
		console.log(msg);
	};
}

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
	const outputFile = fs.createWriteStream(OUTPUT_DEST_DIR + 'App.tsx');
	// TODO eventually to be able to still add and manipulate things can
	// use markers like "//--computer_generated--" to find the code to edit
	outputFile.write('//--computer_generated-- import code\n');

	const COMPONENTS_DIR = OUTPUT_DEST_DIR + 'components/';

	const componentsFolderExists = fs.existsSync(COMPONENTS_DIR);
	if(componentsFolderExists) {
		console.log('Trying to remove component');
		fs.rmSync(COMPONENTS_DIR, { recursive: true }, makeRespFn('Components Dir Del'));
	}
	fs.mkdirSync(COMPONENTS_DIR, makeRespFn('Components Dir Made'));
	
	// write the import list
	for(let idx = 0; idx < componentImportList.length; idx++) {
		const file = componentImportList[idx];
		// copy the component file over to the new build
		fs.copyFile(
			`src/components/${file}.tsx`,
			`${COMPONENTS_DIR}${file}.tsx`,
			makeRespFn(`Component copied: ${file}.tsx`)
		);
		outputFile.write(`import ${file} from './components/${file}';\n`);
	}
	outputFile.write('\n\n');
	outputFile.write(`function App() {
	return (
		<div>`);
	for(let idx = 0; idx < request.body.allComponents.length; idx++) {
		const componentObj = request.body.allComponents[idx];
		outputFile.write(`
			<${componentObj.name} />`);
	}
	outputFile.write(`
		</div>
	);\n}\n`);

	outputFile.write('export default App;');

	outputFile.end();


	response.json({hello: 'world'});
});

server.listen(8080);
console.log('Server started, listening on port 8080');
