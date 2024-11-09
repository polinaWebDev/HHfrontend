import {FormEvent, useState} from "react";
import {createCompany} from "../../api/companyApi.ts";


const CreateCompanyForm = () => {
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            const companyData = {name};
            const result = await createCompany(companyData);
            setMessage("CreateCompany successfully created!" + result.name); //?
        } catch (error) {
            console.log(error);
            setMessage("error creating new company");
        }
    }

    return(
        <form onSubmit={handleSubmit}>
            <div>
                <label>Name:</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <button type="submit">Create Company</button>
            {message && <p>{message}</p>}
        </form>
    )
}

export default CreateCompanyForm;