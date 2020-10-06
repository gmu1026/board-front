import React, { useState, useEffect } from 'react';
import './App.css';
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link, BrowserRouter
} from 'react-router-dom';
import Detail from './Detail';
import { Nav, Navbar } from 'react-bootstrap';

function App() {
  const [boards, setBoards] = useState(null);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);
  const [show, setShow] = useState(false);
  const { register, handleSubmit } = useForm();

  const fetchBoards = async () => {
    try {
      setError(null);
      setBoards(null);

      setLoading(true);
      const response = await axios.get(
        'http://localhost:8080/api/boards'
      );

      setBoards(response.data);
    } catch (e) {
      setError(e);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchBoards();
  }, []);

  async function registerBoard(data) {
    axios.post('http://localhost:8080/api/board', data)
      .then(response => {
        console.log('success register board')
        setShow(false);
        fetchBoards();
      })
      .catch(response => {
        console.log(response.data);
      });
  }

  if (loading) return <div>로딩중..</div>;
  if (error) return <div>에러발생..</div>;
  if (!boards) return null;

  return (
    <div>
      <Navbar>
        <Navbar.Brand>Board</Navbar.Brand>
        <Nav>
          <Nav.Link href='#'>Boards</Nav.Link>
          <Nav.Link href='#'>Schedule</Nav.Link>
        </Nav>
      </Navbar>
      <BrowserRouter>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Writer</th>
            <th>Register Date</th>
            <th>Likes</th>
          </tr>
        </thead>
        <tbody>
            {boards.map(board => (
              <tr key={board.no}>
                <td>{board.no}</td>
                <td><Link to={`/${board.no}`}>{board.title}</Link></td>
                <td>TEST</td>
                <td>{board.writeDate}</td>
                <td>0</td>
              </tr>
            ))}
        </tbody>
      </Table>
      <Button variant="outline-primary" onClick={() => setShow(true)}>
        글쓰기
      </Button>
      <Modal show={show} onHide={() => setShow(false)} dialogClassName="modal-90w" aria-labelledby="modal-title">
        <Modal.Header closeButton>
          <Modal.Title id="modal-title">
            글쓰기
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit(registerBoard)}>
            <label for="title">제목</label>
            <input type="text" name="title" ref={register}></input><br></br>
            <label for="content">내용</label>
            <textarea name="content" ref={register}></textarea><br></br>
            <Button variant="primary" type="submit">
              등록
            </Button>
          </form>
        </Modal.Body>
      </Modal>
        <Switch>
          <Route path='/:no' component={Detail}/>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;

