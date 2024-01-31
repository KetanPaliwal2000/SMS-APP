const Order = require("./assignment1Order");

const burger = [
    "Junior Kid's Meal Hamburger",
    "Junior Bacon Deluxe Hamburger",
    "Cheesy Cheddar Hamburger",
    "Single Cheese Hamburger",
    "Baconator Hamburger",
    "Spicy Chicken Burger",
    "Classic Chicken Burger",
    "None"
]
const burger_price = [
    4.25,
    5,
    4.5,
    8.5,
    13,
    12.25,
    12.75,
    0
]
const drink = [
    "Small Drink Freestyle",
    "Medium Drink Freestyle",
    "Large Drink Freestyle",
    "None"
]
const drink_price = [
    3,
    5,
    6.5,
    0
]
const fries = [
    "Small Fries",
    "Medium Fries",
    "Large Fries",
    "None"
]
const fries_price = [
    4.5,
    6.25,
    7.75,
    0
]

const OrderState = Object.freeze({
    WELCOMING:   Symbol("welcoming"),
    BURGER:   Symbol("burger"),
    BURGERQUAN:   Symbol("burgerquan"),
    WANTDRINK:   Symbol("wantdrink"),
    DRINK:   Symbol("drink"),
    WANTFRIES:   Symbol("wantfries"),
    FRIES:  Symbol("fries")
});

module.exports = class BagsOrder extends Order{
    constructor(){
        super();
        this.stateCur = OrderState.WELCOMING;
        this.sBurger = "";
        this.qBurger = "";
        this.wDrink = "";
        this.sDrink = "";
        this.wFries = "";
        this.sFries = "";
    }
    handleInput(sInput){
        let aReturn = [];
        let temp = "";
        switch(this.stateCur){
            case OrderState.WELCOMING:
                this.stateCur = OrderState.BURGER;
                aReturn.push("Welcome to Ketan's Burgers.");
                temp = `Which burger would you like today?
                `;
                for(let i=0; i<burger.length; i++){
                    temp+= `${i+1}) ${burger[i]}
                    `
                }
                aReturn.push(temp);
                break;
            case OrderState.BURGER:
                this.sBurger = sInput;
                if(this.sBurger!='8'){
                    this.stateCur = OrderState.BURGERQUAN
                    aReturn.push("And how many would you like?")
                }
                else{
                    this.stateCur = OrderState.WANTDRINK
                    aReturn.push("Would you like a drink?");
                }
                break;
            case OrderState.BURGERQUAN:
                this.stateCur = OrderState.WANTDRINK
                this.qBurger = sInput;
                aReturn.push("Would you like a drink with that?");
                break;
            case OrderState.WANTDRINK:
                this.wDrink = sInput;
                if(this.wDrink.toLowerCase()=='yes'||this.wDrink.toLowerCase()=='y'){
                    this.stateCur = OrderState.DRINK
                    temp = `Which drink would you like?
                    `;
                    for(let i=0; i<drink.length; i++){
                        temp+= `${i+1}) ${drink[i]}
                        `
                    }
                    aReturn.push(temp);
                }
                else{
                    aReturn.push("Would you like some fries?")
                    this.stateCur = OrderState.WANTFRIES
                }
                break;
            case OrderState.DRINK:
                this.stateCur = OrderState.WANTFRIES
                this.sDrink = sInput;
                if(this.sDrink!='4'){
                    aReturn.push("Would you also like some fries on the side with that?");
                }
                else{
                    aReturn.push("Would you like some fries?")
                }
                break;
            case OrderState.WANTFRIES:
                this.wFries = sInput;
                if(this.wFries.toLowerCase()=='yes'||this.wFries.toLowerCase()=='y'){
                    this.stateCur = OrderState.FRIES
                    temp = `Which fries would you like?
                    `;
                    for(let i=0; i<fries.length; i++){
                        temp+= `${i+1}) ${fries[i]}
                        `
                    }
                    aReturn.push(temp);
                }
                else{
                    this.isDone(true);
                    let total = 0;
                    temp = `Thank-you for your order of
                    `
                    if(this.sBurger!='8'){
                        total+=burger_price[parseInt(this.sBurger)-1]*parseInt(this.qBurger);
                        temp+=`${burger[parseInt(this.sBurger)-1]} X ${parseInt(this.qBurger)}: $${burger_price[parseInt(this.sBurger)-1].toFixed(2)}
                        `
                    }
                    if(this.sDrink!=''&&this.sDrink!='4'){
                        total+=drink_price[parseInt(this.sDrink)-1];
                        temp+=`${drink[parseInt(this.sDrink)-1]}: $${drink_price[parseInt(this.sDrink)-1].toFixed(2)}
                        `
                    }
                    if(this.sFries!=''&&this.sFries!='4'){
                        total+=fries_price[parseInt(this.sFries)-1];
                        temp+=`${fries[parseInt(this.sFries)-1]}: $${fries_price[parseInt(this.sFries)-1].toFixed(2)}
                        `
                    }
                    aReturn.push(temp);
                    aReturn.push(`ORDER DETAILS
                    ***************************
                    Order Total: $${total.toFixed(2)}
                    Tax (13%): $${(total*0.13).toFixed(2)}
                    Grand Total: $${(total*1.13).toFixed(2)}`);
                    let d = new Date(); 
                    d.setMinutes(d.getMinutes() + 20);
                    aReturn.push(`Please pick it up at ${d.toTimeString()}`);
                }
                break;
            case OrderState.FRIES:
                this.isDone(true);
                this.sFries = sInput;
                let total = 0;
                temp = `Thank-you for your order of
                `
                if(this.sBurger!='8'){
                    total+=burger_price[parseInt(this.sBurger)-1]*parseInt(this.qBurger);
                    temp+=`${burger[parseInt(this.sBurger)-1]} (${parseInt(this.qBurger)}): $${burger_price[parseInt(this.sBurger)-1].toFixed(2)}
                    `
                }
                if(this.sDrink!=''&&this.sDrink!='4'){
                    total+=drink_price[parseInt(this.sDrink)-1];
                    temp+=`${drink[parseInt(this.sDrink)-1]}: $${drink_price[parseInt(this.sDrink)-1].toFixed(2)}
                    `
                }
                if(this.sFries!=''&&this.sFries!='4'){
                    total+=fries_price[parseInt(this.sFries)-1];
                    temp+=`${fries[parseInt(this.sFries)-1]}: $${fries_price[parseInt(this.sFries)-1].toFixed(2)}
                    `
                }
                aReturn.push(temp);
                aReturn.push(`ORDER DETAILS
                ***************************
                Order Total: $${total.toFixed(2)}
                Tax (13%): $${(total*0.13).toFixed(2)}
                Grand Total: $${(total*1.13).toFixed(2)}`);
                let d = new Date(); 
                d.setMinutes(d.getMinutes() + 20);
                aReturn.push(`Please pick it up at ${d.toTimeString()}`);
                break;
        }
        return aReturn;
    }
}