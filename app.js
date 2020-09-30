const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

//Store your team members to an array th
let teamMembers = [];

const questionOneAddPop = {
	type: "list",
	message: "Would like to add a member or populate the current team?",
	name: "add",
	choices: ["Add Member", "Populate Team"],
};

const questionTwoRole = {
	type: "list",
	message: "What member would you like to add?",
	name: "role",
	choices: ["Manager", "Engineer", "Intern"],
};

const Questions = {
	Manager: [
		{
			type: "input",
			message: "What is your name?",
			name: "name",
		},
		{
			type: "input",
			message: "What is your id?",
			name: "id",
		},
		{
			type: "input",
			message: "What is your email?",
			name: "email",
		},
		{
			type: "input",
			message: "What is your office number?",
			name: "officeNumber",
		},
	],
	Engineer: [
		{
			type: "input",
			message: "What is your name?",
			name: "name",
		},
		{
			type: "input",
			message: "What is your name?",
			name: "name",
		},
		{
			type: "input",
			message: "What is your name?",
			name: "name",
		},
		{
			type: "input",
			message: "What is your name?",
			name: "name",
		},
	],
	Intern: [
		{
			type: "input",
			message: "What is your name?",
			name: "name",
		},
		{
			type: "input",
			message: "What is your name?",
			name: "name",
		},
		{
			type: "input",
			message: "What is your name?",
			name: "name",
		},
		{
			type: "input",
			message: "What is your name?",
			name: "name",
		},
	],
};

function createTeam() {
	inquirer.prompt(questionOneAddPop).then(function (response) {
		if (response.add === "Add Member") {
			// call addMember function
			addMember();
		} else {
			// call printTeam function
			printTeam();
		}
	});
}

function printTeam() {
	// call render function and pass teamMembers array to it - store result in variable.
	const teamMembersHTML = render(teamMembers);
	// write result to output file
	fs.writeFileSync(outputPath, teamMembersHTML);
}

function addMember() {
	// use inquirer to ask the user which member to add
	inquirer.prompt(questionTwoRole).then(function (response) {
		if (response.role === "Manager") {
			addManager();
		} else if (response.role === "Engineer") {
			addEngineer();
		} else if (response.role === "Intern") {
			addIntern();
		}
	});
	// if the user chooses manager call manager function
	// if the user chooses Engineer call eng function
	// if the user chooses Intern call intern function
}

function addManager() {
	// user inquirer to ask manager questions
	inquirer.prompt(Questions.Manager).then(function (response) {
		const managerObj = new Manager(response.name, response.id, response.email, response.officeNumber);
		teamMembers.push(managerObj);
	});
	// create a new manager object
	// push the manager object to the teamMembers array
}

function addEngineer() {
	// user inquirer to ask Engineer questions
	// create a new Engineer object
	// push the Engineer object to the teamMembers array
}

function addIntern() {
	// user inquirer to ask Intern questions
	// create a new Intern object
	// push the Intern object to the teamMembers array
}

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
