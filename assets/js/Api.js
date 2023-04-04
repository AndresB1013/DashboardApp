export function leerDatosApi(url) {
    return fetch(url,
        {
            method: "GET"
        })
        .then(response => response.json())
        .then(data => {
            return data
        })
        .catch(error => console.log(error))
        ;
}

