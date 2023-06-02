import React, { useEffect, useState } from "react";
import Form from 'react-bootstrap/Form';
import Swal from 'sweetalert2';
import { v4 as uuidv4 } from 'uuid';
import Table from 'react-bootstrap/Table';
import { Col, Row, Button, } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const ProjectsPage = () => {

    const [projects, setProjects] = useState([]);
    const [projectName, setProjectName] = useState('')

    const addProjects = (task) => {
        const id = uuidv4();
        const newProject = {
            "projId": id,
            "projName": projectName
        }
        setProjects([...projects, newProject]);
        Swal.fire({
            icon: 'success',
            text: 'You have successfully added a new projects!'
        })
        localStorage.setItem("projectsAdded", JSON.stringify([...projects, newProject]));
    }

    const getProjects = JSON.parse(localStorage.getItem("projectsAdded"));
    useEffect(() => {
        if (getProjects == null) {
            setProjects([])
        } else {
            setProjects(getProjects);
        }
    }, [])


    return (
        <>
            <div className="container">
                <Row>
                    <Col md={6}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Project Name</Form.Label>
                            <Form.Control type="text" placeholder="Project Name" value={projectName}
                                onChange={e => setProjectName(e.target.value)}
                            />
                            <Form.Text className="text-muted">
                            </Form.Text>
                        </Form.Group>
                    </Col>
                </Row>
                <Button variant={'outline-primary'} onClick={addProjects}>
                    Submit
                </Button>
                <Row className="mt-4">
                    <Col>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Projects Id</th>
                                    <th>Projects Name</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    projects.map((item, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{item.projId}</td>
                                                <td>
                                                    <Link to={`/task-page/${item.projId}`}>
                                                        {item.projName}
                                                    </Link>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </Table>

                    </Col>

                </Row>
            </div>
        </>
    )
}
export default ProjectsPage;