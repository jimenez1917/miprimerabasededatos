import options from "./options/mysqlconfig.js";
import knex from "knex";

const database=knex(options);

class contenedor {
    save = async (idea) => {
        let tableExist = await database.schema.hasTable('productsTable');
        console.log(tableExist);
        if(!tableExist){
            
            await database.schema.createTable('productsTable',table=>{
                table.increments('id');
                table.string('title',15).nullable(false);
                table.float('price');
                table.integer('stock');
                table.string('url').nullable(false);
            })

            await database('productsTable').insert(idea);
            
        }   
        await database('productsTable').insert(idea);
        let results = await database.from('productsTable').select('*')
        let articles =JSON.parse(JSON.stringify(results));
        console.log(articles);
        return {status: 'success', result: idea}
    }
    getById = async(id)=>{
        let tableExist = await database.schema.hasTable('productsTable');
        if(tableExist) {
            let results = await database.from('productsTable').where('id',id).select('*')
            if(results.length > 0) {
                let articles =JSON.parse(JSON.stringify(results));
                console.log(articles);
                return {status:'success',product:articles}
            }else{return {status:'error',error:'not found'}}
        }
    }
    getAll = async () => {
        let tableExist = await database.schema.hasTable('productsTable');
        if(tableExist){
            let results = await database.from('productsTable').select('*')
            return{status:'success', results:results}
        }else{
            return{error: 'error',message:error}
        }
    }
    deleteById=async(id)=>{
        let tableExist = await database.schema.hasTable('productsTable');
        if(tableExist){
            let results = await database.from('productsTable').where('id',id).select('*')
            if(results.length>0){
            await database.from('productsTable').where('id',id).del()
            return {status:'success',message:'deleted item'}
            }else{return{status:'error',message:'Dont exist item'}}
        }
    }
    deleteAll = async () => {
        let tableExist = await database.schema.hasTable('productsTable');
        if(tableExist){
            await database.from('productsTable').del()
            return{status:'success', results:'all table deleted'}
        }else{
            return{error: 'error',message:'create the table'}
        }
    }
    upload=async(body,id)=>{
        let tableExist = await database.schema.hasTable('productsTable');
        if(tableExist){
            let results = await database.from('productsTable').where('id',id).select('*')
            if(results.length>0){
            await database.from('productsTable').where('id',id).update({
                id:id,
                title:body.title,
                price:body.price,
                stock:body.stock,
                url:body.url
            })
            return{status:'success', results:'upload item'}
        }else{return{status:'error', results:'Dont exist item'}}
        }else{
            return{error: 'error',message:'create the table'}
        }
    }
    
}
export default contenedor;