const Sequelize = require('sequelize');
const conn = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/acme_express_spa');

const Customer = conn.define('customer', {
  name: {
     type: Sequelize.STRING,
  }
  });

const Stylist = conn.define('stylist', {
  name: {
    type: Sequelize.STRING
  },
  location: {
    type: Sequelize.STRING,
    defaultValue: ''
  }
});

const Appointment = conn.define('appointment', {
    type: Sequelize.STRING,
});


Appointment.belongsTo(Customer);
Appointment.belongsTo(Appointment);

module.exports = {
       models:{ 
         Customer,
         Stylist,
         Appointment
       },
        conn
};