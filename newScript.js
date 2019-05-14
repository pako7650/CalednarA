/////////////////////////////////////////////////////////////////////////////////////
//Getters
const helpers = {
    //Getting elements by classname
    getElementsByClassName: className => document
        .getElementsByClassName(className),
    //Getting elements by id
    getElementsByID: element => document.getElementById(element), //getting
    //Using range to fill array used lately mostly with moment
    range: (N) => Array.from({
        length: N
    }, (v, k) => k + 1),
    //Counter value will change with switcher function below
    counter: 0
};
/////////////////////////////////////////////////////////////////////////////////////
//HTML element getters
const elements = {
    //getting the date place from html
    getDatePlace: helpers.getElementsByID('date'),
    //getting the place for displaying month's days
    daysAdd: helpers.getElementsByID('monthDays'),
    //Theme switchers
    darkTheme: helpers.getElementsByID('dark'),
    lightTheme: helpers.getElementsByID('light'),
    //getting the place for displaying week days
    weekDay: [...helpers.getElementsByClassName('weekDays')],
    //getting arrow buttons
    arrows: [...helpers.getElementsByClassName('buttonsSpan')],
    //getting days editable field..
    modal: helpers.getElementsByID('myModal'),
    //.. and its close button
    closeBtn: helpers.getElementsByID('close')
};

//Helper function to get current or previous month days. Useless basically
daysViewer = (count) =>  helpers.range(moment().add(count, 'month').daysInMonth());
//Helper function to determine beginning or end of month. Another useless f-n
monthFramer = (period) => {
    let pDay = moment().add(helpers.counter, "month")[period]("month").format('d');
    if(pDay === "0") return pDay = "7";
    return pDay;
};
//Helper function to display days inside html(..work in progress)
daysVisualiser = (element) => {
    let htmlContent = '';
    for(let el in element){
        // console.log(element)
        htmlContent += `<div class="monthDays">${element[el]}</div>`
    }
    return htmlContent;
};
//Function with functions. The point is to define first current and last
// days of month + attaching them to the html
monthVisualizer = () => {
    elements.daysAdd.innerHTML = '';
    before = () => dayGetter.firstD() === '1'?  Array.from((dayGetter.prevMonthDays().slice(-7))):
        Array.from(dayGetter.prevMonthDays().slice(-(dayGetter.firstD()-1)));
    now = () => Array.from(dayGetter.monthDays());
    after = () => Array.from(dayGetter.lastMonthDays());
    elements.daysAdd.innerHTML += daysVisualiser(before())+daysVisualiser(now())+daysVisualiser(after());
};
/////////////////////////////////////////////////////////////////////////////////////
//Month elements
const dayGetter = {
    //Getting the days for previous month
    prevMonthDays () { return daysViewer(helpers.counter -1)},

    //Getting first day of current month start
    firstD () {return monthFramer('startOf')},
    //Getting the days for current month
    monthDays () {return daysViewer(helpers.counter)},
    lastDayOfMonth ()  {return monthFramer('endOf')},
    lastMonthDays ()  {return this.lastDayOfMonth()==='7'? helpers.range(7):
        helpers.range(7 - this.lastDayOfMonth())},
    //Getting latest day for current month
    lastD ()  {return lastDayOfMonth()==='7'? helpers.range(7):helpers.range(7 - lastDayOfMonth())},
    displayDate ()  {elements.getDatePlace.innerText = moment()
        .add(helpers.counter, 'month').format("MMMM YYYY")}
};
//The idea is to visualize date onload
dayGetter.displayDate();
// Call that will visualize the days onload
monthVisualizer();
//Function that will change counter value and data. Must be defined before the
// event listener, because it is fat arrow
let switcher = (event) => {
    event.target.id === 'leftArrow' ? --helpers.counter : ++helpers.counter;
    dayGetter.displayDate();
    monthVisualizer();
};
//Attaching event listener to buttons
for (let arrow of elements.arrows) {
    arrow.addEventListener('click', switcher);
}
