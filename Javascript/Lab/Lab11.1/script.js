'use strict';

///////////////////////////////////////
// Coding Challenge #1

/* 
Let's build a simple poll app!

A poll has a question, an array of options from which people can choose, and an array with the number of replies for each option. This data is stored in the starter object below.

Here are your tasks:

1. Create a method called 'registerNewAnswer' on the 'poll' object. The method does 2 things:
  1.1. Display a prompt window for the user to input the number of the selected option. The prompt should look like this:
        What is your favourite programming language?
        0: JavaScript
        1: Python
        2: Rust
        3: C++
        (Write option number)
  
  1.2. Based on the input number, update the answers array. For example, if the option is 3, increase the value AT POSITION 3 of the array by 1. Make sure to check if the input is a number and if the number makes sense (e.g answer 52 wouldn't make sense, right?)
2. Call this method whenever the user clicks the "Answer poll" button.
3. Create a method 'displayResults' which displays the poll results. The method takes a string as an input (called 'type'), which can be either 'string' or 'array'. If type is 'array', simply display the results array as it is, using console.log(). This should be the default option. If type is 'string', display a string like "Poll results are 13, 2, 4, 1". 
4. Run the 'displayResults' method at the end of each 'registerNewAnswer' method call.

HINT: Use many of the tools you learned about in this and the last section 😉

BONUS: Use the 'displayResults' method to display the 2 arrays in the test data. Use both the 'array' and the 'string' option. Do NOT put the arrays in the poll object! So what shoud the this keyword look like in this situation?

BONUS TEST DATA 1: [5, 2, 3]
BONUS TEST DATA 2: [1, 5, 3, 9, 6, 1]

GOOD LUCK 😀
*/

const poll = {
    question: "What is your favourite programming language? ",
    options: ["0: JavaScript", "1: Python", "2: Rust", "3: C++"],
    numberOfVotes: new Array(4).fill(0),
    registerNewAnswer: function() {
        let result = prompt(`${this.question}\n${this.options[0]}\n${this.options[1]}\n${this.options[2]}\n${this.options[3]}\n(Write option number)`);
        if (isNaN(result) || result > 3 || result < 0) {
            alert('Invalid answer!');
            return 0;
        }
        else 
            this.numberOfVotes[result]++;
            this.displayResults();
            this.displayResults('string');

    },
    displayResults(type='array') {
        if (type=='array') {
            console.log(this.numberOfVotes);
        }
        else if (type=='string') {
            console.log(`Poll results are ${this.numberOfVotes.join(', ')}`);
        }

    }


}

document.querySelector('.poll').addEventListener('click', poll.registerNewAnswer.bind(poll));


poll.displayResults.call({numberOfVotes: [5, 2, 3]});
poll.displayResults.call({numberOfVotes: [5, 2, 3]}, 'string');
poll.displayResults.call({numberOfVotes: [1, 5, 3, 9, 6, 1]});
poll.displayResults.call({numberOfVotes: [1, 5, 3, 9, 6, 1]}, 'string');

(function() {
    const header = document.querySelector('h1');
    header.style.color = 'red';
    document.querySelector('body').addEventListener('click', function() {
        header.style.color = 'blue';
        console.dir();
    })
})();