import React from 'react';
import { useNavigate } from 'react-router-dom';

export const GoBackButton = () => {
    const navigate = useNavigate();
    const history = useHistory();

    const goBack = () => {
        history.goBack();
    };

    return (
        // in einen Pfeil nach links umändern
        <>
            <button onClick={() => navigate(-1)}>go Back - später löschen</button>
        </>
    );
};

