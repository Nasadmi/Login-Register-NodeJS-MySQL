let contact = document.querySelector('.name_contact-JS').value;

let id = document.querySelector('.id_contact-JS').value;

$(document).on('click', '.delete', () => {
    Swal.fire({
        title: 'Warning',
        text: 'If you continue you could delete all existing data on this contact',
        icon: 'warning',
        showConfirmButton: true,
        showCancelButton: true,
        background: 'var(--Grey_Dark-Color)',
        color: 'var(--White-Color)',
        timer: false,
    }).then((result) => {
        if (result.value) {
            window.location = `/profile/${data}/contacts/delete/${contact}/${id}`
        }
    })
})