import React from 'react';
import { useHistory } from 'react-router-dom';

export const GoBackButton = () => {
    const history = useHistory();

    const goBack = () => {
        history.goBack();
    };

    return (
        // in einen Pfeil nach links umändern
        <button onClick={goBack}>
            Zurück
        </button>
    );
};

export default GoBackButton;
