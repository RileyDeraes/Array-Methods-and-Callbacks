import { fifaData } from './fifa.js';
console.log(fifaData);

console.log("It's working!");
// ⚽️ M  V P ⚽️ //

/* Task 1: Investigate the data above. Practice accessing data by console.log-ing the following pieces of data 

(a) Home Team name for 2014 world cup final
(b) Away Team name for 2014 world cup final
(c) Home Team goals for 2014 world cup final
(d) Away Team goals for 2014 world cup final
(e) Winner of 2014 world cup final */

let fifaDataResults = fifaData.filter((item) => {
    return item.Year === 2014 && item.Stage === "Final" //Because it's all for the 2014 WC Finals, so filter.
});

//Here's the shorter version:  const fifaDataResults = fifaData.filter(item => item.Year === 2014 && item.Stage === "Final"); 
//I prefer the longer version because it's easier to understand at a glance, but maybe I just haven't coded long enough! 😂


console.log(`Home Team name for 2014 world cup final: ${fifaDataResults[0]["Home Team Name"]}`);
console.log(`Away Team name for 2014 world cup final${fifaDataResults[0]["Away Team Name"]}`);
console.log(`Home Team goals for 2014 world cup final: ${fifaDataResults[0]["Home Team Goals"]}`);
console.log(`Away Team goals for 2014 world cup final: ${fifaDataResults[0]["Away Team Goals"]}`);
console.log(`Winner of 2014 world cup final: ${fifaDataResults[0]["Win conditions"]}`);

//It's possible to do without filtering.

console.log(`Winner of 2014 world cup final: ${fifaData[828]["Win conditions"]}`);

//This isn't very feasible though, because scrolling through such a long list can be tedious, especially when trying to pin-point the exact data. (Although CTRL+F came in handy 😂)


/* Task 2: Create a function called  getFinals that takes `data` as an argument and returns an array of objects with only finals data */

function getFinals(data) {
    return data.filter(item => 
        (item.Stage === "Final")); //Filters out everything that doesn't have "Final" as its Stage, since we only want data on the Finals.
};

console.log(getFinals(fifaData));

/* Task 3: Implement a higher-order function called `getYears` that accepts the callback function `getFinals`, and returns an array called `years` containing all of the years in the dataset */

function getYears(callback, data) {
    const years = []; 
    callback(data).map(item => years.push(item.Year) ) //Pushes all the years to the new array.
    return years;
};

console.log(getYears(getFinals, fifaData));



/* Task 4: Implement a higher-order function called `getWinners`, that accepts the callback function `getFinals()` and determine the winner (home or away) of each `finals` game. Return the name of all winning countries in an array called `winners` */ 

function getWinners(callback, data) {
    const winners = [];

    callback(data).forEach(item => {
        if (item["Home Team Goals"] > item["Away Team Goals"]) {
            winners.push(item["Home Team Name"])
        } else{
            winners.push(item["Away Team Name"]) 
        } //If the home team scored more goals, they're the winners, so they get added. And vice versa.
    })
    return winners;
};

console.log(getWinners(getFinals, fifaData));

/* Task 5: Implement a higher-order function called `getWinnersByYear` that accepts the following parameters and returns a set of strings "In {year}, {country} won the world cup!" 

Parameters: 
 * callback function getWinners
 * callback function getYears
 */

function getWinnersByYear(callback1, callback2, callback3, data) {
    let winners = callback1(callback3, data); //Gets the winners from the function above.
    let years  = callback2(callback3, data); //Gets the years from the function above.
    winners.forEach((item, index) => {
        console.log(`In ${years[index]}, ${item} won the world cup!`); //Logs the winners and their respective years.
    });
};

console.log(getWinnersByYear(getWinners, getYears, getFinals, fifaData)); //Gives us a nice little list.


/* Task 6: Write a function called `getAverageGoals` that accepts a parameter `data` and returns the the average number of home team goals and away team goals scored per match (Hint: use .reduce and do this in 2 steps) */
function getAverageGoals(data) {
    let averageHomeGoals = data.reduce((accumulator, index) => {return accumulator + index["Home Team Goals"]/ data.length}, 0); //Adds all the goals from the index, then divides it by length/matches played.
    let averageAwayGoals = data.reduce((accumulator, index) => {return accumulator + index["Away Team Goals"]/ data.length}, 0); //Adds all the goals from the index, then divides it by length/matches played.
    return (`The home team scored an average of: ${averageHomeGoals} goals.
             The Away team scored an average of ${averageAwayGoals} goals.`); //Looks nicer in VSCode but looks goofy in the console. 😅
};

console.log(getAverageGoals(fifaData));