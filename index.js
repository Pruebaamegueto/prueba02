const readline = require('readline');

console.log("Hello, World!");
console.log("This is a test.");
function calculator(a, b, operator) {
    switch (operator) {
        case '+':
            return a + b;
        case '-':
            return a - b;
        case '*':
            return a * b;
        case '/':
            return b !== 0 ? a / b : 'Error: Division by zero';
        default:
            return 'Error: Invalid operator';
    }
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function showMenu() {
    console.log("\nCalculator Menu:");
    console.log("1. Add (+)");
    console.log("2. Subtract (-)");
    console.log("3. Multiply (*)");
    console.log("4. Divide (/)");
    console.log("5. Exit");
    rl.question("Choose an option (1-5): ", handleMenu);
}

function handleMenu(option) {
    if (option === '5') {
        console.log("Exiting...");
        rl.close();
        return;
    }

    rl.question("Enter the first number: ", (num1) => {
        rl.question("Enter the second number: ", (num2) => {
            const a = parseFloat(num1);
            const b = parseFloat(num2);
            let operator;

            switch (option) {
                case '1':
                    operator = '+';
                    break;
                case '2':
                    operator = '-';
                    break;
                case '3':
                    operator = '*';
                    break;
                case '4':
                    operator = '/';
                    break;
                default:
                    console.log("Invalid option. Try again.");
                    showMenu();
                    return;
            }

            const result = calculator(a, b, operator);
            console.log(`The result is: ${result}`);
            showMenu();
        });
    });
}

showMenu();
