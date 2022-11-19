const { css } = Glamor;
import {
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Typography
} from "material-ui";

const style = {
  overflow: "hidden",
  display: "flex",
  flex: "0 0 auto",
  " .pane": {
    display: "flex",
    flex: "1 1 auto",
    " .contents": {
      display: "flex",
      flexDirection: "column",
      flex: "1 1 auto",
      overflow: "hidden",
      " .expansion-panel": {
        marginTop: "5px !important",
        " .expansion-panel-summary": {
          minHeight: "initial",
          " > div:first-child": { margin: "10px 0" },
          ".fixed": { ":hover": { cursor: "default" } }
        },
        " .expansion-panel-details": {
          display: "flex",
          flexDirection: "column",
          " .key": { whiteSpace: "nowrap" }
        }
      }
    }
  },
  " .dragger": {
    width: 7,
    minWidth: 7,
    cursor: "ew-resize"
  }
};

const startWidth = 420;

export default class extends React.Component {
  state = {
    expandedIndex: 0,
    previousWidth: startWidth,
    width: startWidth,
    isResizing: false,
    lastDownX: 0
  };
  constructor(props) {
    super(props);
    this.handleMouseMove.bind(this);
  }
  handleMouseDown = e => {
    this.setState({ isResizing: true, lastDownX: e.clientX });
  };
  handleMouseMove = e => {
    if (!this.state.isResizing) return;

    this.setState({
      width:
        (this.state.lastDownX - e.clientX) *
          (this.props.dockPosition === "LEFT" ? -1 : 1) +
        this.state.previousWidth
    });
  };
  handleMouseUp = e => {
    this.setState({ isResizing: false, previousWidth: this.state.width });
  };
  componentDidMount() {
    document.addEventListener("mousemove", e => this.handleMouseMove(e));
    // setTimeout is required otherwise mouseup handlers with the sidebar are not called; the dom seems immediately updated on setState
    document.addEventListener("mouseup", e =>
      setTimeout(this.handleMouseUp.bind(this), 0, e)
    );
  }
  handleChange = panelIndex => (event, expanded) =>
    this.setState({ expandedIndex: expanded ? panelIndex : null });
  componentWillReceiveProps = ({ expandedIndex }) => {
    if (expandedIndex != undefined) this.setState({ expandedIndex });
  };
  render = () => {
    const { data, open, dockPosition, userClosable, className } = this.props;
    const { expandedIndex, width, isResizing } = this.state;

    return (
      <div
        {...css(style)}
        className={`sidebar ${className || ""}`}
        style={{
          width: open ? width : 0,
          transition: isResizing ? "initial" : "width 0.3s"
        }}
      >
        {dockPosition !== "LEFT" ? (
          <div className="dragger" onMouseDown={this.handleMouseDown} />
        ) : null}
          <div className="pane">
            <div className="contents">
            {R.addIndex(R.map)(
              ({ title, className, panels, onMouseLeave }, index) => (
                <ExpansionPanel
                  key={index}
                  className="expansion-panel"
                  onMouseLeave={onMouseLeave || (() => {})}
                  expanded={data.length > 1 ? index === expandedIndex : true}
                  onChange={(handleChange => handleChange.bind(this)(index))(
                    this.props.handleChange || this.handleChange
                  )}
                >
                  <ExpansionPanelSummary
                    className={`expansion-panel-summary${
                      data.length <= 1 ? " fixed" : ""
                    }`}
                    expandIcon={
                      data.length > 1 ? (
                        <i className="fas fa-angle-down"/>
                      ) : userClosable ? (
                        <i className="fas fa-times"/>
                      ) : null
                    }
                  >
                    <Typography>{title}</Typography>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails
                    className={`expansion-panel-details ${
                      className ? className : ""
                    }`}
                  >
                    {R.addIndex(R.map)(
                      (jsx, panelIndex) => (
                        <div key={panelIndex}>{jsx}</div>
                      ),
                      panels
                    )}
                  </ExpansionPanelDetails>
                </ExpansionPanel>
              ),
              data
            )}
          </div>
        </div>
        {dockPosition === "LEFT" ? (
          <div className="dragger" onMouseDown={this.handleMouseDown} />
        ) : null}
      </div>
    );
  };
}
