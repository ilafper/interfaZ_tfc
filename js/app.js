

/*tiempo prara cambiar entre imagenes del carrusel */

const swiper = new Swiper(".mySwiper", {
    loop: true,
    autoplay: {
        delay: 10000,
    },
    slidesPerView: 1,
});

 function toggleMenu() {
    document.getElementById("dropdownMenu").classList.toggle("active");
  }

  // Cierra el menú si se hace clic fuera de él
  window.onclick = function(event) {
    if (!event.target.matches('.avatar-icon')) {
      const dropdown = document.getElementById("dropdownMenu");
      if (dropdown.classList.contains('active')) {
        dropdown.classList.remove('active');
      }
    }
  }

$(document).ready(function () {

function cargarMangas() {
  $.ajax({
    url: 'https://api-tfc-five.vercel.app/api/mangas',
    method: 'GET',
    success: function (mangas) {
      const contenedor = $('.contenidoo');
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

        tarjeta.click(function () {
          localStorage.setItem('mangaSeleccionado', JSON.stringify(manga));
          window.location.href = '../html/info.html';
        });

        contenedor.append(tarjeta);
      });
    },
    error: function () {
      alert('Error al cargar los mangas.');
    }
  });
}

cargarMangas();
/*PARTE PARA RELLENAR LOS DETALLES DEL MANGA */
$(document).ready(function () {
  const manga = JSON.parse(localStorage.getItem('mangaSeleccionado'));

  if (!manga) {
    console.error('No se encontró información del manga.');
    return;
  }

  $('.ficha-imagen img').attr('alt', `Portada de ${manga.nombre}`);
  $('.ficha-contenido h1').text(manga.nombre);
  $('.ficha-contenido h3').text(`#${manga._id.substring(manga._id.length - 3)}`); // O usa un número real si tienes
  $('.subtitulo').text(manga.tipo || 'Manga');
  $('.sinopsis').text(manga.sinopsis);

  // Generar géneros
  const generosHtml = (manga.genero || []).map(g => `<span class="genero">${g}</span>`).join('');
  $('.generos').html(generosHtml);

  // Detalles
  $('.detalles').html(`
    <li><strong>Autor:</strong> ${manga.autor}</li>
    <li><strong>Volúmenes:</strong> ${manga.volumenes}</li>
    <li><strong>Capítulos:</strong> ${manga.capitulos}</li>
    <li><strong>Editorial:</strong> ${manga.editorial}</li>
    <li><strong>Demografía:</strong> ${manga.demografia}</li>
    <li><strong>Estado:</strong> ${manga.estado}</li>
  `);
});




});