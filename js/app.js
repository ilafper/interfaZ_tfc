function showForm(formId) {
    document.querySelectorAll('.form').forEach(form => form.classList.remove('active'));
    document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));

    document.getElementById(formId).classList.add('active');
    document.querySelector(`.tab[onclick*="${formId}"]`).classList.add('active');
}
const swiper = new Swiper(".mySwiper", {
    loop: true,
    autoplay: {
        delay: 50000,
    },
    slidesPerView: 1,
});