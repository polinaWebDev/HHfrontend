import {useGetJobs} from "../../hooks/useGetJobs.ts";
import React, {useEffect, useRef, useState} from "react";

const JobList = () => {
    const [searchTitle, setSearchTitle] = useState("");
    const { jobs, loading, error } = useGetJobs(searchTitle);
    const inputRef = useRef<HTMLInputElement>(null);
    //Отмена рендинга на определенный элемент

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, [jobs, loading, error]);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTitle(e.target.value);
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error loading job: {error.message}</p>;

    return (
        <div>
            <h2>Job Listings</h2>
            <input
                ref={inputRef}
                type="text"
                placeholder="Search jobs by title"
                value={searchTitle}
                onChange={handleSearchChange}
            />
            <ul>
                {jobs.map((job) => (
                    <li key={job.id}>
                        <h3>{job.title}</h3>
                        <p>{job.description}</p>
                        <p>Salary: {job.salary}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default JobList;