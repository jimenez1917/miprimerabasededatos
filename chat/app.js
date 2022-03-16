import options from "./options/mysqlite3config.js";
import knex from "knex";
import express from 'express';
import {Server} from 'socket.io';

const database=knex(options);

const app =express();
const PORT = process.env.PORT||8080;
const server = app.listen(PORT,()=>console.log(`Listening on PORT ${PORT}`));

const io= new Server(server);
let log=[];
app.use(express.static('./public'))

io.on('connection',(socket)=>{
    socket.broadcast.emit('newUser')
    
    socket.on('message',async(data)=>{
        let tableExist = await database.schema.hasTable('chatTable');
        console.log(tableExist);
        if(!tableExist){
            
            await database.schema.createTable('chatTable',table=>{
                table.increments('id');
                table.string('user',15).nullable(false);
                table.string('message');
                table.date('created');
            })

            data.created = await new Date();
            await database('chatTable').insert(data);
        }else{
        data.created = await new Date();
        console.log(data);
        await database('chatTable').insert(data);
        let results = await database.from('chatTable').select('*')
        let articles =JSON.parse(JSON.stringify(results));
        console.log(articles);
        io.emit('log',articles);
        }
    })
    socket.on('registered',data=>{
        console.log(data);
    })
})