import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Button, Modal } from 'react-bootstrap';

function Detail() {
    let { no } = useParams(); 
    const [board, setBoard] = useState(null);

    const fetchBoard = async () => {
        const response = await axios.get(`http://localhost:8080/api/board/${no}`);

        setBoard(response.data);
    }

    useEffect(() => {
        fetchBoard();
    });

    if (!board) return <div>Loading...</div>;

    return (
        <Modal.Dialog>
            <Modal.Header closeButton>
                {board.title}
                {board.writeDate}
            </Modal.Header>
            
            <Modal.Body>
                {board.content}    
            </Modal.Body>

            <Modal.Footer>
                <Button>수정</Button>
                <Button>삭제</Button>
            </Modal.Footer>
        </Modal.Dialog>
    );
}

export default Detail;