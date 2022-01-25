import React, { FunctionComponent, useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import { Measurement } from "../Types";
import { formatStringDate, formatStringTime } from "../utilities";

interface ListViewProps {
    measurements: Measurement[];
    handleDelete: (id: number) => void;
    handleEdit: (id: number) => void;
}

const ListView: FunctionComponent<ListViewProps> = props => {
    useEffect(() => {}, [props.measurements]);

    return (
        <Table className="striped bordered hover size='sm'">
            <thead>
                <tr>
                    <th>Type</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Value</th>
                    <th>2nd Value</th>
                    <th></th>
                </tr>
            </thead>
            <tbody className="flex-tbl-body">
                {(!props.measurements || props.measurements.length === 0) && (
                    <tr>
                        <td colSpan={6} className="text-center">
                            No Measurements found
                        </td>
                    </tr>
                )}
                {props.measurements.map((item, index) => {
                    return (
                        <tr key={item.id}>
                            <td>{item.measurementType?.name}</td>
                            <td>{formatStringDate(item.dateTime)}</td>
                            <td>{formatStringTime(item.dateTime)}</td>
                            <td>{item.value}</td>
                            <td>{item.value2}</td>
                            <td>
                                <Button variant="primary" size="sm" onClick={() => props.handleEdit(item.id)}>
                                    Edit
                                </Button>
                                &nbsp;
                                <Button variant="danger" size="sm" onClick={() => props.handleDelete(item.id)}>
                                    Delete
                                </Button>
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </Table>
    );
};

export default ListView;
