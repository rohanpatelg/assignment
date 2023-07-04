import  {Express} from 'express';
import { App } from './lib/app';
App.getApp().then((app:Express)=>{
    app.listen(3002);
})
//  const app = express();
// try{

//     app.use(express.json());
//     app.listen(3002);
//     initializeAppDataSource().then(()=>{
//         app.use('/',router)
//     });
    
// }catch(err){
//     console.log('Error',err);
// }

