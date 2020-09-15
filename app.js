// console.log("Hello")
const express = require('express');
const morgan = require('morgan');

const app = express();
app.use(morgan('dev'));


// The app object has methods for:
// routing HTTP requests
// configuring middleware
// and more functionality too numerous to mention here

//format for .get():
// app.get(PATH, HANDLER);


// app.get('/', (req, res) => {
//     res.send('Goodbye Express!');
// });

app.get('/burgers', (req, res) => {
    res.send('We have juicy cheese burgers!');
})
app.get('/pizza/pepperoni', (req, res) => {
    res.send("Your pizza is on the way!");
})
app.get('/pizza/pineapple', (req, res) => {
    res.send("We don't serve that here. Never call again!");
})

app.get('/queryViewer', (req, res) => {
    console.log(req.query);
    res.end(); //do not send any data back to the client
});

app.get('/greetings', (req, res) => {
    //1. get values from the request
    const name = req.query.name;
    const race = req.query.race;

    //2. validate the values
    if (!name) {
        //3. name was not provided
        return res.status(400).send('Please provide a name');
    }

    if (!race) {
        //3. race was not provided
        return res.status(400).send('Please provide a race');
    }

    //4. and 5. both name and race are valid so do the processing.
    const greeting = `Greetings ${name} the ${race}, welcome to our kingdom.`;

    //6. send the response 
    res.send(greeting);
});

app.get('/sum', (req, res) => {
    //1. get values from the request
    const a = req.query.a;
    const b = req.query.b;

    const firstNum = parseFloat(a);
    const secondNum = parseFloat(b);

    //2. validate the values
    if (!a) {
        //3. a was not provided
        return res.status(400).send('Please provide a value for a');
    }

    if (!b) {
        //3. b was not provided
        return res.status(400).send('Please provide a value for b');
    }
    //validation passed so do this:
    const sum = firstNum + secondNum;

    // format the response string
    const responseString = `The sum of ${firstNum} and ${secondNum} is ${sum}`;


    // send the response
    res.send(responseString);
})

app.get('/cipher', (req, res) => {
    const text = req.query.text
    console.log(text)
    const shift = req.query.shift

    //2. validate the values
    if (!text) {
        //3. text was not provided
        return res.status(400).send('Please provide a value for text');
    }

    if (!shift) {
        //3. shift was not provided
        return res.status(400).send('Please provide a value for shift');
    }

    const shiftNum = parseFloat(shift)

    // shift must be a number
    if (Number.isNaN(shiftNum)) {
        return res
            .status(400)
            .send('shift value must be a number');
    }

    // get char code 
    const base = 'A'.charCodeAt(0);

    //change all strings to uppercase
    //create an array of characters
    //map original char to converted char
    const cipher = text.toUpperCase().split("").map(char => {
            //gets the char code index begins at 0
            const code = char.charCodeAt(0)

            //create conditional for values outside of 26 letters
            //  if (code < base || code > (base + 26)) {
            //      return char;
            //  }

            //get the "distance value" from A
            let disValFromA = code - base;
            disValFromA = disValFromA + shiftNum;

            //Hmmmmm...
            // in case shift takes the value past Z, cycle back to the beginning
            disValFromA = disValFromA % 26;

            //convert char back to readable character
            const shiftedChar = String.fromCharCode(base + disValFromA);
            return shiftedChar;
        })
        //use .join() to make a string from the array
        .join(" ");
    console.log(text)
    // send the response
    res.status(201).send(cipher);

})


app.get('/lotto', (req, res) => {
    //1. get values from the request
    const numbers = req.query.numbers;

    //2. validate the values
    if (!numbers) {
        //3. numbers was not provided
        return res.status(400).send('Please provide a value for numbers');
    }
    if (!Array.isArray(numbers)) {
        //4. an array was not provided
        return res.status(400).send('Please provide an array for numbers');
    }
    //try w/o parseInt or with parseFloat
    const guesses = numbers.map(nums => parseInt(nums)).filter(nums => !Number.isNaN(nums) && (nums >= 1 && nums <= 20));

    //2. validate the guesses entered ("were 6 guesses give?")
    if (guesses.length != 6) {
        return res
            .status(400)
            .send("numbers must contain 6 integers between 1 and 20");
    }

    //const stockNumbers = Array(20).fill(2).map((numbers, index) => index + 1);
    //create an array of winning numbers
    //const correctNumbers = [ 5, 10, 15, 20, 25, 30]

    //create a function with conditionals that compares 
    //the winning numbers to the guesses

    // const winningNumbers = [];
    // for (let i = 0; i < 6; i++) {
    //     const ran = Math.floor(Math.random() * stockNumbers.length);
    //     winningNumbers.push(stockNumbers[ran]);
    //     stockNumbers.splice(ran, 1);
    // }



    //different response conditionals
    if (guesses < 4) {
        return res.status(400).send("Sorry, you lose");
    }

    if (guesses === 4) {
        return res.status(400).send("Congratulations, you win a free ticket");
    }

    if (guesses === 5) {
        return res.status(400).send("Congratulations! You win $100!");
    }

    if (guesses === 6) {
        return res.status(400).send("Wow! Unbelievable! You could have won the mega millions!");
    }

    //4. and 5. both name and race are valid so do the processing.
    const greeting = `Greetings ${name} the ${race}, welcome to our kingdom.`;

    //6. send the response 
    res.send(greeting);
});


app.listen(8000, () => {
    console.log('Express server is listening on port 8000!');
});