// RootClassManager.tsx
import React, { useEffect } from 'react';

interface RootClassManagerProps {
    classNames: string[];
}

const RootClassManager: React.FC<RootClassManagerProps> = ({ classNames, children }) => {
    useEffect(() => {
        const rootDiv = document.getElementById('root');

        if (rootDiv) {
            // Adiciona todas as classes
            classNames.forEach(className => {
                rootDiv.classList.add(className);
            });
        }

        return () => {
            if (rootDiv) {
                classNames.forEach(className => {
                    rootDiv.classList.remove(className);
                });
            }
        };
    }, [classNames]);

    return <>{children}</>;
};

export default RootClassManager;