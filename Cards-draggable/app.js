const items = document.querySelectorAll('.item');
const sortedList = document.querySelector('.sorted-list');


const dragStart = (e) => {
    setTimeout(() => {e.target.classList.add('dragging')}, 1);
    
}
const dragEnd = (e) => {
    e.target.classList.remove('dragging');
}

items.forEach(item => {
    item.addEventListener('dragstart', dragStart);
    item.addEventListener('dragend', dragEnd);
});

const initSortableList = (e) => {
    e.preventDefault(); // Prevenir el comportamiento predeterminado de arrastrar elementos

    // Obtener el elemento que se está arrastrando actualmente con la clase 'dragging'
    const itemDragging = document.querySelector('.dragging');

    // Seleccionar todos los elementos hermanos en la lista ordenada que no están siendo arrastrados
    const siblings = [...sortedList.querySelectorAll(".item:not(.dragging)")];

    // Encontrar el siguiente hermano en la lista según la posición del cursor
    const nextSibling = siblings.find((sibling) => {
        const siblingRect = sibling.getBoundingClientRect();
        const siblingCenter = siblingRect.y + siblingRect.height / 2;
        return e.clientY < siblingCenter;
    });
    console.log(nextSibling);
    // Insertar el elemento arrastrado antes del siguiente hermano en la lista
    sortedList.insertBefore(itemDragging, nextSibling);
}

sortedList.addEventListener('dragover', initSortableList);
sortedList.addEventListener('dragenter', (e)=>e.preventDefault());