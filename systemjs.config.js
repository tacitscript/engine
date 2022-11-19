(function (global) {
  System.config({
    transpiler: 'plugin-babel',
    paths: {
      "npm:": 'https://unpkg.com/',
      "react": "https://cdnjs.cloudflare.com/ajax/libs/react/16.8.6/umd/react.development.js",
      "react-dom": "https://cdnjs.cloudflare.com/ajax/libs/react-dom/16.8.6/umd/react-dom.development.js",
      "ramda": "https://cdnjs.cloudflare.com/ajax/libs/ramda/0.26.1/ramda.min.js",
      "ramda25": "https://cdnjs.cloudflare.com/ajax/libs/ramda/0.25.0/ramda.js",
      "redux": "https://cdnjs.cloudflare.com/ajax/libs/redux/4.0.1/redux.min.js",
      // development to enable material-ui override theming
      "material-ui": "https://unpkg.com/@material-ui/core@3.9.3/umd/material-ui.development.js",
      "react-scrollbars-custom": 
        //"third-party/react-scrollbars-custom.production_4.0.0-alpha.19.min.js",
      "https://unpkg.com/react-scrollbars-custom@4.0.0-alpha.10/dist/cjs/index.js",
      "prop-types": "https://cdnjs.cloudflare.com/ajax/libs/prop-types/15.7.2/prop-types.min.js",
      "react-draggable": "https://cdn.jsdelivr.net/npm/react-draggable@3.2.1/dist/react-draggable.min.js",
      "cnbuilder": "https://unpkg.com/cnbuilder@1.0.9/dist/cnbuilder.js",
      "history": "https://cdnjs.cloudflare.com/ajax/libs/history/4.9.0/history.min.js",
      "underscore": "https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.9.1/underscore-min.js",
      "react-flip-move": "https://unpkg.com/react-flip-move@3.0.3/dist/react-flip-move.min.js"
    }, 
    map: {
      // babel transpiler
      'plugin-babel': 'npm:systemjs-plugin-babel@0.0.25/plugin-babel.js',
      'systemjs-babel-build': 'npm:systemjs-plugin-babel@0.0.25/systemjs-babel-browser.js',
    },
    meta: {
    '*.jsx': {
      babelOptions: {
        react: true
      }
    }
  }
  });
})(this);