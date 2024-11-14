import { useEffect, useState } from 'react';
import axios from 'axios';
import { BACKEND_URL } from '@/app/config';

function useAvailableActionsAndTriggers() {
    const [availableActions, setAvailableActions] = useState([]);
    const [availableTriggers, setAvailableTriggers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);

            try {
                const [triggersResponse, actionsResponse] = await Promise.all([
                    axios.get(`${BACKEND_URL}/api/v1/trigger/available`),
                    axios.get(`${BACKEND_URL}/api/v1/action/available`)
                ]);

                setAvailableTriggers(triggersResponse.data.availableTriggers);
                setAvailableActions(actionsResponse.data.availableActions);
            } catch (err) {
                //@ts-expect-error easy
                setError(err.message || 'Error fetching data');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return {
        availableActions,
        availableTriggers,
        loading,
        error
    };
}

export default useAvailableActionsAndTriggers;
