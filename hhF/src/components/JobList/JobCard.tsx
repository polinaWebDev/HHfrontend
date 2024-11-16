// JobCard.tsx
import React, { useState } from 'react';
import axios from 'axios';

interface JobCardProps {
    jobId: string;
    title: string;
    description: string;
    userId: string;
}

const JobCard: React.FC<JobCardProps> = ({ jobId, title, description, userId }) => {
    const [applied, setApplied] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleApply = async () => {
        console.log("jobId in handleApply:", jobId);
        try {
            await axios.post(`http://localhost:3000/application/${jobId}`, {}, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            setApplied(true);
        } catch (err) {
            setError('Could not submit application. Try again later.');
        }
    };

    return (
        <li className="job-card">
            <h3>{title}</h3>
            <p>{description}</p>
            <button onClick={handleApply} disabled={applied}>
                {applied ? 'Application Submitted' : 'Apply Now'}
            </button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </li>
    );
};

export default JobCard;
