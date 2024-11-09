import {useEffect, useRef, useState} from "react";
import EditorJS from '@editorjs/editorjs';
import {apiClient} from "../api/axios.ts";

const SERVER_URL = `http://localhost:3000/resume`;

interface UseResumeEditorReturn {
    isLoading: boolean;
    saveResume: () => Promise<void>;
    editorContainerId: string;
}

export const useResumeEditor = (userId:string):UseResumeEditorReturn => {
    const editorInstance = useRef<EditorJS | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [resumeId, setResumeId] = useState<string | null>(null);
    const editorContainerId = 'editorjs-container';


    useEffect(() => {
        const container = document.getElementById(editorContainerId);
        if (!container) {
            console.error(`Element with ID "${editorContainerId}" is missing in the DOM.`);
            setIsLoading(false);
            return;
        }

        const initializeEditor = async () => {
            editorInstance.current = new EditorJS({
                holder: editorContainerId,
                placeholder: 'Start creating your resume',
                onChange: async () => {
                    if (editorInstance.current) {
                        const content = await editorInstance.current.save();
                        console.log("Content changed", content);
                    }
                }
            });

            const fetchResume = async () => {
                try {
                    const res = await apiClient.get(`http://localhost:3000/resume/:userId`);
                    if (res.data && editorInstance.current) {
                        setResumeId(res.data.id);
                        editorInstance.current.render(res.data.content);
                    }
                } catch (err) {
                    console.error(err);
                } finally {
                    setIsLoading(false);
                }
            };

            await fetchResume();
        }

        if (!isLoading) {
            initializeEditor();
        }


        return () => {
            if (editorInstance.current) {
                editorInstance.current.destroy();
                editorInstance.current = null;
            }
        }

    }, [userId, isLoading]);

    const saveResume = async () => {
        if (editorInstance.current) {
            const content = await editorInstance.current.save();

            try {
                if (resumeId) {
                    await apiClient.put(`${SERVER_URL}/${resumeId}`, {
                        data: content
                    });

                    alert("Successfully updated resume");
                } else {
                    const res = await apiClient.post(SERVER_URL, {
                        data: content,
                        userId: userId,
                    });

                    setResumeId(res.data.resumeId);
                    alert("Successfully created resume");
                }
            } catch (err) {
                console.error('Error saving resume:', err);
                alert('Failed to save resume');
            }
        }
    };

    return {isLoading, saveResume, editorContainerId};
}

