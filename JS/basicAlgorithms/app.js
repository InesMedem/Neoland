// !
// ?
// *

/* 1 ----------------------------------------------------------------------------------------------

ITERACIÓN 1

1.1 Crea una variable llamada myFavoriteHero, asigna el valor Hulk a ella.
1.2 Crea una variable llamada x, asigna el valor 50 a ella.
1.3 Crea una variable llamada 'h' con el valor 5 y otra 'y' con el valor 10. 
1.4 Crea una otra variable 'z' y asignale el valor de 'h' + 'y'.  

---------------------------------------------------------------------------------------------- */ 

//!1.1 Crea una variable llamada myFavoriteHero, asigna el valor Hulk a ella.

let myFavoriteHero = "Hulk"; 

//!1.2 Crea una variable llamada x, asigna el valor 50 a ella.

let x = 50

//!1.3 Crea una variable llamada 'h' con el valor 5 y otra 'y' con el valor 10. 

let h = 5 
let y = 10

//!1.4 Crea una otra variable 'z' y asignale el valor de 'h' + 'y'.  

z = h + y 

/* 2 ----------------------------------------------------------------------------------------------

ITERACIÓN 2
1.1 Dado el siguiente javascript, cambia el valor de la propiedad age a 25.
const character = {name: 'Jack Sparrow', age: 10};

1.2 Declara 3 variables con los nombres y valores siguientes 
	firstName = 'Jon'; 
	lastName = 'Snow'; 
	age = 24; 
Muestralos por consola de esta forma: 
	'Soy Jon Snow, tengo 24 años y me gustan los lobos.'

1.3 Dado el siguiente javascript, imprime con un console.log la suma del precio de
ambos juguetes.
const toy1 = {name: 'Buss myYear', price: 19};
const toy2 = {name: 'Rallo mcKing', price: 29};
/
1.4 Dado el siguiente javascript, actualiza el valor de la variable globalBasePrice a 25000 
y actualiza la propiedad finalPrice de todos los coches con el valor de su propiedad 
basePrice más el valor de la variable globalBasePrice.
let globalBasePrice = 10000;
const car1 = {name: 'BMW m&m', basePrice: 50000, finalPrice: 60000};
const car2 = {name: 'Chevrolet Corbina', basePrice: 70000, finalPrice: 80000};

---------------------------------------------------------------------------------------------- */

//! 2.1 Dado el siguiente javascript, cambia el valor de la propiedad age a 25.

const character = {name: 'Jack Sparrow', age: 10};

character.age = 25

console.log(`2.1 - ${character.age}`)

//! 2.2 Declara 3 variables con los nombres y valores siguientes 
	firstName = 'Jon'; 
	lastName = 'Snow'; 
	age = 24; 
// Muestralos por consola de esta forma: 
	'Soy Jon Snow, tengo 24 años y me gustan los lobos.'

	console.log(`2.2 - Soy ${firstName, lastName} tengo ${age} y me gustan los lobos.`)

//!2.3 Dado el siguiente javascript, imprime con un console.log la suma del precio de ambos juguetes.
const toy1 = {name: 'Buss myYear', price: 19};
const toy2 = {name: 'Rallo mcKing', price: 29};

console.log(`2.3 - ${toy1.price + toy2.price}`)

//!2.4 Dado el siguiente javascript, actualiza el valor de la variable globalBasePrice a 25000 y actualiza la propiedad finalPrice de todos los coches con el valor de su propiedad basePrice más el valor de la variable globalBasePrice.

let globalBasePrice = 10000;
globalBasePrice = 25000
const car1 = {name: 'BMW m&m', basePrice: 50000, finalPrice: 60000};

car1.finalPrice = car1.basePrice + globalBasePrice
console.log(`2.4a - ${car1.finalPrice}`)

const car2 = {name: 'Chevrolet Corbina', basePrice: 70000, finalPrice: 80000};

car2.finalPrice = car2.basePrice + globalBasePrice
console.log(`2.4b - ${car2.finalPrice}`)


/* 3 ----------------------------------------------------------------------------------------------

ITERACIÓN 3

1.1 Multiplica 10 por 5 y muestra el resultado mediante console.

1.2 Divide 10 por 2 y muestra el resultado en un console.

1.3 Muestra mediante un console el resto de dividir 15 por 9.

1.4 Usa el correcto operador de asignación que resultará en o = 15, 
teniendo dos variables p = 10 y j = 5.

1.5 Usa el correcto operador de asignación que resultará en i = 50,
teniendo dos variables c = 10 y m = 5.

---------------------------------------------------------------------------------------------- */

//!3.1 Multiplica 10 por 5 y muestra el resultado mediante console.

let mult = 10 * 5
console.log(`3.1 - ${mult}`)

//! 3.2 Divide 10 por 2 y muestra el resultado en un console.

let div = 10/2
console.log(`3.2 - ${div}`)

//! 3.3 Muestra mediante un console el resto de dividir 15 por 9.

const remainder = 15%9
console.log(`3.3 - ${remainder}`)

//! 3.4 Usa el correcto operador de asignación que resultará en o = 15, teniendo dos variables p = 10 y j = 5.

p = 10 
j = 5
o = j + p
console.log(`3.4 - ${o}`)

//! 3.5 Usa el correcto operador de asignación que resultará en i = 50, teniendo dos variables c = 10 y m = 5.

c = 10 
m = 5 
i = c * m 
console.log(`3.5 - ${i}`)


/* 4 ----------------------------------------------------------------------------------------------

ITERACIÓN 4

1.1 Consigue el valor "HULK" del array de avengers y muestralo por consola.
const avengers = ["HULK", "SPIDERMAN", "BLACK PANTHER"];

1.2 Cambia el primer elemento de avengers a "IRONMAN"
const avengers = ["HULK", "SPIDERMAN", "BLACK PANTHER"];

1.3 console numero de elementos en el array usando la propiedad correcta de Array.
const avengers = ["HULK", "SPIDERMAN", "BLACK PANTHER"];

1.4 Añade 2 elementos al array: "Morty" y "Summer". 
Muestra en consola el último personaje del array
const rickAndMortyCharacters = ["Rick", "Beth", "Jerry"];

1.5 Elimina el último elemento del array y muestra el primero y el último por consola.
const rickAndMortyCharacters = ["Rick", "Beth", "Jerry", "Morty", "Summer", "Lapiz Lopez"];

1.6 Elimina el segundo elemento del array y muestra el array por consola.
const rickAndMortyCharacters = ["Rick", "Beth", "Jerry", "Morty", "Summer", "Lapiz Lopez"];

---------------------------------------------------------------------------------------------- */ 

/* 4 ----------------------------------------------------------------------------------------------

ITERACIÓN 4

1.1 Consigue el valor "HULK" del array de avengers y muestralo por consola.
const avengers = ["HULK", "SPIDERMAN", "BLACK PANTHER"];

1.2 Cambia el primer elemento de avengers a "IRONMAN"
const avengers = ["HULK", "SPIDERMAN", "BLACK PANTHER"];

1.3 console numero de elementos en el array usando la propiedad correcta de Array.
const avengers = ["HULK", "SPIDERMAN", "BLACK PANTHER"];

1.4 Añade 2 elementos al array: "Morty" y "Summer". 
Muestra en consola el último personaje del array
const rickAndMortyCharacters = ["Rick", "Beth", "Jerry"];

1.5 Elimina el último elemento del array y muestra el primero y el último por consola.
const rickAndMortyCharacters = ["Rick", "Beth", "Jerry", "Morty", "Summer", "Lapiz Lopez"];

1.6 Elimina el segundo elemento del array y muestra el array por consola.
const rickAndMortyCharacters = ["Rick", "Beth", "Jerry", "Morty", "Summer", "Lapiz Lopez"];

---------------------------------------------------------------------------------------------- */ 

//! 4.1 Consigue el valor "HULK" del array de avengers y muestralo por consola.

const avengers = ["HULK", "SPIDERMAN", "BLACK PANTHER"];
console.log(`4.1 - ${avengers[0]}`) 

//! 4.2 Cambia el primer elemento de avengers a "IRONMAN"

avengers.splice(0, 0, "IRONMAN")

console.log(`4.2 - ${avengers}`)

//! 4.3 console numero de elementos en el array usando la propiedad correcta de Array.

console.log(`4.3 - ${avengers.length}`)

//! 4.4 Añade 2 elementos al array: "Morty" y "Summer". Muestra en consola el último personaje del array

const rickAndMortyCharacters = ["Rick", "Beth", "Jerry"];

const twoMore = rickAndMortyCharacters.push("Morty","Summer")
console.log(`4.4 - ${rickAndMortyCharacters}`)
const threeMore = rickAndMortyCharacters.pop()
console.log(`4.4 - ${threeMore}`)

//! 4.5 Elimina el último elemento del array y muestra el primero y el último por consola.

const fourr = rickAndMortyCharacters.shift()
const fivee = rickAndMortyCharacters.pop()

console.log(`4.5 - primero: ${fourr}, último: ${fivee}`)

//! 4.6 Elimina el segundo elemento del array y muestra el array por consola.
//console.log(rickAndMortyCharacters)
const removeSecondElement = rickAndMortyCharacters.splice(1, 1)
console.log(`4.6 - ${removeSecondElement}`)



/* 5 ----------------------------------------------------------------------------------------------

ITERACIÓN 5

---------------------------------------------------------------------------------------------- */

const number1 = 10;
const number2 = 20;
const number3 = 2;


if (number2/number1 == 2) {
	console.log("number2 dividido entre number1 es igual a 2");
}

if (number1 !== number2 ) {
  console.log("number1 es estrictamente distinto a number2");
}

if (number3 != number1) {
  console.log("number3 es distinto number1");
}

if (number3*5 == number1) {
  console.log("number3 por 5 es igual a number1");
}

if (number3*5 == number1 && number1*2 == number2) {
  console.log("number3 por 5 es igual a number1 Y number1 por 2 es igual a number2");
}

if (number2/2 == number1 ||  number1/5 == number3) {
  console.log("number2 entre 2 es igual a number1 O number1 entre 5 es igual a number3");
}

/* ----------------------------------------------------------------------------------------------

ITERACIÓN 6

1.1 Crea un bucle for que vaya desde 0 a 9 y muestralo por consola.

1.2 Crea un bucle for que vaya desde 0 a 9 y muestralo por consola solo 
cuando el resto del numero dividido entre 2 sea 0.

1.3 Crea un bucle para conseguir dormir contando ovejas. 
Este bucle tiene que dar 10 vueltas, es decir, 10 console.log.
Muestra por consola un mensaje diciendo 'Intentando dormir 🐑' en cada vuelta del bucle 
y cambia el mensaje en la décima vuelta a 'Dormido!'.

---------------------------------------------------------------------------------------------- */

//! 1.1 Crea un bucle for que vaya desde 0 a 9 y muestralo por consola.

for (let y = 0; y <= 9; y++) console.log(y);

//!1.2

for (let i=0; i <=9; i++) if (i % 2 !== 0) console.log(i)

//!1.3 

for (let i=2; i <=10; i++) {
  console.log("Intentando dormir 🐑!")
  if (i == 10) console.log("Dormido!")
}


