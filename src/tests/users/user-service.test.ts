import { SuperTest, Test } from 'supertest';
import { getTestApp, closeApp } from '../../../bootstrap';

let app: SuperTest<Test>;
describe('UserService', () => {
  let token: string;
  beforeAll(async () => {
    // creating connection with the db and getting the token for further authentication
    app = await getTestApp().then((a: SuperTest<Test>) => a);
    const requestBody = {name:'rohan',email:'test@example.com',password:'1234'}
    const response = await app.post('/register').send(requestBody);
    token = response.body.token;
    console.log(token)
  });

  afterAll(async () => {
    //closing the connection with the db
    await closeApp();
  });
  it('should login',async ()=>{
    const requestBody = {name:'rohan',email:'test@example.com',password:'1234'}
    const response = await app.get('/login').send(requestBody);
    token = response.body.token;
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('token');
  })
  it('create a new user', async () => {
    const requestBody = { name: 'Saw', email: 'saw@fd.com', password: '2345' };
    const response = await app
      .post('/users')
      .set('Authorization', 'Bearer ' + token)
      .send(requestBody);
    expect(response.statusCode).toEqual(201);
  });
  it('error creating a user if any one field is missing', async () => {
    const requestBody = { email: 'ernejkr@fd.com' };
    const response = await app
      .post('/users')
      .set('Authorization', 'Bearer ' + token)
      .send(requestBody);
    expect(response.statusCode).toEqual(400);
    expect(response.body).toHaveProperty(
      'error',
      'Name, Email and Password must be provided'
    );
  });
  it('error creating a user if user already exists', async () => {
    const requestBody = { name: 'Saw', email: 'saw@fd.com', password: '25' };
    const response = await app
      .post('/users')
      .set('Authorization', 'Bearer ' + token)
      .send(requestBody);
    expect(response.statusCode).toEqual(400);
    expect(response.body).toHaveProperty(
      'error',
      'Could not create User, user with this email already exists'
    );
  });
  it('get all the users', async () => {
    const response = await app
      .get('/users')
      .set('Authorization', 'Bearer ' + token);
    expect(response.statusCode).toEqual(200);
    expect(response.body.length).toBeGreaterThan(0);
  });
  it('get the user if it exists by Email and Password', async () => {
    const requestBody = { email: 'saw@fd.com', password: '2345' };
    const response = await app
      .get('/user')
      .set('Authorization', 'Bearer ' + token)
      .send(requestBody);
    expect(response.statusCode).toEqual(200);
    expect(response.body).toHaveProperty('email');
  });
  it('error if user does not exist, Email or password is incorrect', async () => {
    const requestBody = { email: 'Sawssss@gfg.co', password: '25' };
    const response = await app
      .get('/user')
      .set('Authorization', 'Bearer ' + token)
      .send(requestBody);
    expect(response.statusCode).toEqual(404);
    expect(response.body).toHaveProperty(
      'error',
      'No users found with that email and password'
    );
  });

  it('update name of the user if it exists based on Email and Password', async () => {
    const requestBody = { name: 'pop', email: 'saw@fd.com', password: '2345' };
    const response = await app
      .put('/users')
      .set('Authorization', 'Bearer ' + token)
      .send(requestBody);
    console.log(response.body);
    expect(response.statusCode).toEqual(200);
    expect(response.body).toHaveProperty('email');
  });
  it('error updating the user if it does not exists based on Email and Password', async () => {
    const requestBody = { email: 'ernejdfdfdfkr@fd.com', password: '2345' };
    const response = await app
      .put('/users')
      .set('Authorization', 'Bearer ' + token)
      .send(requestBody);
    expect(response.statusCode).toEqual(404);
    expect(response.body).toHaveProperty(
      'error',
      'Cannot update user, make sure user is valid'
    );
  });
  it('delete the user if it exists based on Email and Password', async () => {
    const requestBody = { email: 'saw@fd.com', password: '2345' };
    const response = await app
      .delete('/users')
      .set('Authorization', 'Bearer ' + token)
      .send(requestBody);
    expect(response.statusCode).toEqual(200);
  });
  it('error deleting the user if it does not exist based on Email and Password', async () => {
    const requestBody = { email: 'sawhi@fd.com', password: '2345' };
    const response = await app
      .delete('/users')
      .set('Authorization', 'Bearer ' + token)
      .send(requestBody);
    expect(response.statusCode).toEqual(404);
  });
});
