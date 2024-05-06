document.addEventListener("DOMContentLoaded", function() {
    const proyectil = document.getElementById('proyectil');
    const blanco = document.getElementById('blanco');
    const particulaProducto = document.getElementById('particulaProducto');
    const nuevoNucleo = document.getElementById('nuevoNucleo');
    const centroColision = document.getElementById('centroColision');

    function iniciarColisionAnimada() {
        const posicionFinalProyectil = blanco.offsetLeft; // Posición final del proyectil
        const contenedorSimulacion = document.getElementById('contenedor-simulacion');
        const contenedorWidth = contenedorSimulacion.offsetWidth;
        const contenedorHeight = contenedorSimulacion.offsetHeight;
        const particulaWidth = particulaProducto.offsetWidth;
        const particulaHeight = particulaProducto.offsetHeight;

        anime({
            targets: proyectil,
            left: posicionFinalProyectil,
            duration: 3000,
            easing: 'easeInOutQuad',
            complete: function() {
                proyectil.style.display = 'none';
                blanco.style.visibility = 'hidden';

                anime({
                    targets: particulaProducto,
                    left: contenedorWidth - particulaWidth,
                    top: 0,
                    duration: 2000,
                    easing: 'easeInOutQuad'
                    
                });
                var audio = document.getElementById('sonidoColision');
                audio.play();
                var audio = document.getElementById('sonidoradiacion');
                audio.play();
                anime({
                    targets: nuevoNucleo,
                    left: contenedorWidth - particulaWidth,
                    top: contenedorHeight - particulaHeight,
                    duration: 2000,
                    easing: 'easeInOutQuad',
                    begin: function() {
                        // Mostrar la imagen de colisión en el centro del área de simulación
                        centroColision.style.display = 'block';
                    }
                });
            }
        });
    }

    function calcularEnergia() {
        const masaInicial = parseFloat(document.getElementById('masaInicial').value);
        const masaFinal = parseFloat(document.getElementById('masaFinal').value);

        const energia_eV = simuladorReaccionNuclear(masaInicial, masaFinal);

        const resultado = document.getElementById('resultado');
        resultado.innerHTML = `La energía liberada en la reacción es: ${energia_eV} eV.`;

        // Determinar el tipo de reacción
        const tipoReaccion = masaInicial > masaFinal ? 'exotérmica' : 'endotérmica';
        resultado.innerHTML += `<br>La reacción es ${tipoReaccion}.`;
    }

    const iniciarColisionBtn = document.getElementById('iniciarColision');
    iniciarColisionBtn.addEventListener('click', iniciarColisionAnimada);

    const nuevaReaccionBtn = document.getElementById('nuevaReaccion');
    nuevaReaccionBtn.addEventListener('click', function() {
        location.reload();
    });

    const formulario = document.getElementById('formulario');
    formulario.addEventListener('submit', function(event) {
        event.preventDefault();
        calcularEnergia();
    });

    // Función para simular la reacción nuclear en eV
    function simuladorReaccionNuclear(masaInicial, masaFinal) {
        const velocidadLuz = 2.998e8; // Velocidad de la luz en m/s
        const masaDiferencial = masaInicial - masaFinal;
        const energiaJoules = masaDiferencial * Math.pow(velocidadLuz, 2);
        const energia_eV = energiaJoules / (1.602176634e-19); // Factor de conversión de Joules a eV
        return energia_eV;
    }
    
});
