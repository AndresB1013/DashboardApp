export function tablaDatos(elementoDom,array){
    elementoDom.innerHTML = "";
    let id = 1;
    for (const item of array.data) {
        let tr =`
        <tr>
            <td>${id}</td>
            <td>${item.criterio}</td>
            <td>${item.total}</td>
        </tr>`;
        elementoDom.innerHTML += tr;
        id = id + 1;
    }
    return tablaDatos
};

