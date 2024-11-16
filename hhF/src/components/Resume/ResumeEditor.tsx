import React from 'react';
import {useResumeEditor} from "../../hooks/useResumeEditor.ts";

const ResumeEditor: React.FC = () => {
    const { isLoading, saveResume, editorContainerId } = useResumeEditor();

    return (
        <div>
            <h2>Resume Editor</h2>
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <>
                    <div id={editorContainerId} style={{ border: '1px solid #ddd', padding: '10px' }}></div>
                    <button onClick={saveResume} style={{ marginTop: '10px' }}>
                        Save Resume
                    </button>
                </>
            )}
        </div>
    );
};

export default ResumeEditor;
