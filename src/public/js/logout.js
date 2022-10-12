let data = document.querySelector('#account_JS').value;

$(document).on('click', '#logout', () => {
    Swal.fire({
        title: 'Are you Sure?',
        text: 'Are you sure you want to log out',
        icon: 'question',
        showConfirmButton: true,
        showCancelButton: true,
        background: 'var(--Grey_Dark-Color)',
        color: 'var(--White-Color)',
        timer: false,
    }).then((result) => {
        if (result.value) {
            window.location = `/profile/${data}/logout`
        }
    })
})