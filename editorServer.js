var express=require('express');
var app=express();

app.use(express.static('..\\file'));
app.get('*',(req,res,next)=>{

res.sendFile('..\\index.html');

})
app.listen(8000,()=>{
console.log('listening on 8000');
});
