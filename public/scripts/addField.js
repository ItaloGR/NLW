
//procurar o botão          
document.querySelector("#add-time")
//quando clicar no botão
.addEventListener('click', cloneField);


//executar uma ação
function cloneField(){
    //duplicar os campos
    const newFieldContainer = document.querySelector(".schedule-item").cloneNode(true);    
    
    const fields = newFieldContainer.querySelectorAll('input');

    fields.forEach(element => {
        element.value = null
    });

    document.querySelector('#schedule-items').appendChild(newFieldContainer);
}