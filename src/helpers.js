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
