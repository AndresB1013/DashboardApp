export function tablaDatos(elementoDom){
    elementoDom.innerHTML = "";
    let id = 1;
    for (const item of resultado.data) {
        let tr =`
        <tr>
            <td>${id}</td>
            <td>${item.departamento}</td>
            <td>${item.total}</td>
        </tr>`;
        elementoDom.innerHTML += tr;
        id = id + 1;
    }
    return tablaDatos
};

