const inquirer = require('inquirer');
const consola = require('consola');

enum Action {
	List = 'list',
	Add = 'add',
	Remove = 'remove',
	Quit = 'quit'
}

enum MessageVariant {
	Success = 'success',
	Error = 'error',
	Info = 'info'
}

type InquirerAnswers = {
	action: Action
}

inquirer.prompt([{
  name: 'name',
  type: 'input',
  message: 'What\'s your name man?',
}, {
  name: 'age',
  type: 'number',
  message: 'How old are you?',
  default: 18,
}]).then (async(answers: { name: string, age: number}) => {
  console.log(`\nHi ${answers.name}. ${answers.age}? Nice! \n`);
});

class Message {

	constructor(private content: string) {
		this.content = content;
	}

	public show() {
		console.log(this.content)
	}

	capitalize() {
		this.content = this.content.charAt(0).toUpperCase() + this.content.slice(1).toLowerCase();
	}

 toUpperCase() {
		this.content = this.content.toUpperCase();
	}

	toLowerCase() {
		this.content = this.content.toLowerCase();
	}

	public static showColorized(variant: MessageVariant, text: string): void {
    if (variant === MessageVariant.Success) {
      consola.success(text);
    } else if (variant === MessageVariant.Error) {
      consola.error(text);
    } else if (variant === MessageVariant.Info) {
      consola.info(text);
    } else {
      consola.info(text);
    }
  }
}

interface User {
	name: string,
	age: number
}

class UsersData {
	private data: User[] = [];

	showAll(): void {
    Message.showColorized(MessageVariant.Info, 'Users data');
    if (this.data.length > 0) {
      console.table(this.data);
    } else {
      Message.showColorized(MessageVariant.Error, 'No data...');
    }
  }

	public add(user: User): void {
		if (typeof user.age === 'number' && typeof user.name === 'string' && user.age > 0 && user.name.length > 0) {
			this.data.push(user);
			Message.showColorized(MessageVariant.Success, 'User has been successfully added!');
		} else {
			Message.showColorized(MessageVariant.Error, 'Wrong data!')
		}
	}

	public remove(name: string) {
		const index = this.data.findIndex(user => user.name === name);
		if (index !== -1) {
			this.data.splice(index, 1);
			Message.showColorized(MessageVariant.Success, 'User deleted!');
		} else {
			Message.showColorized(MessageVariant.Error, 'User not found...')
		}
	}

}

const users = new UsersData();
users.showAll();
users.add({ name: "Jan", age: 20 });
users.add({ name: "Adam", age: 30 });
users.add({ name: "Kasia", age: 23 });
users.add({ name: "Basia", age: -6 });
users.showAll();
users.remove("Maurycy");
users.remove("Adam");
users.showAll();
