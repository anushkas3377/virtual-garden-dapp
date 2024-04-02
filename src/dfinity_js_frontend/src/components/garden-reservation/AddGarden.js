import React, { useCallback, useState } from "react";
import PropTypes from "prop-types";
import { Button, FloatingLabel, Form, Modal } from "react-bootstrap";
import { LoadingButton } from "@mui/lab";

// import { stringToMicroAlgos } from "../../utils/conversions";

const addGarden = ({ createNewGarden, loading }) => {
  const [name, setName] = useState("");
  const [imageUrl, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [pricePerPerson, setPrice] = useState(0);

  const isFormFilled = useCallback(() => {
    return name && imageUrl && description && location && pricePerPerson > 0;
  }, [name, imageUrl, description, location, pricePerPerson]);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [numInputs, setNumInputs] = useState(0);
  const [plants, setPlants] = useState([]);

  const handleInputChange = (event, index) => {
    setPlants((prevInputs) => {
      const updatedInputs = [...prevInputs];
      updatedInputs[index] = event.target.value;
      return updatedInputs;
    });
  };

  const handleNumInputChange = (event) => {
    const newNumInputs = parseInt(event.target.value, 10);
    setNumInputs(newNumInputs);

    // Ensure plants array has correct length
    const updatedInputs = new Array(newNumInputs).fill("");
    setPlants(updatedInputs);
  };

  return (
    <>
      <Button
        onClick={handleShow}
        variant="dark"
        className="rounded-pill px-0"
        style={{ width: "38px" }}
      >
        <i className="bi bi-plus"></i>
      </Button>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>New Garden</Modal.Title>
        </Modal.Header>
        <Form>
          <Modal.Body>
            <FloatingLabel
              controlId="inputName"
              label="Garden name"
              className="mb-3"
            >
              <Form.Control
                type="text"
                onChange={(e) => {
                  setName(e.target.value);
                }}
                placeholder="Enter Garden name"
              />
            </FloatingLabel>
            <FloatingLabel
              controlId="inputUrl"
              label="Image URL"
              className="mb-3"
            >
              <Form.Control
                type="text"
                placeholder="Image URL"
                value={imageUrl}
                onChange={(e) => {
                  setImage(e.target.value);
                }}
              />
            </FloatingLabel>
            <FloatingLabel
              controlId="inputDescription"
              label="Description"
              className="mb-3"
            >
              <Form.Control
                as="textarea"
                placeholder="description"
                style={{ height: "80px" }}
                max={115}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              />
            </FloatingLabel>

            <div className="apply-margin">
              <label htmlFor="num-inputs">Number of Plants:</label>
              <input
                type="number"
                id="num-inputs"
                value={numInputs}
                onChange={handleNumInputChange}
                min={1}
              />

              {plants.map((input, index) => (
                <div className="apply-margin" key={index}>
                  <label htmlFor={`input-${index}`}>Plant {index + 1}:</label>
                  <input
                    type="text"
                    id={`input-${index}`}
                    value={input}
                    onChange={(event) => handleInputChange(event, index)}
                  />
                </div>
              ))}
            </div>

            <FloatingLabel
              controlId="inputLocation"
              label="Location"
              className="mb-3"
            >
              <Form.Control
                as="textarea"
                placeholder="location"
                style={{ height: "80px" }}
                max={115}
                onChange={(e) => {
                  setLocation(e.target.value);
                }}
              />
            </FloatingLabel>
            <FloatingLabel
              controlId="inputPrice"
              label="Price Per Person in ICP"
              className="mb-3"
            >
              <Form.Control
                type="text"
                placeholder="Price"
                onChange={(e) => {
                  setPrice(e.target.value);
                }}
              />
            </FloatingLabel>
          </Modal.Body>
        </Form>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="dark"
            disabled={!isFormFilled()}
            onClick={() => {
              createNewGarden({
                name,
                imageUrl,
                description,
                location,
                pricePerPerson,
                plants,
              });
              handleClose();
            }}
          >
            Save new Garden
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

addGarden.propTypes = {
  createNewGarden: PropTypes.func.isRequired,
};

export default addGarden;
