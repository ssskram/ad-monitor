// hydrates the wholeeeeee store

import * as React from "react";
import { connect } from "react-redux";
import { ApplicationState } from "../../store";
import * as user from "../../store/user";
import * as events from "../../store/events";

class Hydrate extends React.Component<any, {}> {
  componentDidMount() {
    this.props.loadUser();
    this.props.loadEvents();
  }

  public render() {
    return null;
  }
}

export default connect(
  (state: ApplicationState) => ({
    ...state.user,
    ...state.events
  }),
  {
    ...user.actionCreators,
    ...events.actionCreators
  }
)(Hydrate);
