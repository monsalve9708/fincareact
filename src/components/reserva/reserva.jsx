import "./reserva.scss"
import * as React from 'react';
import {DatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import {useState} from "react";
import {Alert, Button, TextField} from "@mui/material";
import ListReserva from "./listReserva";
import jwt_decode from "jwt-decode";
import {insertBooking, updateBooking} from "../../service/reservaService";
import moment from "moment";

const Reserva = ()=>{
    const [id, setId] = useState(null);
    const [checkin, setCheckin] = useState(null);
    const [checkout, setCheckout] = useState(null);
    const [message, setMessage] = useState("");
    const [update, setUpdate] = useState(false);
    const [amountPeople, setAmountPeople] = useState();
    const [response, setResponse] = useState(0);
    const [edit,setEdit] = useState(false);
    const dateNow = new Date();
    const token = window.sessionStorage.getItem("token") ?
        window.sessionStorage.getItem("token") : null;
    const user =token ? jwt_decode(token).user : null;

    const handleCheckin = (date) => {
        if (date >= dateNow){
            setCheckin(date);
           if(!checkout) setCheckout(date);
        }else {
            setCheckin(null);
        }
    }
    const handleCheckout = (date) => {
        if (date >= dateNow){
            setCheckout(date);
        }else {
            setCheckout(null);
        }
    }
    const handleAmountPeople = (e) => {
        setAmountPeople(e.target.value);
    }
    const retornEdit = (booking) => {
        setEdit(true);
        setCheckin(moment(booking.checkin));
        setCheckout(booking.checkout);
        setAmountPeople(booking.numpersona);
        setId(booking.id);
    }

    const handleBooking = () => {
        if (validateDates()) {
            setEdit(false);
            setResponse(0);
            insertBooking({checkin, checkout, amountPeople, user})
                .then(response => {
                    validationsResponse(response);
                    return response.json();
                })
                .then(data => {
                    setMessage(data.message);
                }).catch(e => {
                    setResponse(3);
                }
            );
        }
        else {
            setMessage("El check out debe ser despues del check in");
            setResponse(2);
        }
    }
    const validationsResponse = (response) => {
        if (response.ok){
            setResponse(1);
            setUpdate(!update);
            setTimeout(() => {setResponse(0)},2000);
        }
        if (response.status === 400){
            setResponse(2);
        }
        if (response.status === 500){
            setResponse(2);
        }
    }
    const validateDates = () => {
       return Date.parse(checkin) <= Date.parse(checkout);
    }
    const handleUpdateBooking = () => {
        if (validateDates()) {
            setResponse(0);
            updateBooking({checkin, checkout, amountPeople, user, id})
                .then(response => {
                    validationsResponse(response);
                    return response.json();
                })
                .then(data => {
                    setMessage(data.message);
                }).catch(e => {
                    setResponse(3);
                }
            );
            setEdit(false);
        }else {
            setMessage("El check out debe ser despues del check in");
            setResponse(2);
        }
    }
    return(
        <>
            {response === 3 ?<Alert severity="error">Opps hubo un error, intenta nuevamente o comunicate con tu administrador</Alert> : null}
            <h2 className="tittle">Reservar</h2>
            <div className="response">
                {response === 1 ?<Alert severity="success" sx={{width:700}}>{message}</Alert> : null}
            </div>
            <div className="center">
                <div className="divs">
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                            label="Check in"
                            value={checkin}
                            onChange={(newValue) => {
                                handleCheckin(newValue);
                            }}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </LocalizationProvider>
                </div>
                <div className="divs checkout">
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                            label="Check Out"
                            value={checkout}
                            onChange={(newValue) => {
                                handleCheckout(newValue);
                            }}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </LocalizationProvider>
                </div>
                <div className="divs checkout">
                    <TextField label="Cantidad personas" variant="outlined" value={amountPeople || ''} type="number" onChange={handleAmountPeople}/>
                </div>
                <div>
                    {edit ? <Button variant="outlined" disableElevation sx={{my:5, width:200, mr:3}} type="button" onClick={handleUpdateBooking}>
                        Editar
                    </Button> : null}
                    <Button variant="contained" disableElevation sx={{my:5, width:200}} onClick={handleBooking} type="button">
                        Reservar
                    </Button>
                </div>
                <div className="response">
                    {response === 2 ?<Alert severity="error" sx={{width:700}}>{message}</Alert> : null}
                </div>
            </div>
            <div className="center">
                <ListReserva update = {update} edit ={retornEdit}/>
            </div>
        </>
    )
}
export default Reserva;