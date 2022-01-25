import React, { useEffect, useState } from "react";
import "./App.css";
import ListView from "./components/ListView";
import { Measurement, MeasurementType } from "./Types";
import MeasurementModal from "./components/MeasurementModal";
import { webApiUrl, isNullOrWhitespace } from "./utilities";
import { Button } from "react-bootstrap";

function App() {
    const [measurementTypes, setMeasurementTypes] = useState<MeasurementType[]>([]);
    const [measurementList, setMeasurementList] = useState<Measurement[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedMeasurement, setSelectedMeasurement] = React.useState<Measurement>(null);

    useEffect(() => {
        fetchMeasurementTypes();
        fetchMeasurements();
    }, []);

    function fetchMeasurementTypes() {
        (async () => {
            const rawResponse = await fetch(`${webApiUrl}/MeasurementTypes`);
            const result = await rawResponse.json();
            setMeasurementTypes(result as MeasurementType[]);
        })();
    }

    function fetchMeasurements() {
        (async () => {
            const rawResponse = await fetch(`${webApiUrl}/Measurements`);
            const result = await rawResponse.json();
            setMeasurementList(result as Measurement[]);
        })();
    }

    const handleEditMeasurementClick = (id: number) => {
        const m = measurementList.find(x => x.id === id);
        setSelectedMeasurement(m);
        setShowModal(true);
    };

    const handleDeleteMeasurement = (id: number) => {
        (async () => {
            const rawResponse = await fetch(`${webApiUrl}/Measurements/${id}`, {
                method: "DELETE",
            });

            if (rawResponse.ok) {
                fetchMeasurements();
            } else {
                console.log(rawResponse.statusText);
            }
        })();
    };

    const handleSaveMeasurement = (measurement: Measurement) => {
        if (selectedMeasurement === null) {
            //add
            (async () => {
                const rawResponse = await fetch(`${webApiUrl}/Measurements`, {
                    method: "POST",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        ...measurement,
                        measurementTypeId: measurement.measurementTypeId ?? measurementTypes[0],
                        value2: isNullOrWhitespace(measurement.value2) ? null : measurement.value2,
                    }),
                });
                const response = await rawResponse.json();
                console.log(response);
                fetchMeasurements();
            })();
        } else {
            //edit
            (async () => {
                const rawResponse = await fetch(`${webApiUrl}/Measurements/${measurement.id}`, {
                    method: "PUT",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        ...measurement,
                        value2: isNullOrWhitespace(measurement.value2) ? null : measurement.value2,
                    }),
                });
                if (rawResponse.ok) {
                    fetchMeasurements();
                }
            })();
        }
    };

    const handleShowModal = (show: boolean) => {
        if (!show) {
            setSelectedMeasurement(null);
        }
        setShowModal(show);
    };

    return (
        <div className="app-container">
            <div className="modal-action-bar">
                <Button
                    variant="primary"
                    onClick={() => {
                        setSelectedMeasurement(null);
                        console.log(selectedMeasurement);
                        setShowModal(true);
                    }}
                >
                    New Measurement
                </Button>
            </div>
            <MeasurementModal
                showModal={showModal}
                measurementToEdit={selectedMeasurement}
                measurementTypes={measurementTypes}
                handleSave={handleSaveMeasurement}
                handleShowModal={handleShowModal}
            ></MeasurementModal>
            <h2>Measurement History</h2>
            <ListView
                measurements={measurementList}
                handleEdit={handleEditMeasurementClick}
                handleDelete={handleDeleteMeasurement}
            ></ListView>
        </div>
    );
}

export default App;
