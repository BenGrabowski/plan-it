const STORE = [
    {
        id: 1,
        name: 'Wedding',
        date: 'April 16th, 2021',
        time: '3:00 PM - 10:00 PM MT',
        venue: {
            name: 'El Chorro',
            address_street: '5550 E Lincoln Dr',
            address_city: 'Paradise Valley',
            address_state: 'AZ',
            address_zip: '85253'
        },
        budget: {
            total: 50000,
            venue: 20000,
            food: 10000,
            drinks: 7500,
            decorations: 5000,
            other: 5000
        },
        guests: {
            max: 180,
            list: ['Patty', 'Joe', 'Katie', 'Alex', 'Matt', 'Nancy', 'Colton']
        }
    },
    {
        id: 2,
        name: 'Bachelor Party',
        date: 'March 6th, 2021',
        time: null,
        venue: {
            name: 'ARIA Resort & Casino',
            address_street: '3730 S Las Vegas Blvd',
            address_city: 'Las Vegas',
            address_state: 'NV',
            address_zip: '89158'
        },
        budget: {
            total: 1500,
            venue: 500,
            food: 300,
            drinks: 500,
            decorations: null,
            other: 200
        },
        guests: {
            max: 12,
            list: ['Drew', 'Freddy', 'Alex', 'Wes', 'Madison']
        }
    }
];

export default STORE;