let express=require('express');
let app=express();
let multiParty=require('connect-multiparty');
let multiTool=multiParty();
let personalToken='1234567890';

let dataMap=new Map();

app.get('/api/compute', function (req, res) {
    if(req.get('hw-token') !== personalToken)
        res.status(403).end();
    else
    {
        let response=new Object();
        switch (req.query.type)
        {
            case 'ADD':
                response.ans=parseFloat(req.query.firstParam)+parseFloat(req.query.secondParam);
                break;
            case 'SUB':
                response.ans=parseFloat(req.query.firstParam)-parseFloat(req.query.secondParam);
                break;
            case 'MUL':
                response.ans=parseFloat(req.query.firstParam)*parseFloat(req.query.secondParam);
                break;
            case 'DIV':
                response.ans=Math.floor(parseFloat(req.query.firstParam)/parseFloat(req.query.secondParam));
                break;
        }
        res.set("Content-Type","application/json;charset=utf-8");
        res.send(JSON.stringify(response));
    }
});

app.post('/api/pair', multiTool, function (req, res) {
    if(req.get('hw-token') !== personalToken)
        res.status(403).end();
    else
    {
        dataMap.set(req.body.key, req.body.value);
        res.send("set");
    }
});

app.get('/api/pair', function (req, res) {
    if(req.get('hw-token') !== personalToken)
        res.status(403).end();
    else
    {
        let response={};
        if(dataMap.has(req.query.key))
        {
            response.value=dataMap.get(req.query.key);
            //res.send(JSON.stringify(response));
            res.set("Content-Type","application/json;charset=utf-8");
            res.json(response);
        }
        else
            res.status(404).end();
    }
});

app.delete('/api/pair', function (req,res) {
    if(req.get('hw-token') !== personalToken)
        res.status(403).end();
    else
    {
        if(dataMap.has(req.query.key))
            dataMap.delete(req.query.key);
        res.send('Deleted');
    }

});

app.get('/', function (req, res) {
    res.send('Hello World');
})

var server = app.listen(8081, function () {

    var host = server.address().address
    var port = server.address().port

    console.log("应用实例，访问地址为 http://%s:%s", host, port)

});


