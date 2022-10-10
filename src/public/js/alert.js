let contact_delete = document.querySelector('.delete');

let contact = document.querySelector('.name_contact-JS').value;

let logout = document.querySelector('#logout');

let data = document.querySelector('#account_JS');

let id = document.querySelector('.id_contact-JS').value;

const main = () => {
    logout.addEventListener('click', () => {
        Swal.fire(
            {
                title: 'Are You Sure?',
                text: 'Are you sure to log out',
                icon: 'question',
                background: 'var(--Grey_Dark-Color)',
                color: 'var(--White-Color)',
                showConfirmButton: true,
                showCancelButton: true,
                timer: false,
            }
        ).then((result) => {
            if (result.value) {
                window.location = `/profile/${data}/logout`;
            }
        })
    })
    
    contact_delete.addEventListener('click', () => {
        Swal.fire(
            {
                title: 'Warning',
                text: 'If you continue, all existing data on this contact will be deleted.',
                icon: 'warning',
                background: 'var(--Grey_Dark-Color)',
                color: 'var(--White-Color)',
                showConfirmButton: true,
                showCancelButton: true,
                timer: false,
            }
        ).then((result) => {
            if (result.value) {
                window.location = `/profile/${data}/contacts/delete/${contact}/${id}`;
            }
        })
    })
}


main()