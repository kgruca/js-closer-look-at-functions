'use strict';


const bookingArr = [];


const createBooking = function (flightNum, numPassengers = 5, price = 99) {
    // the following is the ES5 way of assigning default values
    // numPassengers = numPassengers || 1;
    // price = price || 99;

    // since ES6, the default params can be added directly to the list of 
    // parameters in the functions definition (see above)
    
    const booking = {
        flightNum,
        numPassengers,
        price,
    };
    console.log(booking);
    bookingArr.push(bookingArr);
};

createBooking('LOT2107', 321, 1356);