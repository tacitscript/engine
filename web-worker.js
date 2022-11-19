importScripts("//cdnjs.cloudflare.com/ajax/libs/systemjs/0.19.47/system.js");
importScripts("//cdnjs.cloudflare.com/ajax/libs/ramda/0.27.1/ramda.js");
importScripts("systemjs.config.js");

let messages = [];
let tree = {};
let player = 1;
let ply = 1;

addEventListener("message", ({data}) => {
  messages.push(data);
});

Promise.all([
  System.import("ui/logic/module.js"),
  System.import("noughts-and-crosses/logic/module.js")
]).then(([{iterateTree}, {getInitialState, getResult, getNextStates}]) => {
  let stop = false;

  const postState = () => postMessage({
    type: "MOVE",
    payload: {
      board: tree.state,
      nextStates: R.addIndex(R.map)(({type, description}, index) => ({type, description, index}))(getNextStates({player, tree})),
      description: tree.description
    }
  });

  const processMessage = message => {
    switch(message.type) {
      case "INIT":
        tree = {
          state: getInitialState(),
          N: 0,
          W: 0,
          bestLines: []
        };
        player = 1;
        ply = 1;
        postState();
        break;

      case "ACTION":
        tree = tree.childStates[message.payload];
        player = (player === 1) ? -1 : 1;
        ply += 1;
        postState();
        break;

      case "ITERATE": 
        iterateTree({tree, getNextStates, getResult,  player, ply});
        break;

      case "GET_BEST_LINES":
        postMessage({type: "BEST_LINES", payload: tree.bestLines});
        break;

      case "STOP":
        stop = true;

      default: ;
    } 
    
  };

  const processNextMessage = () => {
    processMessage(messages.length ? messages.shift() : {type: "ITERATE"});

    // timeout here otherwise we don't receive messages
    if (!stop) setTimeout(processNextMessage, 0);
  };

  processNextMessage();
});
