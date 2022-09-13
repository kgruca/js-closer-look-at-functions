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
        // alert('Check in'); // commenting out to stop the alerts
    } else {
        // alert('Wrong passport!'); // commenting out to stop the alerts
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

/* In programming, there are two terms used: passing by value, and passing by 
reference. In JS there is only passing by value, even though the examples above
look as if there is passing by reference going on. The distinction is that in 
JS you pass a reference to a function, but you are not passing by reference*/


// NEW SECTION
// First-class vs Higher-order functions
/* JS treats functions as first-class citizens - functions are simply values
and are just another "type" of object*/ 
// can store functions in variables or properties
// can pass functions as arguments to other functions
// can return functions from other functions
/* b/c functions are objects, they also get their own methods - can call these
methods on a function */

// this enables programmers to write higher-order functions in JS
/* = a function that receives another function as an argument, that returns
a new function, or both*/
// a func that is passed in as an arg to another func is called a callback func
// a func returned from another func is called a returned func


// NEW SECTION
// Higher-order functions practice
const oneWord = function(str) {
    return str.replace(/ /g, '').toLowerCase();
};

const upperFirstWord = function(str) {
    const [first, ...others] = str.split(' ');
    return [first.toUpperCase(), ...others].join(' ');
};
// from these two can create a higher-order function
const transformer = function(str, fn) {
    console.log(`Original string: ${str}`);
    console.log(`Transformed string: ${fn(str)}`); 
    console.log(`Transformed by: ${fn.name}`); // using func built-in property
};

transformer('JavaScript is the best!', upperFirstWord);
/* logs Original string: JavaScript is the best! Transformed string: 
JAVASCRIPT is the best! Transformed by: upperFirstWord */
transformer('JavaScript is the best!', oneWord);
/* logs Original string: JavaScript is the best! Transformed string: 
javascriptisthebest! Transformed by: oneWord*/