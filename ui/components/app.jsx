import React, {useReducer} from "react";
import {
  AppBar,
  Toolbar,
  createMuiTheme,
  colors,
  MuiThemeProvider,
  IconButton
} from "material-ui";
import Sidebar from "common/components/sidebar.jsx";
import { push } from "third-party/redux-first/actions.js";
import getSearchParams from "common/logic/get-search-params.js";
import getSidebarPanels from "../logic/get-sidebar-panels.jsx";
import Board from "noughts-and-crosses/components/board.jsx";

const {css} = Glamor;
const { grey, blueGrey } = colors;

const style = {
  display: "flex",
  flex: "1 1 auto",
  flexDirection: "column",
  " .toolbar": {
    flexDirection: "row-reverse"
  },
  " .container": {
    display: "flex",
    flex: "1 1 auto",
    " .content": {
      display: "flex",
      flex: "1 1 auto",
      backgroundImage: "url(ui/images/wood.jpg)"
    },
    " .sidebar": {
      backgroundImage: "linear-gradient( to bottom, hsla( 30, 40%, 92%, 0.4 ) 30%, hsla( 30, 40%, 75%, 0.4 ) )",
      " .ScrollbarTrack-X": {display: "none"}
    }
  }
};

const theme = createMuiTheme({
  palette: {
    type: "light",
    primary: grey,
    secondary: blueGrey
  },
  typography: {
    useNextVariants: true
  },
  overrides: {
    MuiAppBar: {
      colorPrimary: { backgroundImage: "linear-gradient(to bottom, hsl( 30, 30%, 88%) 20%, hsl( 30, 30%, 80%))!important;" }
    },
    MuiExpansionPanel: {
      expanded: {
        marginBottom: 5
      }
    },
    MuiExpansionPanelSummary: {
      root: {
        backgroundColor: "hsla( 30, 50%, 99%, 1.0 )",
        boxShadow: "0px 0px 45px hsla( 40, 30%, 50%, 0.6) inset"
      }
    },
    MuiExpansionPanelDetails: {
      root: {
        backgroundColor: "hsla( 40, 15%, 97.5%, 1.0 )",
        boxShadow: "0px 0px 5px hsla( 40, 30%, 50%, 0.6) inset",
        padding: "5px"
      }
    }
  }
});

export default ({ store }) => {
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case "STATE": return {...state, ...action.payload};
      default: ;
    }

    return state;
  }, {sidebarOpen: true});
  const {sidebarOpen} = state;
  const {app: {board}} = store.getState();

  return <MuiThemeProvider theme={theme}>
      <div {...css(style)}>
        <AppBar position="static">
          <Toolbar className="toolbar">
            <IconButton onClick={() => dispatch({type: "STATE", payload: {sidebarOpen: !state.sidebarOpen}})}>
              <i className="fas fa-cog"/>
            </IconButton>
          </Toolbar>
        </AppBar>
        <div className="container">
          <div className="content">
            <Board store={store} board={board}/>
          </div>
          <Sidebar {...{ data: getSidebarPanels(store), open: sidebarOpen }} />
        </div>
      </div>
    </MuiThemeProvider>;
};
