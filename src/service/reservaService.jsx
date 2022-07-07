import * as servicios from '../constants/servicios';

export const selectAllBookings = async () => {
    return await fetch(servicios.SERVER+servicios.PORT+servicios.URLGETALLBOOKINGS,{
        headers: {'x-access-token':sessionStorage.getItem("token")}
    })
        .then(data => data.json())
        .then(result => result);
}
export const insertBooking = async (booking) => {
    return await fetch(servicios.SERVER+servicios.PORT+servicios.URLINSERTBOOKINGS,{
        method: "POST",
        headers: {"Content-Type":"application/json",
            'x-access-token':sessionStorage.getItem("token")},
        body: JSON.stringify(booking)
    });
}
export const deleteBooking = async (id) => {
    return await fetch(servicios.SERVER+servicios.PORT+servicios.URLDELETEBOOKINGS+id,{
        method: "DELETE",
        headers: {'x-access-token':sessionStorage.getItem("token")}
    });
}
export const updateBooking = async (booking) => {
    return await fetch(servicios.SERVER+servicios.PORT+servicios.URLUPDATEBOOKINGS,{
        method: "PATCH",
        headers: {"Content-Type":"application/json",
            'x-access-token':sessionStorage.getItem("token")},
        body: JSON.stringify(booking)
    });
}