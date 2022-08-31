const express = require('express');
const app = express();
const path = require('path');
const {models:{ Customer, Stylist, Appointment }, conn } = require('./db');


app.get('/',  (req, res)=> res.sendFile(path.join(__dirname, 'index.html')));
app.use('/dist', express.static('dist'));

app.use('/assets', express.static('assets'));
app.use(express.json());

app.get('/api/customers', async(req, res, next) => {
  try{
   res.send(await Customer.findAll()); 
  }
  catch(ex){
    next(ex);
  }
});

app.get('/api/stylists', async(req, res, next) => {
  try{
   res.send(await Stylist.findAll()); 
  }
  catch(ex){
    next(ex);
  }
});

app.get('/api/customers/:customerId/appointments', async(req,res,next) => {
  try {
    res.send(await Appointment.findAll({ where: { customerId: req.params.customerId}}));
  }
  catch(ex) {
    next(ex);
  }
});

app.post('/api/customers/:customerId/appointments', async(req,res,next) => {
  try{
    res.status(201).send(await Appointment.create({ customerId: req.params.customerId, appointmentId: req.params.appointmentId}));
  }
  catch(ex){
    next(ex);
  }
});

app.delete('/api/appointments/:id', async(req,res,next)=>{
  try{
    const appointment = await Appointment.findByPk(req.params.id);
    await appointment.destroy();
    res.sendStatus(204);
  }
  catch(ex){
    next(ex);
  }
});

const setup = async() => {
    await conn.sync({force:true});
  const customers = await Promise.all([
      Customer.create({name: "Mike"}),
      Customer.create({name: "Felipe"}),
      Customer.create({name: "Maria"}),
      Customer.create({name: "Irene"}),
      Customer.create({name: "Kevin"}),
      Customer.create({name: "Alex"}),
      Customer.create({name: "Karen"}),
      Customer.create({name: "Felicia"}),
      Customer.create({name: "Phillip"}),
      Customer.create({name: "Mason"}),
      Customer.create({name: "Rolanda"}),
      Customer.create({name: "Tabitha"})
    ]);
    const stylists = await Promise.all([
      Stylist.create({name: "Cassandra", location: "That Place"}),
      Stylist.create({name: "Michael", location: "Some Place"}),
      Stylist.create({name: "Edna", location: "Some Place"}),
      Stylist.create({name: "Jason", location: "That Place"}),
    ]);
    
    const appointments = await Promise.all([
    Appointment.create({ customerId: customers.rolanda, stylistId: stylists.Cassandra}),
    Appointment.create({ customerId: customers.tabitha, stylistId: stylists.Michael}),
    Appointment.create({ customerId: customers.kevin, stylistId: stylists.Jason})
  ]);
const port = process.env.PORT || 3000;
  app.listen(port, ()=> console.log(`listening on port ${port}`));

  
};

setup();