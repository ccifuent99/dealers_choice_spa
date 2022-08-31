import axios from 'axios';

const customersList = document.querySelector('#cs-list');
const stylistList = document.querySelector('#sb-list');
const appointmentList = document.querySelector('#am-list');

const renderCustomers = async(customers) => {
    const id = window.location.hash.slice(1);
    const html = customers.map( customer => {
        return `
            <li class ${ id*1 === customer.id ? 'selected' : ''}>
                <a href = '#${customer.id}'>${customer.name} </a>
                    </li>
        `;
    }).join('');
    customersList.innerHTML = html;
}
const renderStylists = async(stylists) => {
    const html = stylists.map( stylist => {
        return `
            <li>
              ${stylist.name}
                    </li>
        `;
    }).join('');
    stylistList.innerHTML = html;
};
const renderAppointments = async(appointments) => {
    const html = appointments.map( appointment => {
       `<li>
              ${appointment.name}
                    </li>
        `;
    }).join('');
    appointmentList.innerHTML = html;
};

const setup = async() => {
        try{
            const customers = (await axios.get('/api/customers')).data;
            const stylists = (await axios.get('/api/stylists')).data;
            renderCustomers(customers);
            renderStylists(stylists);
        }
        catch(ex){
        }
};

stylistList.addEventListener('click', async(ev)=> {
    const target = ev.target;
    const id = target.getAttribute('data-id');
    
    if(target.tagName === 'BUTTON'){
        const appointment = {
           appointmentId: appointment.find(appointment => appointment.id === id)
        };
        const response = await axios.put(`/api/appointments/${id}`, {});
    }
    renderAppointments();
});

setup();

