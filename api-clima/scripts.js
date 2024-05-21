//Obtener los elementos del DOM/HTML

const ciudadInput = document.getElementById("ciudad");

const obtenerPronosticoBtn = document.getElementById("obtenerPronostico");

const pronosticoDiv = document.getElementById("pronostico");

obtenerPronosticoBtn.addEventListener('click', obtenerPronostico);

function obtenerPronostico(){

    const ciudad = ciudadInput.value.trim();

    if(ciudad===""){

        mostrarError("Por favor ingresa una ciudad");
        return

    }

    //Pega tu api key acá abajo
    const apiKey = "b24a32a4ec3db24c648fd5b3c6f26a9d";

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${apiKey}&units=metric&lang=es`;

    //una solicitud HTTP utilizando fetch con la url construida

    fetch(url)
        .then(response => response.json())
        .then(data =>{
            mostrarPronostico(data);
        })
        .catch(error=>{
            mostrarError("Error al obtener el pronostico, intentalo otra vez")
        });
}

function mostrarPronostico(data){

    const {name, main, weather} = data;
    const temperatura = main.temp;
    const sensacion = main.feels_like;
    const humedad = main.humidity;
    const descripcion = weather[0].desciption;
    const pronosticoHTML = `
    
        <div class="card">
        
            <div class="card-body">

                <h2 class="card-title>${name}</h2>
                <p class="card-text">Temperatura: ${temperatura}</p>
                <p class="card-text">Sensacion ambiente: ${sensacion}</p>
                <p class="card-text">Porcentaje de humedad: ${humedad}%</p>
                <p class="card-text">Descripcion: ${descripcion}</p>

            </div>
        
        </div>

    `;

    //Insertar el js dentro del HTML

    pronosticoDiv.innerHTML = pronosticoHTML;

}

function mostrarError(mensaje){

    const errorHTML = `

        <div class="alert alert-danger" role="alert" >
        
            ${mensaje}

        </div>
    `;

    pronosticoDiv.innerHTML = errorHTML;

}