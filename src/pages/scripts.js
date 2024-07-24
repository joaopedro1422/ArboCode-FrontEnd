function handleFocus(input) {
    input.dataset.placeholder = input.placeholder; // Armazena o placeholder original
    input.placeholder = ''; // Limpa o placeholder
}

function handleBlur(input) {
    if (input.value === '') { // Se o campo estiver vazio
        input.placeholder = input.dataset.placeholder; // Restaura o placeholder original
    }
}