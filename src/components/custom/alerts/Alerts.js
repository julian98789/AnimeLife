import Swal from "sweetalert2";

export const Loading = () => {
    Swal.fire({
        title: 'Cargando',
        html: 'Por favor espere',
        timerProgressBar: true,
        didOpen: () => {
            Swal.showLoading()
        }
    });

    return Swal.close; // Return a function that can be used to close the alert
}