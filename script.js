const newMoment = moment().format('MMMM YYYY');//using moment!!!
const displayDate = document.getElementById('date');//getting the date element from html
displayDate.innerText = newMoment;//displaying da date
const daysAdd = document.getElementById("monthDays");//getting the element from the html
const range = (N) => Array.from({length: N}, (v, k) => k + 1);//filling the array f-n
let counter = 0;/*creating a counter variable has to be outside of the function because if it is inside always will
start from 0 */
const monthDays = range(moment().add(counter, 'month').daysInMonth());//getting days in month
const firstD = moment().startOf('month').format('d');//getting first day long version
const lastD = moment().endOf('month').format('d');//getting latest day long version
console.log(firstD);//logging first day
console.log(lastD);//logging latest day
const elementsByClass = className => document.getElementsByClassName(className);//getting elements by className
const weekDay = [...elementsByClass('weekDays')];//getting all elements with className 'weekDays'

const arrows = [...elementsByClass('buttonsSpan')];//getting elements by class name
// const  = getArrows('buttonsSpan');/* getting specific class name 'buttons */
for (let arrow of arrows) {/* loop trough arrows variable to get both of them */

    arrow.addEventListener('click', clicker);/* while looping attach an event listener on each one, plus calling
    the clicker function*/
}
let denStart = 0;
let denEnd = 0;
const prediOnload = Array(`${firstD}`-denStart-1)
    .fill()
    .map(() => denStart++);
console.log(prediOnload);
const sledOnload = Array(7-lastD)
    .fill()
    .map(()=> (denEnd++)+1);
console.log(sledOnload);
// let monthDaySpans = prediOnload.concat(monthDays).concat(sledOnload).map(monthDay => daysAdd.innerHTML +=//creating month days onload
//     `<div class="monthDays">${monthDay}</div>`);
let ne6toOnload = '';
if (prediOnload == 0) {
    ne6toOnload = monthDays.concat(sledOnload).map(den => daysAdd.innerHTML += `<div class="monthDays">${den}</div>`);
} else if (sledOnload == 0) {
    ne6toOnload = prediOnload.concat(monthDays).map(den => daysAdd.innerHTML += `<div class="monthDays">${den}</div>`);
} else {
    ne6toOnload = prediOnload.concat(monthDays).concat(sledOnload).map(den => daysAdd.innerHTML +=
        `<div class="monthDays">${den}</div>`);
}


function clicker(event) {/* clicker function checks if left arrow was selected and if true removes 1 form the counter
if not adds 1 to counter which is used down below..*/
    event.target.id === 'leftArrow' ? --counter : ++counter;//depending to pressed element count rise or fall
    const secondD = moment().add(counter, 'month').startOf('month').format('d');//getting first day short
    console.log(secondD);
// const secondDfull = moment().add(counter - 1, 'month').startOf('month').format('dddd');
    const secondLastD = moment().add(counter, 'month').endOf('month').format('d');//getting last day short
    console.log(secondLastD);
// const secondLastDfull = moment().add(counter - 1, 'month').endOf('month').format('dddd');
    let dnite = '';
    let dnitePredi = '';
    let dniteSled = '';

    let denNovi = '';
    let denStari = '';


    // if(event.target.id === "leftArrow"){
    dnite = range(moment().add(`${counter}`, 'month').daysInMonth());//displaying the days based on month
    dnitePredi = range(moment().add(`${counter}` - 1, 'month').daysInMonth());//getting previous month's days
    dniteSled = range(moment().add(`${counter}` + 1, 'month').daysInMonth());//getting next month's days
    // } else {
    //     dnite = range(moment().add(`${counter}`, 'month').daysInMonth());//displaying the days based on month
    //     dnitePredi = range(moment().add(`${counter}` - 1, 'month').daysInMonth());//getting previous month's days
    //     dniteSled = range(moment().add(`${counter}`+1, 'month').daysInMonth());//getting next month's days
    // }


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
    // } else if (secondD == 1){

    denNovi = function () {
        let napred = '';

        if (`${secondLastD}` == 0) {
            napred = '';
        } else {
            napred = (dniteSled.slice(0, 7 - `${secondLastD}`));
        }
        // else if(secondLastD == 1){
        //     napred = (dniteSled.slice(0,`${secondLastD}`))
        // } else {
        //     napred=(dniteSled.slice(0,`${secondLastD}`-1));
        // }
        return napred
    };
    console.log(denStari());
    console.log(denNovi());
    // console.log(dnitePredi);
    console.log(dnite);
    // console.log(dniteSled);
    // console.log(secondD);
    // console.log(secondLastD);


    daysAdd.innerText = '';

    let ne6to = '';
    if (denStari() == '') {
        ne6to = dnite.concat(denNovi()).map(den => daysAdd.innerHTML += `<div class="monthDays">${den}</div>`);
    } else if (denNovi() == '') {
        ne6to = denStari().concat(dnite).map(den => daysAdd.innerHTML += `<div class="monthDays">${den}</div>`);
    } else {
        ne6to = denStari().concat(dnite).concat(denNovi()).map(den => daysAdd.innerHTML +=
            `<div class="monthDays">${den}</div>`);
    }

    // console.log(ne6to);

    displayDate.innerHTML = moment().add(counter, 'month').format('MMMM YYYY');/*.. to change the date's inner text to
    previous or nex month*/


    // console.log(prazno);
    // console.log(secondDfull);
    // console.log(secondLastDfull);
    return ne6to
}



// const calendarDaysToHtml = (days, className) => {//Zaki's greatest hint
//     let html = '';
//
//     days.map(day => html += `<div class="${className}">${day}</div>`);
//
//     return html;
// };