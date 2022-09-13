'use strict';


const bookingArr = [];


const createBooking = function (flightNum, numPassengers = 5, price = 99) {
    // the following is the ES5 way of assigning default values
    // numPassengers = numPassengers || 1;
    // price = price || 99;

    // since ES6, the default params can be added directly to the list of 
    // parameters in the functions definition (see above)

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

// if you want to skip one of the parameters in a function call, and use 
// the default value instead: use "undefined" as the value of that param
createBooking('LOT1237', undefined, 457);
// logs {flightNum: 'LOT1237', numPassengers: 5, price: 457}



