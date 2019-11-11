export const fields = {
    customers: [
        {
            name: 'name',
            label: 'Name',
            defaultVal: '',
            required: true
        },
        {
            name: 'phone',
            label: 'Phone',
            defaultVal: 0,
            required: true
        },
        {
            name: 'email',
            label: 'Email',
            defaultVal: '',
            required: true
        }
    ],
    devices: [
        {
            name: 'name',
            label: 'Name',
            defaultVal: '',
            calculated: ['manufacturer', 'model']
        },
        {
            name: 'manufacturer',
            label: 'Manufacturer',
            defaultVal: ''
        },
        {
            name: 'model',
            label: 'Model',
            defaultVal: '%name%',
        },
        {
            name: 'serial',
            label: 'Serial',
            defaultVal: ''
        },
        {
            name: 'title',
            label: 'Title',
            defaultVal: ''
        },
    ],
    actions: [
        {
            name: 'name',
            label: 'Name',
            defaultVal: '',
            required: true
        },
        {
            name: 'price',
            label: 'Price',
            defaultVal: 0,
            required: false
        },
    ]
};

export const colors = {
    dpblue: '#358CFF',
    dpgray: '#313442',
    gray: '#616161',
    lightgray: '#cccccc',
    green: '#32CD32',
    yellow: '#fbe555',
    orange: '#f45905',
};

export const breakpoints = {
    pointLargeGrid: 'max-width: 1260px',
    point1: 'max-width: 1024px',
    pointSmallGrid: 'max-width: 930px',
}