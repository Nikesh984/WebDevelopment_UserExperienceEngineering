import React from "react";
import { Row, Col, InputGroup, FormControl, Button } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";


class Form extends React.Component{
    render() {
        return (
          <Row className="justify-content-md-center">
            <Col md={8}>
              <form onSubmit={this.props.getWeatherForecast}>
                <InputGroup className="mb-3">
                  <FormControl
                    placeholder="City"
                    name="city"
                    style={{ marginRight: "20px", borderRadius: "10px" }}
                  />
                  <Button type="submit" variant="btn btn-dark">
                    <FaSearch />
                  </Button>
                </InputGroup>
              </form>
            </Col>
          </Row>
        );
    }
}

export default Form;