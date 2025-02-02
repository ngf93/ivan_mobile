/*************** 
CUSTOM SELECT
****************/
let selectElement = document.querySelectorAll('.custom-select');
let arr_selects = Array.from(selectElement);
arr_selects.forEach(function(item, i, arr) {
    const btn = item.querySelector('button');
    const options = item.querySelector('.cs-options');

    const toggleMenu = function() {
        // открываем/закрываем окно навигации, добаляя/удаляя активный класс
        options.classList.toggle('opened');
    }

    btn.addEventListener('click', () => { // при клике на кнопку
        toggleMenu();
    });
    
    document.addEventListener('click', function(e) {
        const target = e.target;
        const current_sel = target == item || item.contains(target);
        const sel_is_opened = options.classList.contains('opened');
        if (!current_sel && sel_is_opened) {
            toggleMenu();
        }
    });

    let chboxChecked = "";
    let arrayChecked = []; //massive for checked variants

    if(item.classList.contains('single')) {
        let div_radio = item.querySelectorAll('.radio');
        let arr_div_radio = Array.from(div_radio);
        arr_div_radio.forEach(function(item, i, arr) {
            item.addEventListener('click', (event) => {
                toggleNextlevel(item.nextElementSibling);
            });
        });

        let inp_radio = item.querySelectorAll('input[type="radio"]');
        let arr_radio = Array.from(inp_radio);
        arr_radio.forEach(function(item, i, arr) {
            item.addEventListener('change', (event) => {
                singleChboxChange(item);
            });
            item.addEventListener('click', (event) => {
                event.stopPropagation();
            });
        });
    } else {
        let div_chbox = item.querySelectorAll('.checkbox');
        let arr_div_chbox = Array.from(div_chbox);
        arr_div_chbox.forEach(function(item, i, arr) {
            item.addEventListener('click', (event) => {
                toggleNextlevel(item.nextElementSibling);
            });
        });

        let inp_chbox = item.querySelectorAll('input[type="checkbox"]');
        let arr_chbox = Array.from(inp_chbox);
        arr_chbox.forEach(function(item, i, arr) {
            item.addEventListener('change', (event) => {
                chboxChange(item);
            });
            item.addEventListener('click', (event) => {
                event.stopPropagation();
            });
        });
    }

    /* custom select */
    function singleChboxChange(el){
        chboxChecked = el.value;
        el.closest('.custom-select').querySelector('button').innerHTML = chboxChecked;
    }
    function chboxChange(el){
        if(el.checked){
            arrayChecked.push(el.value);
        } else {
            arrayChecked.splice(arrayChecked.indexOf(el.value), 1);
        }
        
        if(arrayChecked.length == 1){
            el.closest('.custom-select').querySelector('button').innerHTML = arrayChecked;
        } else if(arrayChecked.length > 1){
            el.closest('.custom-select').querySelector('button').innerHTML = 'Выбрано: ' + arrayChecked.length;
        } else {
            el.closest('.custom-select').querySelector('button').innerHTML = 'Не выбрано';
        }
    }
});





/************  
SEARCH / FILTER 
*************/
let searchEl = document.querySelectorAll('.search-in-list');
let arr_search = Array.from(searchEl);
arr_search.forEach(function(item, i, arr) {
    item.addEventListener('keyup', (event) => {
        listSearch(item);
    });
});
function listSearch(elem) {
    let phrase = elem.value.trim();
    let arr = elem.closest('.search-list').querySelectorAll('.search-item');
    let regPhrase = new RegExp(phrase, 'i');

    console.log('phrase = '+phrase);

    if(phrase.length == 0){
        for (let i = 0; i < arr.length; i++) {
            arr[i].classList.remove('overlap');
            arr[i].classList.remove('diff');
        }
    } else {
        let flag = false;
        for (let i = 0; i < arr.length; i++) {
            flag = regPhrase.test(arr[i].innerHTML);
            if (flag) {
                arr[i].classList.add('overlap');
            } else {
                arr[i].classList.add('diff');
            }
        }
    }
}