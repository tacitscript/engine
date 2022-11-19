(function (global) {
	System.config({
		transpiler: 'plugin-babel-tacitscript',
		paths: {
			"npm:": 'https://unpkg.com/',
			"cdnjs:": "https://cdnjs.cloudflare.com/ajax/libs/",
		},
		map: {
			// babel transpiler
			'plugin-babel-tacitscript': 'submodules/tacitscript/common/lib/plugin-babel_c72965b.js',
			'systemjs-babel-build': 'submodules/tacitscript/common/lib/systemjs-babel-browser_c72965b.js',
			"history": "submodules/tacitscript/common/lib/history_4.7.2.js",
			"react-flip-move": "https://unpkg.com/react-flip-move@3.0.3/dist/react-flip-move.min.js",
			"react": "https://cdnjs.cloudflare.com/ajax/libs/react/16.8.6/umd/react.development.js",
			"react-dom": "https://cdnjs.cloudflare.com/ajax/libs/react-dom/16.8.6/umd/react-dom.development.js",
			"material-ui": "https://unpkg.com/@material-ui/core@3.9.3/umd/material-ui.development.js",
		},
		babelOptions: {
			modularRuntime: false,
			react: true,
		},
	});
})(this);