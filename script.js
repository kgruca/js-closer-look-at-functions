'use strict';


const bookingArr = [];


// NEW SECTION
const createBooking = function (flightNum, numPassengers = 5, price = 99) {
    // the following is the ES5 way of assigning default values
    // numPassengers = numPassengers || 1;
    // price = price || 99;

    // since ES6, the default params can be added directly to the list of 
    // parameters in the functions declaration (see above)

    // the nice thing about the default params in ES6 is that they can be 
    // expressions (e.g. price = 99 * 1.2), or even use the values of the
    // params before it (e.g. price = 99 * numPassengers)
    
    const booking = {
        flightNum,
        numPassengers,
        price,
    };
    console.log(booking);
    bookingArr.push(bookingArr);
};

createBooking('LOT2107', 321, 1356); 
// logs {flightNum: 'LOT2107', numPassengers: 321, price: 1356}
createBooking('LH4591'); 
// logs {flightNum: 'LH4591', numPassengers: 5, price: 99}

/* if you want to skip one of the parameters in a function call, and use 
the default value instead: use "undefined" as the value of that param */
createBooking('LOT1237', undefined, 457);
// logs {flightNum: 'LOT1237', numPassengers: 5, price: 457}


// NEW SECTION
// How primites and objects work in the context of functions
const flight = 'LOT3470';
const jane = {
    name: 'Jane Nesterenko',
    passport: 348974350861246,

}

const checkIn = function (flightNum, passenger) {
    // bad practice - should not change the params of a function 
    // but, just for demonstration:
    flightNum = 'LOT9020';
    passenger.name = 'Ms. ' + passenger.name;

    if (passenger.passport === 348974350861246) {
        alert('Check in');
    } else {
        alert('Wrong passport!');
    }
};

// checkIn(flight, jane);
// console.log(flight);
// // logs LOT3470
// console.log(jane);
// logs {name: 'Ms. Jane Nesterenko', passport: 348974350861246}
/* this demonstrates the difference between primitive-type params and
object-type params.*/
/* flightNum is a copy of the value stored in flight and
it's the same as flightNum = flight. Because of this, flight does not get
directly affected by the code in the function definition */
/* objects work differently, because the passenger param works as a reference 
type to the object itself (in the memory heap). It's the same as 
passenger = jane. Because you copy the reference to the object in the memory
heap, both passenger and jane will actually point to the same object in the
memory heap*/
// basically, passenger and jane are the same object in the memory heap
// primitives don't work this way

const newPassport = function(person) {
    person.passport = Math.floor(Math.random() * 100000000000000000);
};

newPassport(jane);
checkIn(flight, jane);
// alerts 'Wrong passport!'
// this shows that two different functions are manipulating the same object
// this can cause issues, especially when a team of devs is working on code
