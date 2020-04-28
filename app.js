const exp=require('express');
const app=exp();
const bp = require('body-parser');
const controller=require('./Server/controllers/user_controllers/users_controller');
const user=require('./Server/rout.js')
const userCntrl=require('./Server/router/routers/user_router');
const cors=require('cors');
const port = process.env.PORT || '3000';
 app.use(cors());
 app.use(bp.json());
 app.use(bp.urlencoded({ extended: false }));
 app.use("/",userCntrl);
app.listen(port,()=>{
    console.log("On port 3000");
});
