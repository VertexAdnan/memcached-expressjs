const express = require('express')
const app = express()
const port = 3000

var Memcached = require('memcached');

var memcached = new Memcached();

memcached.connect('localhost:11211', function (err, conn) {
    if (err) {
        throw new Error(err);
    } else {
        console.log('Memcache connection started');
    }
});

app.get('/', (req, res) => {
    memcached.get('foo', function (err, data) {
        if (err) { throw err }

        console.log(data + ': ' + ' comes')
        res.send({ data: data });
    });
})

app.get('/add', (req, res) => {
    var data = { id: 1, name: 'foo', price: 100 }
    memcached.add('foo', data, 1000, function (err, data) {
        console.log(data + ': ' + ' added')

        res.send(data)
    })
})

app.get('/update', (req, res) => {
    memcached.replace('foo', 'updated', 1000, function (err, data) {
        if (err) { throw err }

        console.log(data + ': ' + ' updated')
        res.send(data)
    });
})

app.get('/set', (req, res) => {
    memcached.set('foo', 'bar', 1000, function (err, data) {
        if (err) { throw err }

        console.log(data + ': ' + ' set')
        res.send(data)
    });
})

app.get('/clear', (req, res) => {
    memcached.replace('foo', 'cleared', 1, function (err, data) {
        if (err)
            console.log(err);

        console.log(data + ': ' + ' Cleared')
        res.send(data)
    });
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})