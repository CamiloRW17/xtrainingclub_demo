import './style.css'

document.addEventListener('DOMContentLoaded', () => {
  
  const menuBtn = document.getElementById('menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileLinks = document.querySelectorAll('.mobile-link'); // Seleccionamos los enlaces para cerrar el menú al hacer clic

  // Función para alternar el menú
  const toggleMenu = () => {
    // 1. Quitamos/Ponemos la clase 'hidden'
    if (mobileMenu.classList.contains('hidden')) {
      // ABRIR MENÚ
      mobileMenu.classList.remove('hidden');
      // Pequeño timeout para que la transición de opacidad funcione
      setTimeout(() => {
        mobileMenu.classList.remove('opacity-0');
      }, 10);
      
      // Cambiar icono de hamburguesa a X (Opcional, pero se ve pro)
      menuBtn.innerHTML = `
        <svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      `;
      
    } else {
      // CERRAR MENÚ
      mobileMenu.classList.add('opacity-0');
      // Esperamos a que termine la animación para poner hidden
      setTimeout(() => {
        mobileMenu.classList.add('hidden');
      }, 300);

      // Regresar icono a hamburguesa
      menuBtn.innerHTML = `
        <svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path>
        </svg>
      `;
    }
  };

  // Evento Click en el botón
  if (menuBtn) {
    menuBtn.addEventListener('click', toggleMenu);
  }

  // Evento: Cerrar menú si tocan un enlace (UX básica)
  mobileLinks.forEach(link => {
    link.addEventListener('click', toggleMenu);
  });

  // --- Lógica para animaciones al hacer Scroll (Intersection Observer) ---
  
  const observerOptions = {
    root: null, // Observa el viewport
    rootMargin: '0px',
    threshold: 0.4 // Se activa cuando el 40% de la tarjeta es visible
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      // Si la tarjeta entra en pantalla
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      } else {
        // (Opcional) Si sale de pantalla, le quitamos la clase para que se anime otra vez al volver
        entry.target.classList.remove('active');
      }
    });
  }, observerOptions);

  // Seleccionamos todas las tarjetas y las empezamos a observar
  document.querySelectorAll('.program-card').forEach(card => {
    observer.observe(card);
  });
});