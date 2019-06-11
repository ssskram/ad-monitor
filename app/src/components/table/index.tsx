import * as React from "react";
import { Link } from "react-router-dom";
import * as types from "../../store/types";
import ReactTable from "react-table";
import "react-table/react-table.css";
const moment = require("moment");

type props = {
  filterable: boolean;
  containerWidth: string;
  pageSize: number;
  events: types.event[];
};

export default class Table extends React.Component<props, {}> {
  render() {
    const columns = [
      {
        Header: "Time",
        accessor: "time",
        Cell: props => (
          <div>{moment(props.value).format("MM/DD/YYYY hh:mm A")}</div>
        ),
        filterable: false
      },
      {
        Header: "User",
        accessor: "userName"
      },
      {
        Header: "City",
        accessor: "city"
      },
      {
        Header: "State",
        accessor: "state"
      },
      {
        Header: "Country",
        accessor: "country"
      },
      {
        Header: "Application",
        accessor: "appName"
      },
      {
        Header: "",
        accessor: "id",
        Cell: props => (
          <Link to={"/LoginEvent/id=" + props.original.id}>
            <button className="btn">
              <span className="glyphicon glyphicon-eye-open" />
            </button>
          </Link>
        ),
        maxWidth: 65,
        filterable: false
      }
    ];

    return (
      <div
        className={this.props.containerWidth}
        style={{ marginBottom: "50px" }}
      >
        {this.props.events && (
          <ReactTable
            data={this.props.events.sort(
              (a, b) => +new Date(b.time) - +new Date(a.time)
            )}
            columns={columns}
            loading={false}
            minRows={0}
            filterable={this.props.filterable}
            pageSize={this.props.pageSize}
            showPageSizeOptions={false}
            noDataText=""
          />
        )}
      </div>
    );
  }
}
