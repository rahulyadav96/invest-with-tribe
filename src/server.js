const app = require('./index');
const PORT = process.env.PORT || 3001;

app.listen(PORT,async(req,res)=>{
    console.log(`server is listening on ${PORT}`);
})