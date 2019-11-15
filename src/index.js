import { format } from "path";

/* ДЗ 2 - работа с массивами и объектами */

/*
 Задание 1:

 Напишите аналог встроенного метода forEach для работы с массивами
 Посмотрите как работает forEach и повторите это поведение для массива, который будет передан в параметре array
 */
function forEach(array, fn) {
    for (let i = 0; i < array.length; i++) {
        fn(array[i], i, array);
    }
}

/*
 Задание 2:

 Напишите аналог встроенного метода map для работы с массивами
 Посмотрите как работает map и повторите это поведение для массива, который будет передан в параметре array
 */
function map(array, fn) {
    let newArray = [];

    for (let i = 0; i < array.length; i++) {
        newArray[i] = fn(array[i], i, array);
    }

    return newArray;
}

/*
 Задание 3:

 Напишите аналог встроенного метода reduce для работы с массивами
 Посмотрите как работает reduce и повторите это поведение для массива, который будет передан в параметре array
 */
function reduce(array, fn, initial) {
    let i = 0;
    let result = initial || array[i++];

    while (i < array.length) {
        result = fn(result, array[i], i, array);
        i++;
    }

    return result;
}

/*
 Задание 4:

 Функция должна перебрать все свойства объекта, преобразовать их имена в верхний регистр и вернуть в виде массива

 Пример:
   upperProps({ name: 'Сергей', lastName: 'Петров' }) вернет ['NAME', 'LASTNAME']
 */
function upperProps(obj) {
    let keyArray = [];
    let i = 0;

    // eslint-disable-next-line guard-for-in
    for (let key in obj) {
        keyArray[i++] = key.toUpperCase();
    }

    return keyArray;
}

/*
 Задание 5 *:

 Напишите аналог встроенного метода slice для работы с массивами
 Посмотрите как работает slice и повторите это поведение для массива, который будет передан в параметре array
 */
function slice(array, from = 0, to = 0) {
    let newArray = [];
    let j = 0;

    if (from < 0) {
        from = array.length + from;
    }
    if (to < 0) {
        to = array.length + to;
    }
    for (let i = from; i < to; i++) {
        if (array[i] != undefined) {
            newArray[j++] = array[i];
        }

        return newArray;
    }

    /*
     Задание 6 *:

     Функция принимает объект и должна вернуть Proxy для этого объекта
     Proxy должен перехватывать все попытки записи значений свойств и возводить это значение в квадрат
     */
    function createProxy(obj) {}

    export {
        forEach,
        map,
        reduce,
        upperProps,
        slice,
        createProxy
    };