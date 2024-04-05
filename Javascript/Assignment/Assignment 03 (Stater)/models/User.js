'use strict';

class User {
    // Private field
    // #password;

    constructor(firstName, lastName, username, password) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.userName = username;

        // Protected property
        this.password = password;
    }
}

function parseUser(userData) {
	const user = new User(userData.firstName, userData.lastName, userData.userName, userData.password);

	return user;
};

