

/*tiempo prara cambiar entre imagenes del carrusel */

const swiper = new Swiper(".mySwiper", {
    loop: true,
    autoplay: {
        delay: 5000,
    },
    slidesPerView: 1,
});

$(document).ready(function () {

function cargarMangas() {
  $.ajax({
    url: 'https://api-tfc-five.vercel.app/api/mangas',
    method: 'GET',
    success: function (mangas) {
      const contenedor = $('.seccion');
      contenedor.empty();

      mangas.forEach(manga => {
        const generos = manga.genero || [];
        const tags = generos.slice(0, 2).map(g => `<span class="tag">${g}</span>`).join('');
        const extraTag = generos.length > 2 ? `<span class="tag">+${generos.length - 2}</span>` : '';

        const tarjeta = $(`
          <div class="card">
            <img src="../src/frieren.png" alt="${manga.nombre}" class="manga-image" />
            <div class="manga-details">
              <div class="manga-meta">
                <span class="status">${manga.estado}</span>
                <span class="meta-info">${manga.volumenes} volúmenes • ${manga.capitulos} capítulos</span>
              </div>
              <h2 class="manga-title">${manga.nombre}</h2>
              <p class="author">por <strong>${manga.autor}</strong></p>
              <div class="manga-tags">
                ${tags}
                ${extraTag}
              </div>
            </div>
          </div>
        `);

        /* targeta.click para luego*/

        contenedor.append(tarjeta);
      });
    },
    error: function () {
      alert('Error al cargar los mangas.');
    }
  });
}

cargarMangas();











});