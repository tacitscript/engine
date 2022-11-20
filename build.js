var Builder = require('systemjs-builder');
var fs = require("fs");

// es6 + jsx -> es5
// sets the baseURL and loads the configuration file
const builder = new Builder('./', `./systemjs.config.js`);

builder.buildStatic(`./ui/logic/main.js`, `./engine.js`, {
	minify: true,
	globalName: "engine",
	globalDeps: {
		"react": "React",
		"react-dom": "ReactDOM",
		"jquery": "$",
		"material-ui": "MaterialUI",
		"react-scrollbars-custom": "Scrollbar",
		"ramda": "R",
		"react-flip-move": "FlipMove",
	}
}).then(function() {
	console.log('engine build complete');
}).catch(function(err) {
	console.log('engine build error');
	console.log(err);
	process.exit(1);
});
