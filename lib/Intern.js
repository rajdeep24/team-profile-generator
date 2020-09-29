// TODO: Write code to define and export the Intern class.  HINT: This class should inherit from Employee.
const inquirer = require("inquirer");
const Employee = require("./Employee");
const App = require("../app.js");

class Intern extends Employee {
	constructor(name, id, email, school) {
		super(name, id, email);
		this.school = school;
	}
	getRole() {
		return "Intern";
	}
	getSchool() {
		return this.school;
	}
}

async function createIntern() {
	const res = await inquirer.prompt(questions);
	return new Intern(res.name, res.id, res.email, res.school);
}

const questions = [
	{ name: "name", type: "input", message: "What is the intern's name?" },
	{ name: "name", type: "input", message: "What is the intern's ID?" },
	{ name: "email", type: "input", message: "What is the intern's email?" },
	{ name: "school", type: "input", message: "What is the intern's school?" },
];

module.exports = { Intern, createIntern };
