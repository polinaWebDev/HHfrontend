import {FormEvent, useState} from "react";
import { useNavigate } from "react-router-dom";
import {registerUser} from "../../api/axios.ts";

const RegisterForm = () => {
    const [name, setUserName] = useState('');
    const [email, setUserEmail] = useState('');
    const [password, setUserPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            const userData = {name, email, password};
            const res = await registerUser(userData);

            if (res.status === 201) {
                setMessage('Registration successfully created!');
                navigate('/login')
            } else {
                setMessage('Error creating user');
            }
        } catch (error) {
            console.log(error);
            setMessage('Error creating user');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Register</h2>
            {message && <p>{message}</p>}
            <div>
                <label>Username:</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setUserName(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Email:</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setUserEmail(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Password:</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setUserPassword(e.target.value)}
                    required
                />
            </div>
            <button type="submit">Register</button>
        </form>
    )
}

export default RegisterForm;