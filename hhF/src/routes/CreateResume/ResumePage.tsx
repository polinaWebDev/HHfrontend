import React from 'react';
import { useParams } from 'react-router-dom';
import ResumeEditor from "../../components/Resume/ResumeEditor.tsx";

const ResumeEditorPage: React.FC = () => {
    const { userId } = useParams<{ userId: string }>();

    if (!userId) {
        return <p>User ID is missing.</p>;
    }

    return (
        <div>
            <h2>Edit Resume for User: {userId}</h2>
            <ResumeEditor userId={userId} />
        </div>
    );
};

export default ResumeEditorPage;
