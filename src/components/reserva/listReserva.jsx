import {useEffect, useState} from "react";
import {deleteBooking, selectAllBookings} from "../../service/reservaService";
import {Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow} from "@mui/material";
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import jwt_decode from 'jwt-decode';
import "./reserva.scss";
import IconButton from "@mui/material/IconButton";
import swal from 'sweetalert';

const ListReserva = (props) => {
    const [bookings, setBookings] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [update, setUpdate] = useState(false);

    const token = window.sessionStorage.getItem("token");
    const user = jwt_decode(token);


    useEffect(  () => {
        getBookings();
    },[props.update,update]);
    const getBookings = async () => {
        setBookings(await selectAllBookings());
    }
    const columns = [
        { field: 'id', headerName: 'ID', minWidth: 70 },
        {field: 'fechainicial', headerName: 'Check in', minWidth: 160},
        { field: 'fechafin', headerName: 'Check out', minWidth: 160 },
        { field: 'usuario', headerName: 'Usuario', minWidth: 130 },
        {field:'opciones',headerName: 'Opciones', minWidth: 130}
    ]
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    const handleDeleteBooking = (id) => {
        swal({
            title: "¿Esta seguro de eliminar la reserva?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    deleteBookingService(id);
                    swal("La reserva se ha eliminado correctamente", {
                        icon: "success",
                    });
                }
                setUpdate(!update);
            });
    }
    const deleteBookingService = async (id) => {
        await deleteBooking(id);
    }
    return (
        <>
            { bookings ?
                <div>
                    <TableContainer className="tabla" sx={{ maxHeight: 440, width:700 }}>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center" colSpan={3}>
                                    </TableCell>
                                    <TableCell align="center">
                                    </TableCell>
                                    <TableCell align="center">
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    {columns.map((column) => (
                                        <TableCell
                                            key={column.field}
                                        >
                                            {column.headerName}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {bookings
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((row,index) => {
                                        return (
                                            <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                                                {columns.map((column,index) => {
                                                    const value = row[column.field];
                                                    return (
                                                        index !== 4 ?
                                                        <TableCell key={column.field} align={column.align}>
                                                            {value}
                                                        </TableCell> : null
                                                    );
                                                })}
                                                <TableCell key={columns[4].field}>
                                                    {row.usuario === user.user ?
                                                        <> <IconButton sx={{color:"#1976d2"}} onClick={() => {props.edit(row)}}><ModeEditIcon/></IconButton> <IconButton sx={{color:"red"}} onClick={() => {handleDeleteBooking(row.id)}}><HighlightOffIcon/></IconButton></>
                                                        : null}
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                            </TableBody>
                        </Table>
                        <TablePagination
                            rowsPerPageOptions={[10, 25, 100]}
                            component="div"
                            count={bookings.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </TableContainer>
                </div>
                : null
            }
        </>
    );
}

export default ListReserva;