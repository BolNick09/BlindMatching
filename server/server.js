const appcfg = require('./appcfg');
const express = require("express");

const port = appcfg.webPort
// создаем объект класса приложения express (веб-сервера)
const app = express()

app.use(express.static(appcfg.Project_Root))
// Обслуживаем корневую директорию по всем типам запросов
app.all('/', (req, res) => 
{
    res.status(200).sendFile('/', {root: appcfg.Project_Root})
})
app.listen(port, () =>
{
    console.log("Node Express server is listening on http://localhost:" + port)
})


const connectToServer = () => {
    return new Promise((resolve, reject) => {
        const config = {
            // Host or Machine name in this instance
            // Might try using FQDN or IP of SQL Server on your network
            // Can either be 'LAPTOP01' or 'localhost' if SQLEXPRESS is installed on your own machine
            // If on ABULHASANLAKHANI domain, use SERVER1 or SQLSERVER1 or whatever the network SQL Server name is
            server: 'localhost',

            authentication: {
                // Use Windows Authentication
                // Set to 'default' to use SQL Server Authentication
                type: 'ntlm',

                options: {
                    // Make sure to set this when you set 'type' as 'ntlm' or Windows Authentication
                    domain: 'ABULHASANLAKHANI',

                    // username along with the domain will make up the complete login for SQL Server like
                    // domain\username e.g. ABULHASANLAKHANI\USER1 in our case
                    userName: 'USER1',
                    password: 'robot'
                }
            },

            options: {
                database: 'AdventureWorks',

                // This option is only required if you're using SQL Server Express 
                // with named instance, which is the default setting
                // Together with the 'server' option this will make up to either 'localhost\SQLEXPRESS' or 'LAPTOP01\SQLEXPRESS'
                instanceName: 'SQLEXPRESS',

                // This setting is really important to make successfull connection
                encrypt: false,

                // This is not required but tedious API throws deprecated warning if we don't
                trustServerCertificate: false,

                // This will allow you to access the rows returned. 
                // See 'doneInProc' event below
                rowCollectionOnDone: true
            }
        }
    })
}