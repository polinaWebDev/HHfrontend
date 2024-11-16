import {useGetJobs} from "../../hooks/useGetJobs.ts";
import React, {useEffect, useRef, useState} from "react";
import JobCard from "./JobCard.tsx";

const JobList = () => {
    const [searchTitle, setSearchTitle] = useState("");
    const { jobs, loading, error } = useGetJobs(searchTitle);
    const inputRef = useRef<HTMLInputElement>(null);

    const userId = sessionStorage.getItem('userId')!;


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
    console.log("jobs:", jobs);

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
                {jobs.map((job, ) => {
                    console.log("job.id:", job.id); // Вывод job.id в консоль
                    return (
                        <li key={job.id}>
                            <JobCard jobId={job.id} title={job.title} description={job.description} userId={userId}/>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default JobList;