import  {Express} from 'express';
import { App } from './lib/app';
App.getApp().then((app:Express)=>{
    app.listen(3002);
})
