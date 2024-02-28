import app from './index.js';

app.listen(process.env.PORT, () =>{
    console.log(`Server Running On Port ${process.env.PORT}`);
});