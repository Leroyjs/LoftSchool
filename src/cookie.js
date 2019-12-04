/*
 ДЗ 7 - Создать редактор cookie с возможностью фильтрации

 7.1: На странице должна быть таблица со списком имеющихся cookie. Таблица должна иметь следующие столбцы:
   - имя
   - значение
   - удалить (при нажатии на кнопку, выбранная cookie удаляется из браузера и таблицы)

 7.2: На странице должна быть форма для добавления новой cookie. Форма должна содержать следующие поля:
   - имя
   - значение
   - добавить (при нажатии на кнопку, в браузер и таблицу добавляется новая cookie с указанным именем и значением)

 Если добавляется cookie с именем уже существующей cookie, то ее значение в браузере и таблице должно быть обновлено

 7.3: На странице должно быть текстовое поле для фильтрации cookie
 В таблице должны быть только те cookie, в имени или значении которых, хотя бы частично, есть введенное значение
 Если в поле фильтра пусто, то должны выводиться все доступные cookie
 Если добавляемая cookie не соответсвует фильтру, то она должна быть добавлена только в браузер, но не в таблицу
 Если добавляется cookie, с именем уже существующей cookie и ее новое значение не соответствует фильтру,
 то ее значение должно быть обновлено в браузере, а из таблицы cookie должна быть удалена

 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то добавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
const homeworkContainer = document.querySelector('#homework-container');
// текстовое поле для фильтрации cookie
const filterNameInput = homeworkContainer.querySelector('#filter-name-input');
// текстовое поле с именем cookie
const addNameInput = homeworkContainer.querySelector('#add-name-input');
// текстовое поле со значением cookie
const addValueInput = homeworkContainer.querySelector('#add-value-input');
// кнопка "добавить cookie"
const addButton = homeworkContainer.querySelector('#add-button');
// таблица со списком cookie
const listTable = homeworkContainer.querySelector('#list-table tbody');

let fullShow = true;

updateList(returtCookies());

filterNameInput.addEventListener('keyup', function() {
    if (filterNameInput.value.length == 0) {
        fullShow = true;
    } else {
        fullShow = false;
    }
    updateList(returtCookies(), filterNameInput.value);
});

addButton.addEventListener('click', () => {
    let nameNewCookie = addNameInput.value;
    let valueNewCookie = addValueInput.value;
    let newCookie = `${nameNewCookie}=${valueNewCookie}`;

    if (nameNewCookie === '' || valueNewCookie === '') {
        alert('Заполните форму');
    } else {
        document.cookie = newCookie;
        updateList(returtCookies());
        addNameInput.value = '';
        addValueInput.value = '';
    }
});


function updateList(cookiesObj, search) {
    let table = '';
    let idButton = 0;

    if (fullShow == false) {
        let searchObj = [];

        for (const key in cookiesObj) {
            if (key.split(search).length > 1) {
                searchObj[key] = cookiesObj.key;
            }
        }
        cookiesObj = searchObj;
    }
    // eslint-disable-next-line guard-for-in
    for (const key in cookiesObj) {
        let tableRow = '<th id="row-' + idButton + '">' + key + '</th>' +
            '<th>' + cookiesObj[key] + '</th>' +
            '<th><button id="cookieButton-' + idButton + '">Delete</button>' + '</th>';

        tableRow = '<tr>' + tableRow + '</tr>';
        idButton++;
        table += tableRow;
    }
    listTable.innerHTML = table;

    for (let i = 0; i < idButton; i++) {
        const delButton = homeworkContainer.querySelector(`#cookieButton-${i}`);

        delButton.addEventListener('click', () => {
            const delCookie = homeworkContainer.querySelector(`#row-${i}`).innerHTML;

            document.cookie = delCookie + "= ; expires=Thu, 01 Jan 1970 00:00:01 GMT";
            updateList(returtCookies());
        });
    }
}

function returtCookies() {
    const cookiesList = document.cookie;
    const cookiesArray = cookiesList.split('; ');
    const cookiesObj = cookiesArray.reduce((prev, current) => {
        const [name, value] = current.split('=');

        prev[name] = value;

        return prev;
    }, {});

    return cookiesObj
}