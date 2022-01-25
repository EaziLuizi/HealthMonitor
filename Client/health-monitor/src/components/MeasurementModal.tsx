import React, { FunctionComponent, useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";

import { Measurement, MeasurementType } from "../Types";

interface AddMeasurementModalProps {
    measurementTypes: MeasurementType[];
    handleSave: (item: Measurement) => void;
    showModal?: boolean;
    measurementToEdit?: Measurement;
    handleShowModal: (show: boolean) => void;
}

const MeasurementModal: FunctionComponent<AddMeasurementModalProps> = props => {
    const [show, setShow] = useState(props.showModal ?? false);
    const [measurement, setMeasurement] = React.useState<Measurement>(null);

    useEffect(() => {
        setShow(props.showModal);

        setMeasurement({ ...props.measurementToEdit });
    }, [props.showModal, props.measurementToEdit]);

    const handleMeasurementTypeChange = (event: any) => {
        setMeasurement({ ...measurement, measurementTypeId: event.target.value });
        console.log(measurement);
    };

    const handleValueChange = (event: any) => {
        setMeasurement({ ...measurement, value: event.target.value });
    };

    const handleValue2Change = (event: any) => {
        setMeasurement({ ...measurement, value2: event.target.value });
    };

    return (
        <>
            <Modal show={show} onHide={() => props.handleShowModal(false)} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>New Measurement</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Label>Measurement Type</Form.Label>
                        <Form.Select
                            className="mb-3"
                            aria-label="Measurement Type"
                            onChange={handleMeasurementTypeChange}
                            value={measurement?.measurementTypeId}
                        >
                            <option key="measurement_blank_0" value={null}></option>
                            {props.measurementTypes.map(item => {
                                return (
                                    <option key={item.id} value={item.id}>
                                        {item.name}
                                    </option>
                                );
                            })}
                        </Form.Select>
                        <Form.Group className="mb-3" controlId="measurementValue">
                            <Form.Label>Primary Value</Form.Label>
                            <Form.Control type="number" value={measurement?.value} onChange={handleValueChange} />
                            <Form.Group className="mb-3" controlId="measurementValue2"></Form.Group>
                            <Form.Label>Secondary Value</Form.Label>
                            <Form.Control type="number" value={measurement?.value2} onChange={handleValue2Change} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => props.handleShowModal(false)}>
                        Close
                    </Button>
                    <Button
                        variant="primary"
                        onClick={() => {
                            props.handleSave(measurement);
                            props.handleShowModal(false);
                        }}
                    >
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default MeasurementModal;
