
import {SuperTest,Test} from 'supertest';
import { DataSource } from 'typeorm';
import { getTestApp } from '../../../bootstrap';
import { UserService } from '../../service/user.service';
// Your Express app configuration file

let dataSource: DataSource;
let app:SuperTest<Test>;
const userService: UserService = new UserService();

test("Sd",async()=>{
    app = await getTestApp().then((a:SuperTest<Test>)=>a);
    //console.log(app)
    const response = await app.get('/users/1');
    expect(response.statusCode).toEqual(200);
    
})
// before(done => {
//   // Create a new instance of DataSource
//   getTestApp().then((a:SuperTest<Test>) => { app = a;done(); }).catch(done);
// });
// describe("GET /users/1",()=>{
//     before(done => {
//         userService.getUserById("1").then(()=>done())
//     });

//     it("should return a user", done => {
//         app.get("/users/1").expect(200, done);
//     });
// })
  