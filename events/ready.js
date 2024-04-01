const { blue } = require("colors");
const loadClass = require("../loaders/loadClass.js")

  

  
module.exports = async client => {
    
    console.log(blue("STARTING", `Selfbot loading starts`))
    console.log(blue("LOADERS", `loading Events`))
        
    setTimeout(() => {
      console.log(blue("LOADERS", `loading Class`))
      
      loadClass(client)
})}