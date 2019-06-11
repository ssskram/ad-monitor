import * as React from "react";
import Spinner from "../utilities/spinner";
import JSONInput from "react-json-editor-ajrm";
import locale from "react-json-editor-ajrm/locale/en";

type props = {
  match: any; // query params
};

type state = {
  event: object;
};

export default class FullEvent extends React.Component<props, state> {
  constructor(props) {
    super(props);
    this.state = {
      event: undefined
    };
  }

  componentDidMount() {
    this.getEvent(this.props.match.params.id);
  }

  async getEvent(id) {
    const event = await fetch(
      "https://active-directory.azurewebsites.us/loginEvents/singleEvent?id=" +
        id,
      {
        method: "get",
        headers: new Headers({
          Authorization: "Bearer " + process.env.REACT_APP_ACTIVE_DIRECTORY,
          Accept: "application/json"
        })
      }
    );
    const json = await event.json();
    this.setState({
      event: json
    });
  }

  render() {
    return (
      <div
        className="col-md-10 col-md-offset-1"
        style={{ paddingBottom: "50px" }}
      >
        {this.state.event && (
          <JSONInput
            id="json"
            placeholder={this.state.event}
            locale={locale}
            viewOnly={true}
            confirmGood={false}
            onKeyPressUpdate={false}
            height="auto"
            width="auto"
            style={{
              body: { padding: "10px 0px" }
            }}
          />
        )}
        {!this.state.event && <Spinner notice="...loading event record..." />}
      </div>
    );
  }
}
