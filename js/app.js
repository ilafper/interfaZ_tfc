
$(document).ready(function () {


  $('.cartasWrap').on('click', '.heart-btn', function (e) {
    e.stopPropagation(); // evita abrir el modal
    $(this).toggleClass('liked');
    const svg = $(this).find('.heart-icon');
    svg.attr('fill', $(this).hasClass('liked') ? '#e0245e' : 'none');
  });

  // 💾 "Guardar" → tampoco abre modal
  $('.cartasWrap').on('click', '.guardar', function (e) {
    e.stopPropagation();
    alert('Guardado (demo)');
  });

  //carga los mangas 
  function cargarMangas() {
    $.ajax({
      url: 'https://api-tfc-five.vercel.app/api/mangas',
      method: 'GET',
      success: function (mangas) {
        const contenedor = $('.cartasWrap');
        contenedor.empty();
        //recorrer los manngass

        for (let i = 0; i < mangas.length; i++) {
          const manga = mangas[i];

          //console.log(manga);

          const generos = manga.genero || [];
          //añadir los generos del manga.
          const tags = generos.slice(0, 2).map(g => `<span class="tag">${g}</span>`).join('');
          // si hay mas, añadir el numero del los que halla
          const extraTag = generos.length > 2 ? `<span class="tag">+${generos.length - 2}</span>` : '';

          const tarjeta = $(`
          <div class="card" data-manga='${JSON.stringify(manga)}'>
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


          console.log(manga);

          // Añadir tarjeta al contenedor
          contenedor.append(tarjeta);
        }


      },
    });
  }

  cargarMangas();

  // Función de búsqueda
  function buscarMangas() {
    const $input = $(".buscar input");

    // Detecta cuando el usuario escribe
    $input.on("input", function () {
      const nombre = $(this).val().trim();

      // Si el input está vacío, carga todos los mangas
      if (nombre === "") {
        cargarMangas();
        return;
      }


      $.ajax({
        url: `https://api-tfc-five.vercel.app/api/mangas/buscar?nombre=${encodeURIComponent(nombre)}`,
        method: "GET",
        dataType: "json",
        success: function (mangas) {
          console.log("Mangas encontrados:", mangas);
          mangasBuscados(mangas);
        },
        error: function (err) {
          console.error("Error al buscar mangas:", err);
          const contenedor = $(".cartasWrap");
          contenedor.empty();
          contenedor.append("<p style='text-align: center; padding: 2rem; color: #64748b;'>Error al buscar. Intenta de nuevo.</p>");
        }
      });
    });
  }

  function mangasBuscados(mangas) {
    const contenedor = $(".cartasWrap");
    contenedor.empty();

    if (!mangas || mangas.length === 0) {
      contenedor.append("<p style='text-align: center; padding: 2rem; color: #64748b;'>No se encontraron mangas con ese nombre.</p>");
      return;
    }

    for (let j = 0; j < mangas.length; j++) {
      const manga = mangas[j];
      const generos = manga.genero || [];
      const tags = generos.slice(0, 2).map(g => `<span class="tag">${g}</span>`).join('');
      const extraTag = generos.length > 2 ? `<span class="tag">+${generos.length - 2}</span>` : '';

      const tarjeta = $(`
        <div class="card">
          <img src="../src/frieren.png" alt="${manga.nombre}">
          <div class="card-info">
            <h3>${manga.nombre}</h3>
            <p>por ${manga.autor}</p>
            <div class="tags">
              ${tags}${extraTag}
            </div>
            <div class="meta">
              <span>${manga.volumenes || 0} volúmenes</span>
              <span>${manga.capitulos || 0} capítulos</span>
            </div>
            <div class="interactions">
              <button class="heart-btn" aria-label="Me gusta">
                <svg class="heart-icon" xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 24 24" width="24" height="24" fill="none" 
                  stroke="#e0245e" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M12 21C12 21 5 14.5 5 9.5C5 6.42 7.42 4 10.5 4C12 4 13.5 5 14 6C14.5 5 16 4 17.5 4C20.58 4 23 6.42 23 9.5C23 14.5 16 21 16 21H12Z"/>
                </svg>
                <p>Me gusta</p>
              </button>
              <button class="guardar" aria-label="guardar">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                  <path fill="#ffffff" d="M5 21h14a2 2 0 0 0 2-2V8l-5-5H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2zM7 5h4v2h2V5h2v4H7V5zm0 8h10v6H7v-6z"/>
                </svg>
                <p>Guardar</p>
              </button>
            </div>
          </div>
        </div>
      `);

      contenedor.append(tarjeta);
    }
  }



  // Inicializar búsqueda
  buscarMangas();




  //modal

  // Mostrar modal
  $('.cartasWrap').on('click', '.card', function () {
    const manga = JSON.parse($(this).attr('data-manga'));

    const modal = $('.modalManga section');
    modal.html(`
    <div class="modal-content">
      <h2>${manga.nombre}</h2>
      <p><strong>Autor:</strong> ${manga.autor}</p>
      <p><strong>Volúmenes:</strong> ${manga.volumenes}</p>
      <p><strong>Capítulos:</strong> ${manga.capitulos}</p>
      <p><strong>Géneros:</strong> ${(manga.genero || []).join(', ')}</p>
      <button class="cerrarModal">Cerrar</button>
    </div>
  `);

    $('.modalManga').css('display', 'flex').addClass('show');
  });

  // Cerrar modal
  $('.modalManga').on('click', '.cerrarModal', function () {
    $('.modalManga').removeClass('show').fadeOut(200);
  });

  $('.modalManga').on('click', function (e) {
    if ($(e.target).is('.modalManga')) {
      $(this).removeClass('show').fadeOut(200);
    }
  });

});
