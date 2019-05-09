/////////////////////////////////////////////////////////////////////////////////////
//Helpers
const getElementsByID = element => document.getElementById(element);//getting elements by ID
const getElementsByClassName = className => document.getElementsByClassName(className);//getting elements by className
const range = (N) => Array.from({length: N}, (v, k) => k + 1);//filling the array f-n

/////////////////////////////////////////////////////////////////////////////////////
//Globals
let counter = 0;/*creating a counter variable has to be outside of the function because if it is inside always will
start from 0 */


const displayDate = getElementsByID('date');//getting the date element from html
const daysAdd = getElementsByID('monthDays');
const darkTheme = getElementsByID('dark');
const lightTheme = getElementsByID('light');
const monthDays = range(moment().add(counter, 'month').daysInMonth());//getting days in month
const prevMonthDays = range(moment().add(counter - 1, 'month').daysInMonth());//getting days in month
const firstD = moment().startOf('month').format('d');//getting first day long version
const lastD = moment().endOf('month').format('d');//getting latest day long version
const weekDay = [...getElementsByClassName('weekDays')];//getting all elements with className 'weekDays'
const rightArrow = getElementsByID('rightArrow');
const leftArrow = getElementsByID('leftArrow');
const arrows = [...getElementsByClassName('buttonsSpan')];//getting elements by class name
const modal = getElementsByID('myModal');
const closeBtn = getElementsByID('close');


let currentElementIndex = null;

for (let arrow of arrows) {/* loop trough arrows variable to get both of them */

    arrow.addEventListener('click', clicker);/* while looping attach an event listener on each one, plus calling
    the clicker function*/
}

displayDate.innerText = moment().format("MMMM YYYY");//displaying da date


document.addEventListener('keydown', keyboardController);

let denStart = 0;
let denEnd = 0;
const prediOnload = prevMonthDays.slice(-(firstD - 1));
// console.log(prediOnload);
const sledOnload = Array(7 - lastD)
    .fill()
    .map(() => (denEnd++) + 1);

function nonrepeat(element, neshto) {
    let htmlCont = '';
    let index = 0;
    if (element.length > 7) {


        for (i in element) {
            // console.log(i);
            htmlCont += `<div data-diff="${neshto}" index ="${index}" data = "${neshto}" class="monthDays ${neshto}">${element[i]}</div>`;
            // SEE UPPER ROW, INDEX AND DATA ARE NOT ALLOWED SAME ON 65 ROW
            index++;
        }
    } else {
        for (i in element) {
            // console.log(i);
            htmlCont += `<div data-diff="${neshto}" data = "${neshto}" class="monthDays ${neshto}">${element[i]}</div>`;
            // console.log(element[i])
            index++;
        }
    }
    return htmlCont;
}

function xperiment(predi, sega, sled) {
    // console.log(sega);

    daysAdd.innerHTML = nonrepeat(predi, 'predi') + nonrepeat(sega, 'sega') + nonrepeat(sled, 'sled');
}

xperiment(prediOnload, monthDays, sledOnload);


const allDaysArr = document.getElementsByClassName('monthDays');
let currentMonthDays = Array.from(document.querySelectorAll('[data="sega"]'));
// console.log(currentMonthDays);
currentMonthDays[0].classList.add("active");
currentElementIndex = +document.getElementsByClassName('active')[0].attributes.index.value;


function keyboardController() {
    // console.log(event.keyCode);
    if (event.keyCode === 27) {
        closeBtn.click();
    }
    if (event.keyCode === 39) {
        rightArrow.click();
        currentMonthDays = Array.from(document.querySelectorAll('[data="sega"]'));
        currentMonthDays[0].classList.add('active');
    }
    if (event.keyCode === 37) {
        leftArrow.click();
        currentMonthDays = Array.from(document.querySelectorAll('[data="sega"]'));
        currentMonthDays[0].classList.add('active');
    }
    if (event.keyCode === 100) {
        currentElementIndex = +document.getElementsByClassName('active')[0].attributes.index.value;
        if (currentElementIndex === 0) {
            currentElementIndex = 0;
            // document.getElementsByClassName('active')[0].classList.remove('active');
            // allDaysArr[currentElementIndex].classList.add('active');
            leftArrow.click();
            // currentMonthDays = Array.from(document.querySelectorAll('[data="sega"]'));
            // currentMonthDays[currentElementIndex].classList.add('active');
        } else {
            document.getElementsByClassName('active')[0].classList.remove('active');
            currentMonthDays[currentElementIndex - 1].classList.add('active');

        }
        // leftArrow.click();
    }
    if (event.keyCode === 102) {
        currentElementIndex = +document.getElementsByClassName('active')[0].attributes.index.value;
        // console.log(currentElementIndex, currentMonthDays.length)
        if (currentElementIndex === monthDays.length - 1) {
            currentElementIndex = 0;
            // document.getElementsByClassName('active')[0].classList.remove('active');
            // allDaysArr[currentElementIndex].classList.add('active');
            rightArrow.click();
            currentMonthDays = Array.from(document.querySelectorAll('[data="sega"]'));
            currentMonthDays[currentElementIndex].classList.add('active');
        } else {
            document.getElementsByClassName('active')[0].classList.remove('active');
            // console.log(currentMonthDays[currentElementIndex + 1])
            // console.log(currentMonthDays[currentElementIndex + 1]);

            currentMonthDays[currentElementIndex + 1].classList.add('active');
        }
    }
    if (event.keyCode === 104) {
        currentElementIndex = +document.getElementsByClassName('active')[0].attributes.index.value;
        // console.log(currentElementIndex, currentMonthDays.length);
        const nextIndex = currentElementIndex - 7;
        if (nextIndex < 0) {
            // document.getElementsByClassName('active')[0].classList.remove('active');
            leftArrow.click();
            currentElementIndex = 0;
            // allDaysArr[currentElementIndex].classList.add('active');
            currentMonthDays = Array.from(document.querySelectorAll('[data="sega"]'));
            currentMonthDays[currentElementIndex].classList.add('active');
        } else {
            document.getElementsByClassName('active')[0].classList.remove('active');
            currentMonthDays[currentElementIndex - 7].classList.add('active');
        }
    }


    if (event.keyCode === 98) {
        currentElementIndex = +document.getElementsByClassName('active')[0].attributes.index.value;
        // console.log(currentElementIndex, currentMonthDays.length);
        const nextIndex = currentElementIndex + 7;
        if (nextIndex > currentMonthDays.length) {
            // document.getElementsByClassName('active')[0].classList.remove('active');
            rightArrow.click();
            currentElementIndex = 0;
            // allDaysArr[currentElementIndex].classList.add('active');
            currentMonthDays = Array.from(document.querySelectorAll('[data="sega"]'));
            currentMonthDays[currentElementIndex].classList.add('active');
        } else {
            document.getElementsByClassName('active')[0].classList.remove('active');
            currentMonthDays[currentElementIndex + 7].classList.add('active');
        }
    }
}


function clicker(event) {/* clicker function checks if left arrow was selected and if true removes 1 form the counter
if not adds 1 to counter which is used down below..*/
    event.target.id === 'leftArrow' ? --counter : ++counter;//depending to pressed element count rise or fall
    const secondD = moment().add(counter, 'month').startOf('month').format('d');//getting first day short


    // console.log(secondD);
// const secondDfull = moment().add(counter - 1, 'month').startOf('month').format('dddd');
    const secondLastD = moment().add(counter, 'month').endOf('month').format('d');//getting last day short
    // console.log(secondLastD);
// const secondLastDfull = moment().add(counter - 1, 'month').endOf('month').format('dddd');
//     let dnite = '';
    let dnitePredi = '';
    let dniteSled = '';

    // let denNovi = '';
    // let denStari = '';

    dnite = range(moment().add(`${counter}`, 'month').daysInMonth());//displaying the days based on month
    dnitePredi = range(moment().add(`${counter}` - 1, 'month').daysInMonth());//getting previous month's days
    dniteSled = range(moment().add(`${counter}` + 1, 'month').daysInMonth());//getting next month's days

    denStari = function () {
        let nazad = '';
        if (`${secondD}` < 1) {
            nazad = dnitePredi.slice(-6 - `${secondD}`);
            //     nazad = dnitePredi.slice(-`${secondD}`);
        } else if (`${secondD}` === 1) {
            nazad = '';
        } else {
            nazad = dnitePredi.slice(1 - `${secondD}`);
        }
        return nazad;
    };

    denNovi = function () {
        let napred = '';

        if (`${secondLastD}` === 0) {
            napred = '';
        } else {
            napred = (dniteSled.slice(0, 7 - `${secondLastD}`));
        }

        return napred
    };

    daysAdd.innerText = '';
    displayDate.innerHTML = moment().add(counter, 'month').format('MMMM YYYY');/*.. to change the date's inner text to
//     previous or nex month*/

    xperiment(denStari(), dnite, denNovi());
    currentMonthDays = Array.from(document.querySelectorAll('[data="sega"]'));
    // console.log(currentElementIndex);
    currentMonthDays[0].classList.add('active');
    // console.log(currentMonthDays);
}

const modes = [...getElementsByClassName('theme')];//getting elements by class name
for (let mod of modes) {/* loop trough arrows variable to get both of them */

    mod.addEventListener('click', themeChager);/* while looping attach an event listener on each one, plus calling
    the clicker function*/
}


function themeChager(event) {
    // function moder(target, mode, element) {
    //
    // }

    if (event.target.id === 'light') {

        document.getElementsByTagName("head")[0].childNodes[7]
            .href = "style1.css";
        event.target.style.display = 'none';
        darkTheme.style.display = 'flex';


    }
    if (event.target.id === 'dark') {

        document.getElementsByTagName("head")[0].childNodes[7]
            .href = "style.css";
        event.target.style.display = 'none';
        lightTheme.style.display = 'flex';

    }
}


document.addEventListener('click', function (event) {
    if (event.target.dataset.diff === 'sega') {
        document.getElementsByClassName('active')[0].classList.remove('active');
        event.target.classList.add('active');
        modal.classList.remove('hidden');

    }

});

closeBtn.addEventListener('click', function () {
    modal.classList.add('hidden')
    // console.log(event.keyCode)
});


// const calendarDaysToHtml = (days, className) => {//Zaki's greatest hint
//     let html = '';
//
//     days.map(day => html += `<div class="${className}">${day}</div>`);
//
//     return html;
// };
