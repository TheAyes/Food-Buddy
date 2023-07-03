const count = 128;

let result = "";

const characters = "aAbBcCdDeEfFgGhHiIjJkKlLmMnNoOpPqQrRsStTuUvVwWxXyYzZ";
const numbers = "0123456789";

for (let i = 0; i < count; i++) {
	const randomChar = characters.at(Math.floor(Math.random() * characters.length));
	const randomNumber = numbers.at(Math.floor(Math.random() * numbers.length));
	result += Math.random() >= 0.5 ? randomChar : randomNumber;
}

console.log(result);
