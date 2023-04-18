export function leerDatosApi(url) {
    const resultado =
        fetch(url,
            {
                method: "GET"
            })
            .then(response => response.json())
            .then(data => {
                return data
            })
            .catch(error => console.log(error));

    return resultado
}



// console.log("Iniciando Promesa)")
//         setTimeout(()=>{
//             ,5000)