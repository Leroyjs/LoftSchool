/* ДЗ 4 - работа с DOM */

/*
 Задание 1:

 1.1: Функция должна создать элемент с тегом DIV

 1.2: В созданный элемент необходимо поместить текст, переданный в параметр text

 Пример:
   createDivWithText('loftschool') // создаст элемент div, поместит в него 'loftschool' и вернет созданный элемент
 */
function createDivWithText(text) {
    const elementDiv = document.createElement('div');

    elementDiv.textContent = text;

    return elementDiv;
}

/*
 Задание 2:

 Функция должна вставлять элемент, переданный в параметре what в начало элемента, переданного в параметре where

 Пример:
   prepend(document.querySelector('#one'), document.querySelector('#two')) // добавит элемент переданный первым аргументом в начало элемента переданного вторым аргументом
 */
function prepend(what, where) {
    where.prepend(what);
}

/*
 Задание 3:

 3.1: Функция должна перебрать все дочерние элементы узла, переданного в параметре where

 3.2: Функция должна вернуть массив, состоящий из тех дочерних элементов, следующим соседом которых является элемент с тегом P

 Пример:
   Представим, что есть разметка:
   <body>
      <div></div>
      <p></p> 
      <a></a>
      <span></span>
      <p></p>
   </dody>

   findAllPSiblings(document.body) // функция должна вернуть массив с элементами div и span т.к. следующим соседом этих элементов является элемент с тегом P
 */
function findAllPSiblings(where) {
    let elementArray = [];
    const place = where.children;

    for (let i = 0; i < place.length - 1; i++) {
        if (place[i].nextElementSibling.nodeName === 'P') {
            elementArray.push(place[i]);
        }
    }

    return elementArray;
}

/*
 Задание 4:

 Функция представленная ниже, перебирает все дочерние узлы типа "элемент" внутри узла переданного в параметре where и возвращает массив из текстового содержимого найденных элементов.
 Но похоже, что в код функции закралась ошибка и она работает не так, как описано.

 Необходимо найти и исправить ошибку в коде так, чтобы функция работала так, как описано выше.

 Пример:
   Представим, что есть разметка:
   <body>
      <div>привет</div>
      <div>loftschool</div>
   </dody>

   findError(document.body) // функция должна вернуть массив с элементами 'привет' и 'loftschool'
 */
function findError(where) {
    var result = [];

    for (let child of where.childNodes) {
        if (child.innerText != undefined) {
            result.push(child.innerText);
        }
    }

    return result;
}

/*
 Задание 5:

 Функция должна перебрать все дочерние узлы элемента переданного в параметре where и удалить из него все текстовые узлы

 Задачу необходимо решить без использования рекурсии, то есть можно не уходить вглубь дерева.
 Так же будьте внимательны при удалении узлов, т.к. можно получить неожиданное поведение при переборе узлов

 Пример:
   После выполнения функции, дерево <div></div>привет<p></p>loftchool!!!
   должно быть преобразовано в <div></div><p></p>
 */
function deleteTextNodes(where) {

    for (var child of where.childNodes) {
        where.removeChild(child);
    }
}

/*
 Задание 6:

 Выполнить предудыщее задание с использование рекурсии - то есть необходимо заходить внутрь каждого дочернего элемента (углубляться в дерево)

 Так же будьте внимательны при удалении узлов, т.к. можно получить неожиданное поведение при переборе узлов

 Пример:
   После выполнения функции, дерево <span> <div> <b>привет</b> </div> <p>loftchool</p> !!!</span>
   должно быть преобразовано в <span><div><b></b></div><p></p></span>
 */
function deleteTextNodesRecursive(where) {
    function deleteTextNodesInner(cursor) {
        for (var node of cursor.childNodes) {
            if (node.nodeType == 1) {
                let cursorInner = node;

                deleteTextNodesInner(cursorInner);
            }
        }
        for (let node of cursor.childNodes) {
            if (node.nodeType == 3) {
                node.parentNode.removeChild(node);
            }
        }
    }
    deleteTextNodesInner(where);
}

/*
 Задание 7 *:

 Необходимо собрать статистику по всем узлам внутри элемента переданного в параметре root и вернуть ее в виде объекта
 Статистика должна содержать:
 - количество текстовых узлов
 - количество элементов каждого класса
 - количество элементов каждого тега
 Для работы с классами рекомендуется использовать classList
 Постарайтесь не создавать глобальных переменных

 Пример:
   Для дерева <div class="some-class-1"><b>привет!</b> <b class="some-class-1 some-class-2">loftschool</b></div>
   должен быть возвращен такой объект:
   {
     tags: { DIV: 1, B: 2},
     classes: { "some-class-1": 2, "some-class-2": 1 },
     texts: 3
   }
 */
function collectDOMStat(root) {
    let characteristic = {
        tags: {},
        classes: {},
        texts: 0,
    }

    function bruteForce(cursor) {
        for (var node of cursor.childNodes) {
            if (node.nodeType == 1) {
                let cursorInner = node;

                if (node.classList != 0) {
                    for (let value of node.classList) {
                        if (characteristic.classes[value] === undefined) {
                            characteristic.classes[value] = 1;
                        } else {
                            characteristic.classes[value]++;
                        }
                    }
                }
                if (characteristic.tags[node.nodeName] === undefined) {
                    characteristic.tags[node.nodeName] = 1;
                } else {
                    characteristic.tags[node.nodeName]++;
                }
                bruteForce(cursorInner);
            }
        }
        for (let node of cursor.childNodes) {
            if (node.nodeType == 3) {
                characteristic.texts++;
            }
        }
    }
    bruteForce(root);

    return characteristic;
}

/*
Задание 8 *:

8.1: Функция должна отслеживать добавление и удаление элементов внутри элемента переданного в параметре where
Как только в where добавляются или удаляются элементы,
необходимо сообщать об этом при помощи вызова функции переданной в параметре fn

8.2: При вызове fn необходимо передавать ей в качестве аргумента объект с двумя свойствами:
 - type: типа события (insert или remove)
 - nodes: массив из удаленных или добавленных элементов (в зависимости от события)

8.3: Отслеживание должно работать вне зависимости от глубины создаваемых/удаляемых элементов

Рекомендуется использовать MutationObserver

Пример:
 Если в where или в одного из его детей добавляется элемент div
 то fn должна быть вызвана с аргументом:
 {
   type: 'insert',
   nodes: [div]
 }

 ------

 Если из where или из одного из его детей удаляется элемент div
 то fn должна быть вызвана с аргументом:
 {
   type: 'remove',
   nodes: [div]
 }
*/
function observeChildNodes(where, fn) {
    let target = where;

    // создаем новый экземпляр наблюдателя
    let observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            let type;
            if (mutation.addedNodes.length == 0) {
                type = 'remove';
            } else {
                type = 'insert';
            }
            const fnObj = {
                type: type,
                nodes: mutation.target,
            }
            fn(fnObj);
        });
    });

    // создаем конфигурации для наблюдателя
    let config = { attributes: true, childList: true, characterData: true };

    // запускаем механизм наблюдения
    observer.observe(target, config);
}

export {
    createDivWithText,
    prepend,
    findAllPSiblings,
    findError,
    deleteTextNodes,
    deleteTextNodesRecursive,
    collectDOMStat,
    observeChildNodes
};