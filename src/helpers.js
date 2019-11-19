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
            calculated: ['manufacturer', 'model'],
        },
        {
            name: 'manufacturer',
            label: 'Manufacturer',
            defaultVal: '',
            required: true,
        },
        {
            name: 'model',
            label: 'Model',
            defaultVal: '%name%',
            required: true,
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
            required: true
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
    purple: '#8A2BE2',
    rdgray: '#4e5a6d',
    rdlightgray: '#d1d3d9',
    rddarkgray: '#4e5a6d',
    rdblue: '#5C8ACE',
};

export const breakpoints = {
    pointLargeGrid: 'max-width: 1260px',
    point1: 'max-width: 1024px',
    pointSmallGrid: 'max-width: 930px',
}

export const svgIcons = {
    home: `
    <svg viewBox="0 0 19 17" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M15.48 7.37988L17.92 7.40988" stroke="#D1D3D9" stroke-width="0.66" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M3.17008 7.59008L0.330078 7.53008L9.62008 0.330078L17.7801 7.26008" stroke="#D1D3D9" stroke-width="0.66" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M6.26014 16.5199H3.14014V7.35988L9.54014 2.62988L15.3801 7.28988L15.3601 16.5199H12.2401V8.98988H6.26014V16.5199Z" stroke="#D1D3D9" stroke-width="0.66" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M12.1698 14.6899L6.25977 14.6999" stroke="#D1D3D9" stroke-width="0.66" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
    `,
    newService: `
        <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 17.89 14">
        <defs>
            <style>.cls-1{fill:none;stroke:#d1d3d9;stroke-linecap:round;stroke-linejoin:round;stroke-width:0.66px;}</style>
        </defs>
        <title>new-service-icon</title>
        <path class="cls-1" d="M50.1,103.81a3.18,3.18,0,0,1-1.47,2.84,3,3,0,0,1-3.34,0l-10.92,7a0.57,0.57,0,0,1-.79-0.19l-0.61-1a0.6,0.6,0,0,1,.18-0.81l10.92-7a3.17,3.17,0,0,1,1.45-3.08,3.05,3.05,0,0,1,2.83-.27L45.91,103l0,1.81,1.76,0.51Z" transform="translate(-32.55 -100.74)"></path>
        <path class="cls-1" d="M34.35,109.78a6.44,6.44,0,0,1,6.13-8.24,6.31,6.31,0,0,1,2.83.67,11.64,11.64,0,0,0-.62,1.86,4.4,4.4,0,0,0-2.17-.57A4.48,4.48,0,0,0,36.06,108a4.56,4.56,0,0,0,.05.69ZM45,107.9a7.9,7.9,0,0,0,1.87.44,6.41,6.41,0,0,1-6.37,6.07,6.32,6.32,0,0,1-3.77-1.25L38.53,112a4.41,4.41,0,0,0,2,.47A4.48,4.48,0,0,0,45,108S45,107.93,45,107.9Z" transform="translate(-32.55 -100.74)"></path>
        </svg>    
    `,
    history: `
        <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15.84 12.43"><defs><style>.cls-1{fill:none;stroke:#d1d3d9;stroke-linecap:round;stroke-linejoin:round;stroke-width:0.66px;}</style></defs><title>history-icon</title><polygon class="cls-1" points="3.13 0.35 13.41 12.1 2.58 12.05 13.06 0.33 3.13 0.35"/><path class="cls-1" d="M46.59,142l-0.88-.9A4.86,4.86,0,0,0,47,137.57a4.75,4.75,0,0,0-.24-1.28l-1.18.48,1-2.34,2.56,0.9-1.15.47a5.83,5.83,0,0,1,.35,1.72A6,6,0,0,1,46.59,142Z" transform="translate(-33.57 -131.84)"/><path class="cls-1" d="M36.72,134l0.83,0.94a4.9,4.9,0,0,0-1.44,3.43,4.72,4.72,0,0,0,.18,1.29l1.2-.43-1.09,2.3-2.51-1,1.17-.42a5.79,5.79,0,0,1-.26-1.73A6,6,0,0,1,36.72,134Z" transform="translate(-33.57 -131.84)"/></svg>    
    `,
    customers: `
        <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 17.62 12.91"><defs><style>.cls-1{fill:none;stroke:#d1d3d9;stroke-linecap:round;stroke-linejoin:round;stroke-width:0.66px;}</style></defs><title>customers-icon</title><ellipse class="cls-1" cx="8.68" cy="3.88" rx="2.57" ry="3.55"/><ellipse class="cls-1" cx="3.72" cy="6.19" rx="1.37" ry="1.9"/><ellipse class="cls-1" cx="14.02" cy="6.19" rx="1.37" ry="1.9"/><path class="cls-1" d="M37.37,178.11c0-.07,0-0.14,0-0.21a4.13,4.13,0,0,1,8.24,0c0,0.07,0,.14,0,0.21H37.37Z" transform="translate(-32.68 -165.52)"/><path class="cls-1" d="M34.7,174a5.21,5.21,0,0,0-1.23,1.51,5.87,5.87,0,0,0-.46,1.14l3.58,0" transform="translate(-32.68 -165.52)"/><path class="cls-1" d="M48.28,173.67a5.21,5.21,0,0,1,1.23,1.5,5.89,5.89,0,0,1,.46,1.14l-3.58,0" transform="translate(-32.68 -165.52)"/><line class="cls-1" x1="5.29" y1="8.24" x2="5.9" y2="8.72"/><line class="cls-1" x1="12.1" y1="8.24" x2="11.49" y2="8.72"/></svg>
    `,
    actions: `
        <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19.12 17.2"><defs><style>.cls-1{fill:none;stroke:#d1d3d9;stroke-linecap:round;stroke-linejoin:round;stroke-width:0.66px;}</style></defs><title>actions</title><path class="cls-1" d="M37.8,201.58a2.25,2.25,0,1,1,2.45-2.24,2.14,2.14,0,0,1-.46,1.32l0.56,0.88,3.37,0a0.34,0.34,0,0,1,.22.08l3.39,2.21a0.3,0.3,0,0,1,.1.38l-0.26.47a0.25,0.25,0,0,1-.36.08l-3.25-2.12-2.5,0,1.92,3a0.49,0.49,0,0,1,.06.15l2,3.2h4.38a0.32,0.32,0,0,1,.34.31V210a0.33,0.33,0,0,1-.34.31H44.52a0.35,0.35,0,0,1-.26-0.11,0.31,0.31,0,0,1-.1-0.1l-2.08-3.3-0.19.1-2.63,2.4-1,4.11a0.34,0.34,0,0,1-.4.24l-0.66-.14a0.31,0.31,0,0,1-.26-0.37l1.07-4.4a0.31,0.31,0,0,1,.18-0.21l2.54-2.32-2.08-3.3-3.29.46a0.33,0.33,0,0,1-.23,0l-3.61-1.71a0.31,0.31,0,0,1-.16-0.38l0.19-.51a0.25,0.25,0,0,1,.35-0.13l3.45,1.64,2.63-.37Z" transform="translate(-31 -196.76)"/></svg>
    `,
    devices: `
        <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16.62 15.65"><defs><style>.cls-1{fill:none;stroke:#d1d3d9;stroke-linecap:round;stroke-linejoin:round;stroke-width:0.66px;}</style></defs><title>devices-icon</title><rect class="cls-1" x="12.01" y="6.07" width="4.28" height="9.25"/><rect class="cls-1" x="12.76" y="7.23" width="2.78" height="5.96"/><rect class="cls-1" x="13.71" y="14.36" width="0.89" height="0.03"/><polygon class="cls-1" points="14.47 5.98 13.59 5.98 13.59 1.38 1.21 1.38 1.21 10.09 11.94 10.09 11.94 11.14 8.33 11.14 8.33 13.29 10.98 13.29 10.98 14.55 3.82 14.55 3.82 13.29 6.47 13.29 6.47 11.14 0.33 11.14 0.33 0.33 14.47 0.33 14.47 5.98"/></svg>
    `,
    received: `
        <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15.8 15.8"><defs><style>.cls-1{fill:#4e5a6d;fill-rule:evenodd;}</style></defs><title>received-icon</title><path class="cls-1" d="M63.35,58V51.91H59.22V58H56.48l4.8,4.09L66.09,58H63.35Zm-2.06-8.92a7.9,7.9,0,1,1-7.9,7.9A7.9,7.9,0,0,1,61.29,49.12Z" transform="translate(-53.39 -49.12)"/></svg>
    `,
    inProgress: `
        <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15.8 15.8"><defs><style>.cls-1{fill:#4e5a6d;fill-rule:evenodd;}</style></defs><title>in-progress-icon</title><path class="cls-1" d="M111.9,53.95a1.32,1.32,0,1,1-1.67.8A1.31,1.31,0,0,1,111.9,53.95Zm2.92,3.14h0l-3.27,1.86L108.18,57l-0.1-3.76h0l3.27-1.86,3.37,1.9Zm-4.35-6.53a7.9,7.9,0,1,1-3.36,6.27l5.19,3.07,3.75-2V53.61Z" transform="translate(-107.11 -49.12)"/></svg>
    `,
    completed: `
        <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15.8 15.8"><defs><style>.cls-1{fill:#4e5a6d;fill-rule:evenodd;}</style></defs><title>completed-icon</title><path class="cls-1" d="M169.86,62.3l-4-4.7,1.62-1.38,2.63,3.08L176,54.22l1.38,1.62Zm1.46-13.18a7.9,7.9,0,1,1-7.9,7.9A7.9,7.9,0,0,1,171.32,49.12Z" transform="translate(-163.43 -49.12)"/></svg>
    `,
    shipped: `
        <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15.8 15.8"><defs><style>.cls-1{fill:#4e5a6d;fill-rule:evenodd;}</style></defs><title>shipped-icon</title><path class="cls-1" d="M227.49,56.45h1.6v-0.5h-1.6v0.5Zm2,0h1.6V56h-1.6v0.5Zm-3.35-1v-1h-2.4v1h-0.66V57h-0.77l1.25,3.62h6.91l2.65-3.55h-2V56.66h-1.59V57h-0.43v-0.4h-1.59V57h-0.87V55.48h-0.46Zm1.38-6.36a7.9,7.9,0,1,1-7.9,7.9A7.9,7.9,0,0,1,227.54,49.12Z" transform="translate(-219.64 -49.12)"/></svg>    
    `
}