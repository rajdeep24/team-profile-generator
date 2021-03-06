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
let teamMember = [];

function createTeam() {
	inquirer
		.prompt([
			{
				//Name
				type: "input",
				name: "name",
				message: "What is the employee's full name",
			},

			{
				//ID Number
				type: "input",
				name: "id",
				message: "What is the employee's ID number?",
			},

			{
				//Email
				type: "input",
				name: "email",
				message: "What is the employee's email address?",
			},

			{
				//Role
				type: "list",
				name: "role",
				message: "What is the employee's job title? Please choice one from the options:",
				choices: ["Manager", "Engineer", "Intern"],
			},
		])
		.then((mainResponse) => {
			//Create a variable based on the users response to destruct the role object
			const { role } = mainResponse;

			//Write a switch statement that will evaluate an expression for the role object
			switch (role) {
				//Create  targeted questions based on roles
				//Prompt the user for the manager's office phone number
				case "Manager":
					targetedQuestions(role, "officeNumber", "What is the managers office phone number?", mainResponse);
					break;

				//Prompt the user for the engineers github username.
				case "Engineer":
					targetedQuestions(role, "github", "What is the engineer's github username?", mainResponse);
					break;

				//Prompt the user for the intern's school.
				case "Intern":
					targetedQuestions(role, "school", "What school did the intern attend?", mainResponse);
					break;
			}
		});
}

//Prompt the user to answer questions about the targeted roles ()

const targetedQuestions = (role, inputType, message, mainResponse) => {
	inquirer
		.prompt([
			{
				type: "input",
				name: inputType,
				message: message,
			},
		])
		.then((responses) => {
			let response;
			for (let key in responses) {
				response = responses[key];
			}
			const { name, id, email } = mainResponse;
			let employee;

			switch (role) {
				case "Manager":
					employee = new Manager(name, id, email, response);
					break;

				case "Engineer":
					employee = new Engineer(name, id, email, response);
					break;

				case "Intern":
					employee = new Intern(name, id, email, response);
					break;
			}
			teamMember.push(employee);
			addTeamMember();
		});
};
const addTeamMember = () => {
	inquirer
		.prompt([
			{
				type: "confirm",
				name: "addAnother",
				message: "Would you like to add another employee?",
			},
		])
		.then((response) => {
			if (response.addAnother === true) {
				createTeam();
			} else {
				const html = render(teamMember);
				writeHTMLFile(html);
			}
		});
};

// Create the HTML file using the returned from the render function above.

const writeHTMLFile = (html) => {
	fs.writeFile(outputPath, html, function (err) {
		if (err) {
			return console.log(err);
		}
		console.log("Your HTML file has been successfully created.");
	});
};
createTeam();

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
