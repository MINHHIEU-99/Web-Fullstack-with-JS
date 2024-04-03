'use strict';

class User {
    // Private field
    #password

    constructor(firstName, lastName, username, password) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.username = username;

        // Protected property
        this.#password = password;
    }
}
