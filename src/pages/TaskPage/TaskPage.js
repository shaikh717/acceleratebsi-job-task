import React, { useEffect, useState } from "react";
import { Link, NavLink, useParams } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Swal from 'sweetalert2';
import { v4 as uuidv4 } from 'uuid';
import Table from 'react-bootstrap/Table';
import { Col, Row, Button, } from 'react-bootstrap';
import moment from 'moment/moment';

const TaskPage = () => {

    const { pid } = useParams();

    const [task, setTask] = useState([]);
    const [taskName, setTaskName] = useState('')
    const [description, setDescription] = useState('')
    const [timeSpent, setTimeSpent] = useState('')
    const [totalTimeSpent, setTotalTimeSpent] = useState('')



    const addtask = () => {
        const id = uuidv4();
        const newTask = {
            "projId": pid,
            "taskId": id,
            "taskName": taskName,
            "taskDescription": description,
            "tasktimeSpent": timeSpent,
            "taskDate": Date.now()
        }
        setTask([...task, newTask]);
        Swal.fire({
            icon: 'success',
            text: 'You have successfully added a new task!'
        })
        console.log("task", task);
        localStorage.setItem("taskAdded", JSON.stringify([...task, newTask]));
    }

    const gettask = JSON.parse(localStorage.getItem("taskAdded"));

    useEffect(() => {
        if (gettask == null) {
            setTask([])
        } else {
            let filterTaskByProj = gettask.filter(task => task.projId == pid)
            setTask(filterTaskByProj);
        }

    }, [])

    useEffect(() => {
        if (task.length > 0) {


            let to = task.reduce(function (a, b) {
                return parseInt(a) + parseInt(b['tasktimeSpent']);
            }, 0);

            console.log("iside secon useeffect", to);
            setTotalTimeSpent(to)
        }
    }, [task])




    return (
        <>
            <div className="container">
                <Row>
                    <Col md={6}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Task Name</Form.Label>
                            <Form.Control type="text" placeholder="Task Name" value={taskName}
                                onChange={e => setTaskName(e.target.value)}
                            />
                            <Form.Text className="text-muted">
                            </Form.Text>
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Task Description</Form.Label>
                            <Form.Control type="text" placeholder="Task Description" value={description}
                                onChange={e => setDescription(e.target.value)}
                            />
                            <Form.Text className="text-muted">
                            </Form.Text>
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Task TimeSpent</Form.Label>
                            <Form.Control type="text" placeholder="Task TimeSpent" value={timeSpent}
                                onChange={e => setTimeSpent(e.target.value)}
                            />
                            <Form.Text className="text-muted">
                            </Form.Text>
                        </Form.Group>
                    </Col>
                </Row>
                <Button variant={'outline-primary'} onClick={addtask}>
                    Submit
                </Button>
                <Row className="mt-4">
                    <Col>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>task Id</th>
                                    <th>task Name</th>
                                    <th>task Description</th>
                                    <th>task TimeSpent</th>
                                    <th>task CreatedDate</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    task.map((item, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{item.projId}</td>
                                                <td>{item.taskName}</td>
                                                <td>{item.taskDescription}</td>
                                                <td>{moment(item.taskDate).format('DD/MM/YYYY')}</td>
                                                <td>{item.tasktimeSpent}</td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                            <tfoot>
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td>{totalTimeSpent}</td>
                                </tr>
                            </tfoot>
                        </Table>

                    </Col>

                </Row>
            </div>
        </>
    )
}
export default TaskPage;