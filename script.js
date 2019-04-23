const newMoment = moment();//using moment!!!
const displayDate = document.getElementById('date');//getting the date element from html
const idElements = element => document.getElementById(element);
const daysAdd = idElements('monthDays');

const range = (N) => Array.from({length: N}, (v, k) => k + 1);//filling the array f-n
let counter = 0;/*creating a counter variable has to be outside of the function because if it is inside always will
start from 0 */
const monthDays = range(newMoment.add(counter, 'month').daysInMonth());//getting days in month
const firstD = newMoment.startOf('month').format('d');//getting first day long version
const lastD = newMoment.endOf('month').format('d');//getting latest day long version

const elementsByClass = className => document.getElementsByClassName(className);//getting elements by className
const weekDay = [...elementsByClass('weekDays')];//getting all elements with className 'weekDays'

const modal = idElements('myModal');

const closeBtn = idElements('close');


const arrows = [...elementsByClass('buttonsSpan')];//getting elements by class name

for (let arrow of arrows) {/* loop trough arrows variable to get both of them */

    arrow.addEventListener('click', clicker);/* while looping attach an event listener on each one, plus calling
    the clicker function*/
}

displayDate.innerText = newMoment.format("MMMM YYYY");//displaying da date

document.onkeydown = function (e) {//attaching keyboard events
    switch (e.key) {
        case "ArrowLeft":
            idElements('leftArrow').click();
            break;
        // case 38:
        //     alert('up');
        //     break;
        case "ArrowRight":
            idElements('rightArrow').click();
            break;
        // case 40:
        //     alert('down');
        //     break;
    }
};

let denStart = 0;
let denEnd = 0;
const prediOnload = Array(`${firstD}` - denStart - 1)
    .fill()
    .map(() => denStart++);
// console.log(prediOnload);
const sledOnload = Array(7 - lastD)
    .fill()
    .map(() => (denEnd++) + 1);

function nonrepeat(element, neshto) {
    let htmlCont = '';

    for (i in element) {
        htmlCont += `<div data-diff="${neshto}" data = "${neshto}" class="monthDays ${neshto}">${element[i]}</div>`;
        // console.log(element[i])
    }

    return htmlCont;
}

function xperiment(predi, sega, sled) {

    daysAdd.innerHTML = nonrepeat(predi, 'predi') + nonrepeat(sega, 'sega') + nonrepeat(sled, 'sled');
}

xperiment(prediOnload, monthDays, sledOnload);


function clicker(event) {/* clicker function checks if left arrow was selected and if true removes 1 form the counter
if not adds 1 to counter which is used down below..*/
    event.target.id === 'leftArrow' ? --counter : ++counter;//depending to pressed element count rise or fall
    const secondD = moment().add(counter, 'month').startOf('month').format('d');//getting first day short
    // console.log(secondD);
// const secondDfull = moment().add(counter - 1, 'month').startOf('month').format('dddd');
    const secondLastD = moment().add(counter, 'month').endOf('month').format('d');//getting last day short
    // console.log(secondLastD);
// const secondLastDfull = moment().add(counter - 1, 'month').endOf('month').format('dddd');
    let dnite = '';
    let dnitePredi = '';
    let dniteSled = '';

    let denNovi = '';
    let denStari = '';

    dnite = range(moment().add(`${counter}`, 'month').daysInMonth());//displaying the days based on month
    dnitePredi = range(moment().add(`${counter}` - 1, 'month').daysInMonth());//getting previous month's days
    dniteSled = range(moment().add(`${counter}` + 1, 'month').daysInMonth());//getting next month's days

    denStari = function () {
        let nazad = '';
        if (`${secondD}` < 1) {
            nazad = dnitePredi.slice(-6 - `${secondD}`);
            //     nazad = dnitePredi.slice(-`${secondD}`);
        } else if (`${secondD}` == 1) {
            nazad = '';
        } else {
            nazad = dnitePredi.slice(1 - `${secondD}`);
        }
        return nazad;
    };

    denNovi = function () {
        let napred = '';

        if (`${secondLastD}` == 0) {
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
}

const modes = [...elementsByClass('theme')];//getting elements by class name
for (let mod of modes) {/* loop trough arrows variable to get both of them */

    mod.addEventListener('click', changer);/* while looping attach an event listener on each one, plus calling
    the clicker function*/
}


function changer(event) {
    // function moder(target, mode, element) {
    //
    // }
    if (event.target.id == 'light') {

        document.getElementsByTagName("head")[0].childNodes[7]
            .href = "style1.css"
        event.target.style.display = 'none';
        document.getElementById('dark').style.display = 'block';


    }
    if (event.target.id == 'dark') {

        document.getElementsByTagName("head")[0].childNodes[7]
            .href = "style.css"
        event.target.style.display = 'none';
        document.getElementById('light').style.display = 'block';

    }
}


document.addEventListener('click', function (event) {
    if (event.target.dataset.diff === 'sega') {
        // event.target
        modal.classList.remove('hidden');
    }

});

closeBtn.addEventListener('click', function () {
    modal.classList.add('hidden')


});

// const calendarDaysToHtml = (days, className) => {//Zaki's greatest hint
//     let html = '';
//
//     days.map(day => html += `<div class="${className}">${day}</div>`);
//
//     return html;
// };