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

// why does JS use callback functions so often?
//callback functions allow us to create abstraction
// abstraction is when you hide the details about a specific part of a program
/* allows programmers to think about the code on higher, more abstract level.
oneWord and upperFirstWord could have been coded directly into transformer. 
Instead, we abstracted this code (created a new level of abstraction) - 
transform doesn't care how it will modify each string, it just cares that 
some transformation will take place. transform is basically delegating
the string transformation to the lower-level functions*/


// NEW SECTION
// Functions returning functions
const greet = function(greeting) {
    return function(name) {
        console.log(`${greeting} ${name}`);
    }
};

const greeterHey = greet('Hey');
greeterHey('Krzysztof');
// logs Hey Krzysztof

// can also immediately pass in a function right after another function
greet('What\'s up')('Mati');
// logs What's up Mati

/* function s returning functions becomes really helpful when using the
functional programming paradigm */

// greet function rewritten using arrow notation
const greetArrow = greeting => name => console.log(`${greeting} ${name}`);

greetArrow('How\'s it going')('Leszek');
// logs How's it going Leszek


// NEW SECTION
// the Call and Apply methods

const lot = {
    airline: 'Lot',
    iataCode: 'LO',
    bookings: [],
    // book: function () {}
    // instead, new syntax:
    book(flightNum, name) {
        console.log(`${name} booked a seat on ${this.airline} flight 
        ${this.iataCode}${flightNum}`);
        this.bookings.push({flight: `${this.iataCode}${flightNum}`, name});
    },
};

const eurowings = {
    airline: 'Eurowings',
    iataCode: 'EW',
    bookings: [],
};

lot.book(5714, 'Elzbieta Braun');
// logs Elzbieta Braun booked a seat on Lot flight LO5714
lot.book(5714, 'Leszek Lyszczarz');
// logs Leszek Lyszczarz booked a seat on Lot flight LO5714
lot.book(142, 'Grzegorz Ryczkowski');
// logs Grzegorz Ryczkowski booked a seat on Lot flight LO142
console.log(lot);
// logs {airline: 'Lot', iataCode: 'LO', bookings: Array(3), book: ƒ}

// want eurowings to also be able to use the book function from the lot object
// can do:
const book = lot.book;
/* but now, if do something like book(23, 'Barbara Zelaskowska'), this will 
return a uncaught TypeError: cannot read property 'airline' of undefined. Why?
because now the book() function is just a regular function call, and in a 
regular function call, the 'this' keyword points to undefined (at least in 
strict mode) */
/* to go about this, we have to tell JS explicitly when we want the this
keyword to point to the lot object, and when we want it to point to the 
eurowings object */
// there are some methods on how to do this: CALL, APPLY, and BIND
// so bind(23, 'Barbara Zelaskowska') does NOT work. Instead:

// the Call method
book.call(eurowings, 23, 'Barbara Zelaskowska');
// logs Barbara Zelaskowska booked a seat on Eurowings flight EW23
console.log(eurowings);
// logs {airline: 'Eurowings', iataCode: 'EW', bookings: Array(1)}
book.call(lot, 239, 'Aleksandra Ryczkowska');
// logs Aleksandra Ryczkowska booked a seat on Lot flight LO239
console.log(lot);
// logs {airline: 'Lot', iataCode: 'LO', bookings: Array(4), book: ƒ}

/* need to use the same property names for the objects that are being called 
by the function */

// the Apply method
/* the difference between the call and apply methods is that apply won't
receive a list of arguments following the name of the function being 
passed in, but an array of the arguments instead */

const flightData = [583, 'Justyna Golab-Twarda'];
// book.apply(lot, flightData);
// logs Justyna Golab-Twarda booked a seat on Lot flight LO583
// console.log(lot);
// logs {airline: 'Lot', iataCode: 'LO', bookings: Array(5), book: ƒ}
/* the apply method isn't used so often in modern JS, b/c there's a better
way to do this */
book.call(lot, ...flightData);
// logs Justyna Golab-Twarda booked a seat on Lot flight LO583


// NEW SECTION
// the Bind method
// let's say that we want the eurowings object to always have the bind method
// using the bind method returns a new function, so can use something like
const bookEW = book.bind(eurowings);
bookEW(680, 'Svitlana Masovets');
// logs Svitlana Masovets booked a seat on Eurowings flight EW680

/* can use the bind method to create a function that won't require
the object name */
const bookLO = book.bind(lot);
bookLO(6739, 'Chris Arnoult');
// logs Chris Arnoult booked a seat on Lot flight LO6739

// can take this further
/* can use bind method to create a function for one specific airline and 
one specific flight number */
const bookEW23 = book.bind(eurowings, 23);
// now, it's like the flightNum argument is already set
// this is called partial application
// means that a part of the args of the original func are already applied
bookEW23('Krzysztof Gruca');
// logs Krzysztof Gruca booked a seat on Eurowings flight EW23

// with event listeners
lot.planes = 450;
lot.buyPlane = function() {
    console.log(this);
    this.planes++;
    console.log(this.planes);
}

// document.querySelector('.buy').addEventListener('click', lot.buyPlane);
// right now, when clicking the button, the output NaN is returned. Why?
// b/c 'this' point to the Buy button
/* IN AN EVENTHANDLER FUNCTION, THE THIS KEYWORD ALWAYS POINTS TO THE ELEMENT
ON WHICH THE HANDLER IS ATTACHED TO */
/* therefore, need to use the bind method in the eventhandler, so 'this' 
points to the lot function (in this case) */
document.querySelector('.buy').addEventListener('click', lot.buyPlane.bind(lot));
/* now, when clicking the button (the first time), we get 451 and that 'this' 
points to lot */

// partial application revisited
const addTax = (rate, value) => value + value* rate;
console.log(addTax(.1, 200));
// logs 220
// now, let's say there's one tax rate that's used all the time
const addVAT = addTax.bind(null, 0.23);
/* since the first argument in the bind method is what the 'this' keyword is
supposed to point to and we don't care about the 'this' keyworrd in functions
like this, we write null for the first argument*/
// now, the addVat function looks like  addVat = value => value + value * 0.23;
console.log(addVAT(100));
// logs 123

/* can be argued that the same can be achieved with default parameters. The 
difference, however, is that this method is creating a more specialized 
function from a more general function (kind of like child classes inheriting
from parent classes and being more specialized) */

/* challenge - create a function that returns a function that does what the 
addVat function ultimately does */

const addTaxRetFunc = rate => {
    return function(value) {
        return value + value * rate;
    }
};

const addVatRetFunc = addTaxRetFunc(.23);
console.log(addVatRetFunc(100));
// logs 123


// NEW SECTION
// Immediately Invoked Function Expressions (IIFE - pronounced iffy)
/* sometimes a function is needed that will disappear immediately after its run
once */
// traditional function:
const runOnce = function() {
    console.log('This function will never run again');
};
runOnce();
// instead
(function() {
    console.log('This function will never run again');
})();
/* trick JS into not providing an error by wrapping this function in 
parentheses */
// immediately call it with with parentheses, as well

// can create an IIFE arrow function in the same way
(() => console.log('This function will ALSO never run again'))();
// If the entire func isn't wrapped between parentheses, then it won't execute


// NEW SECTION
// Closures

// closures are not a features that are explicitly used
// closures happen automatically in certain situations 

const secureBooking = function() {
    let passengerCount = 0;

    return function() {
        passengerCount++;
        console.log(`${passengerCount} passengers`);
    };
};

// booker becomes a func since secureBooking returns a func
const booker = secureBooking();

booker();
// logs 1 passengers
booker();
// logs 2 passengers
booker();
// logs 3 passengers

/* but how does this work? The secureBooking function left the 
call stack after it was executed the first time, so how does
booker() still access the passengerCount variable? */
// a closure makes this possible 
/* a closure makes a function remember all the variables created
at the function's birthplace */
/* any function always has access to the variable environment of the 
execution context in which the function was created, even AFTER that
execution context is gone */
/* Therefore, a closure = variable environment attached to the function,
exactly as it was at the time and place the function was created */

/* so, the booker function has access to the passengerCount variable
because it's defined in the exact scope that the booker function was
created */

/* the scope chain is preserved through the closure, even when the scope
has actually been destroyed b/c its execution context is gone */

/* even though the execution context has actually been destroyed, the 
variable environment somehow continues to live somewhere in the engine */


// NEW SECTION
// More examples of situations in which closures will appear

// example 1
let f;

const g = function() {
    const a = 23;
    f = function() {
        console.log(a * 2);
    };
};

const h = function() {
    const b = 777;
    f = function() {
        console.log(b * 2);
    };
}

// the following will set a as 23 and call the new f function
g();
// the following will log the value of a * 2
f();
// logs 46
console.dir(f);
// f has the value of a in the closure (scope section)

/* in this example, f is created outside of the g function. B/c it's 
still assigned a variable in the g function, it's still able to access
the a variable even after the execution of g() has finished */

// g no longer exists but f closed over that var envt and can access a

// now take it a step further and create a second function h
// f will also be reassigned within the h func

// this makes the f var be assigned again:
h();
f();
// logs 1554
// so f now also closed over the var envt of h
console.dir(f);
// this shows that f has the value of b in the closure
// no longer has the value of a

// so when the func is reassigned a new value, then the old closure disappears

// example 2
const boardPassengers = function(n, wait) {
    const perGroup = n / 3;

    // the first argument of setTimeout func is a function
    // the 2nd arg is the time in milliseconds
    setTimeout(function() {
        console.log(`We are now boarding all ${n} passengers`);
        console.log(`There are 3 groups, each with ${perGroup} passengers`);
    }, 1000); 

    console.log(`Will start boarding in ${wait} seconds`);
};

boardPassengers(180, 3);
// logs Will start boarding in 3 seconds
// We are now boarding all 180 passengers
// There are 3 groups, each with 60 passengers

/* in this example, boardPassengers finishes exexuting, then the callback
function within setTimeout executes after 1 second. This demonstrates a
closure taking place, since the function still has access to the variables
defined within the boardPassengers function */


