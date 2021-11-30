import React, { useState, useEffect } from "react";
import { isAuthenticated } from "../../auth";
import { createProduct, getCategories } from "./apiAdmin";
import { Card, Col, Row, Form, Button } from "@themesberg/react-bootstrap";
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const AddProduct = () => {
    const [values, setValues] = useState({
        service: "",
        category: "",
        categories: [],
        ratePer1000: "",
        pricePerUnit: "",
        minOrder: "",
        maxOrder: "",
        loading: false,
        error: "",
        createdProduct: "",
        formData: ""
    });

    // destructure values from useState
    const {
        service,
        category,
        categories,
        ratePer1000,
        pricePerUnit,
        minOrder,
        maxOrder,
        loading,
        error,
        createdProduct,
        formData
    } = values;

    const init = () => {
        getCategories()
        .then(data => {
            if(data.error) {
                setValues({...values, error: data.error});
            } else {
                setValues({...values, categories: data, formData: new FormData()});
            }
        });
    };

    useEffect(() => {
        init();
    }, []);

    const handleChange = name => event => {
        const value = name === 'photo' ? event.target.files[0] : event.target.value;
        formData.set(name, value);
        setValues({...values, [name]: value});
    };

    // destructure user and token from localstorage
    const { user, token } = isAuthenticated();

    const clickSubmit = event => {
        event.preventDefault();
        setValues({...values, error: "", loading: true});
        // make request to api to create category
        createProduct(user._id, token, formData).then(data => {
            if (data.error) {
                setValues({...values, error: data.error});
            } else {
                setValues({
                    ...values,
                    service: "",
                    category: "",
                    ratePer1000: "",
                    pricePerUnit: "",
                    minOrder: "",
                    maxOrder: "",
                    loading: false,
                    createdProduct: data.name
                });
            }
        });
    };

    const showError = () => (
        <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
            {error}
        </div>
    );

    const showSuccess = () => (
        <div className="alert alert-info" style={{ display: createdProduct ? '' : 'none' }}>
            <h2>{`${createdProduct}`} is created!</h2>
        </div>
    );

    const showLoading = () =>
        loading && (
            <div className="alert alert-success">
                <h2>Loading...</h2>
            </div>
        );
    
    const goBack = () => (
        <div className="mt-5 mb-3 jusitfy-content-end">
            <Button href="/" variant="outline-secondary" size="sm" >
                Back to Homepage <FontAwesomeIcon icon={faHome}/>
            </Button>
        </div>
        );

    return (
        <Card border="light" className="bg-white shadow-sm mb-4">
            <Card.Body>
            <h5 className="mb-4">Add Product</h5>
            {showLoading()}
            {showError()}
            {showSuccess()}
                <Form onSubmit={clickSubmit}>
                    <Row>
                        <Col md={12} className="mb-3">
                            <Form.Group className="mb-3">
                                <Form.Label className="text-muted">Service</Form.Label>
                                <Form.Control
                                    type="text"
                                    onChange={handleChange('service')}
                                    value={service}
                                    required
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    
                    <Row>
                        <Col md={12} className="mb-3">
                            <Form.Group className="mb-3">
                                <Form.Label className="text-muted">Category</Form.Label>
                                <Form.Select onChange={handleChange('category')} required>
                                    <option defaultValue>Select Category</option>
                                    {Object.keys(categories).map((item, i) => (
                                        <option key={i} value={categories[item]._id} >{categories[item].name}</option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={12} className="mb-3">
                            <Form.Group className="mb-3">
                                <Form.Label className="text-muted">Rate Per 1000</Form.Label>
                                <Form.Control
                                    type="text"
                                    onChange={handleChange('ratePer1000')}
                                    value={ratePer1000}
                                    required
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={12} className="mb-3">
                            <Form.Group className="mb-3">
                                <Form.Label className="text-muted">Price Per Unit</Form.Label>
                                <Form.Control
                                    type="text"
                                    onChange={handleChange('pricePerUnit')}
                                    value={pricePerUnit}
                                    required
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={12} className="mb-3">
                            <Form.Group className="mb-3">
                                <Form.Label className="text-muted">Minimum Order</Form.Label>
                                <Form.Control
                                    type="text"
                                    onChange={handleChange('minOrder')}
                                    value={minOrder}
                                    required
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={12} className="mb-3">
                            <Form.Group className="mb-3">
                                <Form.Label className="text-muted">Maximum Order</Form.Label>
                                <Form.Control
                                    type="text"
                                    onChange={handleChange('maxOrder')}
                                    value={maxOrder}
                                    required
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Button variant="primary" type="submit">Add Product</Button>
                </Form>
            </Card.Body>
            {goBack()}
        </Card>
    );

};

export default AddProduct;
