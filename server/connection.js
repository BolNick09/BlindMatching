const Connection = require('tedious').Connection;  //Импорт прокладки м/ду нодой и СУБД
const Request = require('tedious').Request;  
const TYPES = require('tedious').TYPES; 

const appcfg = require('./appcfg');

const connection = new Connection(appcfg.msconfig);  
// connection.on('connect', function(err) //Привязка метода, то есть какой метод выполнится при включении коннекта
// {  
//     // If no error, then good to proceed.  
//     console.log("Connected");  
//     executeStatement();  
// });  


connection.on("connect", function (err) 
{
    if(err)     
        console.log('Error: ', err)
    else 
    {
        console.log("Successful connection");
        executeStatement();
    }
  
});

connection.connect(); 


function executeStatement() 
{  
    var request = new Request("SELECT Id, Name FROM Users;", function(err) 
    {  
        if (err) 
        {  
            console.log(err);
        }});

    var result = "";  
    request.on('row', function(columns) 
    {  
        columns.forEach(function(column) 
        {  
            if (column.value === null)              
                console.log('NULL');               
            else               
                result+= column.value + " ";               
        });  
        console.log(result);  
        result ="";  
    });  

    request.on('done', function(rowCount, more) 
    {  
        console.log(rowCount + ' rows returned');  
    });  
    
    // Close the connection after the final event emitted by the request, after the callback passes
    request.on("requestCompleted", function (rowCount, more) {
        connection.close();
    });
    connection.execSql(request);  
}  