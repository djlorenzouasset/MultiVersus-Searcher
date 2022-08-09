// My first project with node.js

const axios = require('axios').default;
const clc = require('cli-color');
const prompt = require('prompt-sync')();

// utils 
const endpoint = 'https://lunar-api-backend-host.herokuapp.com/api/v1/search/';


// welcome message 
console.clear(); // clear the console
console.log(clc.yellow('Hey, welcome in MultiVersus Searcher!'));
let cosmetic = prompt(clc.cyan('Enter the cosmetic name: ')); // get the cosmetic name from the user

const cosmeticName = cosmetic.toLowerCase(); // convert the cosmetic name to lowercase bcs api is shitty / jk
const x = [];
const name = cosmeticName.split(' ');

for (var i = 0; i < name.length; i++) {
    const s =  name[i].charAt(0).toUpperCase() + name[i].slice(1);
    x.push(s);
}

var newName = "";

for (var i = 0; i < x.length; i++) {
    newName += x[i];
}

// make request to the api
axios (
    {
        method: 'get',
        url: endpoint + newName,
    }
)
.then(function (response) {
    console.log(clc.yellow('Name: ' + response.data.cosmeticId.DisplayName));
    console.log(clc.yellow('Id: ' + response.data.cosmeticId.id));
    if (response.data.cosmeticId.variants.length > 0) {
        console.log(clc.yellow('Has variants: Yes'));
    }
    else {
        console.log(clc.yellow('Has variants: No'));
    }
})
.catch(function (error) {
    console.log(clc.red(error))
});