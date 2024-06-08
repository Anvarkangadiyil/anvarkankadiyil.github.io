// for scrolling

document.addEventListener('DOMContentLoaded', function() {
    let lastScrollTop = 0;
    const header = document.getElementById('header');

    window.addEventListener('scroll', function() {
        let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;

        if (scrollTop > lastScrollTop) {
            header.classList.add('d-none');
        } else {
            header.classList.remove('d-none');
        }

        lastScrollTop = scrollTop;
    });
});

