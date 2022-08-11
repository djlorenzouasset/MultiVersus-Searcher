const axios = require('axios').default;
const clc = require('cli-color');
const prompt = require('prompt-sync')();

// initialize 

class Program {
    constructor() { // endpoints
        this.search = 'https://lunar-api-backend-host.herokuapp.com/api/v1/search/';
        this.all = 'https://lunar-api-backend-host.herokuapp.com/api/v1/allCosmetics';
        this.aes = 'https://lunar-api-backend-host.herokuapp.com/api/v1/aes/keys';
    };

    menu() { // show start menu
        console.log(clc.green('Hey, welcome to the MultiVersus Searcher!\nThis program allow you to get information about MultiVersus data.\n'));
        console.log(clc.yellow('1') + clc.green(' - Search for a specific item'));
        console.log(clc.yellow('2') + clc.green(' - Get for all items data'));
        console.log(clc.yellow('3') + clc.green(' - Get AES keys\n'));
        this.getChoice();
    };

    getChoice() { // get the numer of choice 
        var choice = prompt(clc.yellow('Please enter your choice: '));

        if (choice == 1) {
            this.searchItem();
        }
        else if (choice == 2) {
            this.allItems();
        }
        else if (choice == 3) {
            this.aesKeys();
        }
        else {
            console.log(clc.red('Invalid choice'));
            this.getChoice(); // in case the choice is invalid the program retry to get it
        }
    };

    searchItem() { // search an item
        let name = prompt('Enter the cosmetic name: ');
        const cosmeticName = name.toLowerCase();
        const x = [];
        const j = cosmeticName.split(' ');
        for (var i = 0; i < j.length; i++) {
            var s = j[i].charAt(0).toUpperCase() + j[i].slice(1);
            x.push(s);
        };
        var newName = "";
        for (var i = 0; i < x.length; i++) {
            newName += x[i];
        };
        axios (
            {
                method: 'get',
                url: this.search + newName,
            }
        )
        .then(
            function(res) {
                if (!('{}' in res.data)) {
                    console.log(clc.yellow('Name: ' + res.data.cosmeticId.DisplayName));
                    console.log(clc.yellow('Id: ' + res.data.cosmeticId.id));
                    if (res.data.cosmeticId.variants.length > 0) {
                        console.log(clc.yellow('Has variants: Yes'));
                    }
                    else {
                        console.log(clc.yellow('Has variants: No'));
                    };
                }
                else {
                    console.log(clc.red('Cosmetic not found'));
                }    
            }
        )
        .catch(
            function(err) {
                console.log(clc.red(err));
            }
        )
    };

    allItems() { // print all cosmetics
        axios (
            {
                method: 'get',
                url: this.all
            }
        )
        .then(
            function(res) {
                for (const [key, value] of Object.entries(res.data)) {
                    console.log(clc.yellow('Name: ' + value.DisplayName));
                    console.log(clc.yellow('Id: ' + value.id));
                    if (value.variants.length > 0) {
                        console.log(clc.yellow('Has variants: Yes'));
                    }
                    else {
                        console.log(clc.yellow('Has variants: No'));
                    };
                    console.log('');
                }
            }
        )
        .catch(
            function(err) {
                console.log(clc.red(err));
            }
        )
    };

    aesKeys() { // get current AES Key
        axios (
            {
                method: 'get',
                url: this.aes
            }
        )
        .then(
            function(res) {
                console.log(clc.green('AES key: ') + clc.cyan(res.data.data.key));
                console.log(clc.green('Date: ') + clc.cyan(res.data.data.date));
            }
        )
        .catch(
            function(err) {
                console.log(clc.red(err));
            }
        )
    };

}

const program = new Program();
program.menu();
