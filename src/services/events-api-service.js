import config from '../config';
import TokenService from './token-service';

const EventApiService = {
    getEvents(user_id) {
        return fetch(`${config.API_ENDPOINT}/events`, {
            headers: {
                'Authorization': `bearer ${TokenService.getAuthToken()}`,
                'user_id': user_id,
            },
        })
        .then(res =>
            (!res.ok)
            ? res.json().then(e => Promise.reject(e))
            : res.json()
        );
    },
    getEvent(eventId, user_id) {
        return fetch(`${config.API_ENDPOINT}/events/${eventId}`, {
            headers: {
                'Authorization': `bearer ${TokenService.getAuthToken()}`,
                'user_id': user_id,
            },
        })
        .then(res =>
            (!res.ok)
            ? res.json().then(e => Promise.reject(e))
            : res.json()    
        );
    },
    postEvent(user_id, event_name, event_date, event_start, event_end, venue, budget, guests) {
        return fetch(`${config.API_ENDPOINT}/events`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'Authorization': `bearer ${TokenService.getAuthToken()}`,
                'user_id': user_id,
            },
            body: JSON.stringify({
                user_id, 
                event_name, 
                event_date, 
                event_start, 
                event_end, 
                venue, 
                budget, 
                guests
            }),
        })
        .then(res =>
            (!res.ok)
            ? res.json().then(e => Promise.reject(e))    
            : res.json()
        );
    },
    patchEvent(user_id, eventId, newEvent) {
        return fetch(`${config.API_ENDPOINT}/events/${eventId}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json',
                'Authorization': `bearer ${TokenService.getAuthToken()}`,
                'user_id': user_id,
            },
            body: JSON.stringify(newEvent)
        })
        .catch(error => console.log(error));
    },
    deleteEvent(user_id, eventId) {
        return fetch(`${config.API_ENDPOINT}/events/${eventId}`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json',
                'Authorization': `bearer ${TokenService.getAuthToken()}`,
                'user_id': user_id,
            }
        })
        .catch(error => console.log(error));
    },
};

export default EventApiService;