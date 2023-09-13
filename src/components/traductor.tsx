import React, { useState, ChangeEvent } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, InputGroup, FormControl, Button } from 'react-bootstrap';
import './css/traductorStyle.css'
import axios from "axios";
const TraductorUrl = "https://we-work-prueba.azurewebsites.net/translateMe/"

const Traductor: React.FC = () => {
    const [inputValue, setInputValue] = useState<string>('');
    const [respuesta, setRespuesta] = useState<any>();

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    const handleEnviarClick = async () => {
        await axios
            .post(TraductorUrl, {
                text: inputValue
            })
            .then((response: any) => {
                setRespuesta(response)
                console.log(response)
                console.log(respuesta)
            });
    };

    return (
        <Container className='container'>
            <div className='center'>
                <Row>
                    <Col>
                        <h1>Traductor</h1>
                        <InputGroup className="mb-3">
                            <FormControl
                                placeholder="Escribe algo..."
                                value={inputValue}
                                onChange={handleInputChange}
                            />
                            <Button variant="primary" onClick={handleEnviarClick}>
                                Enviar
                            </Button>
                        </InputGroup>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div className="mt-3">
                            <h3>Respuesta:</h3>
                            <div className="border p-3">{
                                respuesta ? respuesta?.map((translate: any) => {
                                    return <div>
                                        <p>En {translate.to} : {translate.text}</p>
                                    </div>
                                }) : ""}</div>
                        </div>
                    </Col>
                </Row>
            </div>
        </Container>
    );
};

export default Traductor;