
$(document).ready(function () {
  // Dentro de $(document).ready
  // Delegamos el click a .cartasWrap que ya existe al inicio
  $('.cartasWrap').on('click', '.heart-btn', function () {
      $(this).toggleClass('liked');

      // Opcional: cambiar color del SVG directamente
      const svg = $(this).find('.heart-icon');
      if ($(this).hasClass('liked')) {
          svg.attr('fill', '#e0245e'); // rojo cuando está "like"
      } else {
          svg.attr('fill', 'none'); // transparente cuando no está
      }
  });

  //carga los mangas 
  function cargarMangas() {
    $.ajax({
      url: 'https://api-tfc-five.vercel.app/api/mangas',
      method: 'GET',
      success: function (mangas) {
        const contenedor = $('.cartasWrap');
        contenedor.empty();

        mangas.forEach(manga => {
          const generos = manga.genero || [];
          //añadir los generos del manga.
          const tags = generos.slice(0, 2).map(g => `<span class="tag">${g}</span>`).join('');
          // si hay mas, añadir el numero del los que halla
          const extraTag = generos.length > 2 ? `<span class="tag">+${generos.length - 2}</span>` : '';

          const tarjeta = $(`
          <div class="card">
                    <img src="../src/frieren.png"  alt="${manga.nombre}>
                    <div class="card-info">
                        <h3>${manga.nombre}</h3>
                        <p>por ${manga.autor}</p>
                        <div class="tags">
                          ${tags}
                          ${extraTag}
                        </div>
                        <div class="meta">
                            <span>${manga.volumenes} volúmenes</span>
                            <span>${manga.capitulos} capítulos</span>
                        </div>
                        <div class="interactions">
                            <button class="heart-btn" aria-label="Me gusta">
                                <svg class="heart-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="#e0245e" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <path d="M12 21C12 21 5 14.5 5 9.5C5 6.42 7.42 4 10.5 4C12 4 13.5 5 14 6C14.5 5 16 4 17.5 4C20.58 4 23 6.42 23 9.5C23 14.5 16 21 16 21H12Z"/>
                                </svg>
                                <p>Me gusta</p>
                            </button>

                            <button class="guardar" aria-label="guardar">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#ffffff" d="M5 21h14a2 2 0 0 0 2-2V8l-5-5H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2zM7 5h4v2h2V5h2v4H7V5zm0 8h10v6H7v-6z"/></svg>
                            <p>Guardar</p>
                            </button>
                        </div>
                    </div>
                </div>
        `);
          // Añadir tarjeta al contenedor
          contenedor.append(tarjeta);
        });
      },
    });
  }

  cargarMangas();
  

  

  



});