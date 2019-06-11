import * as React from "react";
import { connect } from "react-redux";
import { ApplicationState } from "../../store";
import * as types from "../../store/types";
import * as events from "../../store/events";
import Map from "../map";
import Table from "../table";
import Spinner from "../utilities/spinner";

type props = {
  events: types.event[];
  loadEvents: () => void;
};

export class Home extends React.Component<props, {}> {
  componentDidMount() {
    this.props.loadEvents();
    window.scrollTo(0, 0);
  }

  shouldComponentUpdate(nextProps: props, nextState) {
    if (nextProps.events) {
      if (nextProps.events.length == this.props.events.length) return false;
      else return true;
    } else return true;
  }

  render() {
    return (
      <div>
        <h4 className="text-center ubuntu" style={{ color: "grey" }}>
          Previous 48 hours where login == success && state != PA
        </h4>
        <Map events={this.props.events} />
        <br />
        <br />
        <Table
          filterable={true}
          events={this.props.events}
          containerWidth="col-md-10 col-md-offset-1"
          pageSize={100}
        />
        <br />
        <br />
        {this.props.events.length == 0 && (
          <Spinner notice="...loading login events..." />
        )}
      </div>
    );
  }
}

export default connect(
  (state: ApplicationState) => ({
    ...state.events
  }),
  {
    ...events.actionCreators
  }
)(Home as any);
