import * as React from "react";
import * as types from "../../store/types";
import Modal from "react-responsive-modal";
import Table from "../table";

type props = {
  selectedLocation: types.event;
  events: types.event[];
  setState: (stateObj: object) => void;
};

export default class EventsPerLocation extends React.Component<props, {}> {
  render() {
    return (
      <Modal
        open={true}
        onClose={() => this.props.setState({ viewLoginsPerLocation: false })}
        classNames={{
          overlay: "custom-overlay",
          modal: "custom-modal"
        }}
        showCloseIcon={false}
        closeOnOverlayClick={true}
        center
      >
        <div>
          <h4 className="text-center oswald-header" style={{ color: "white" }}>
            Recent logins from {this.props.selectedLocation.city},{" "}
            {this.props.selectedLocation.state},{" "}
            {this.props.selectedLocation.country}
          </h4>
          <Table
            filterable={false}
            containerWidth="col-md-12"
            events={this.props.events.filter(
              e =>
                e.latitude == this.props.selectedLocation.latitude &&
                e.longitude == this.props.selectedLocation.longitude
            )}
            pageSize={5}
          />
        </div>
      </Modal>
    );
  }
}
