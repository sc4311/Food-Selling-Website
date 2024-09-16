import React, { useState } from "react";
import Button from "../UI/Button";

const AddUsers = (props) => {
    const [enteredEmail, setEnteredEmail] = useState('');
    const [enteredAge, setEnteredAge] = useState('');

    const addUserHandler = (event) => {
        event.preventDefault();
        if (enteredEmail.trim().length === 0 || enteredAge.trim().length === 0) {
            return;
        }
        props.onAddUser({
            email: enteredEmail,
            age: enteredAge
        });
        setEnteredEmail('');
        setEnteredAge('');
    };

    return (
        <form onSubmit={addUserHandler}>
            <label htmlFor="email">Email</label>
            <input
                id="email"
                type="email"
                value={enteredEmail}
                onChange={(e) => setEnteredEmail(e.target.value)}
            />
            <label htmlFor="age">Age (Years)</label>
            <input
                id="age"
                type="number"
                value={enteredAge}
                onChange={(e) => setEnteredAge(e.target.value)}
            />
            <Button type="submit">Add User</Button>
        </form>
    );
};

export default AddUsers;
