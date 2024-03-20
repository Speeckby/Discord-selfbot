const { blue } = require("colors");
const loadClass = require("../loaders/loadClass.js")

  
function verifier_timers(client) {
  return
}

  
module.exports = async client => {
    
    console.log(blue("STARTING", `Selfbot loading starts`))
    console.log(blue("LOADERS", `loading Events`))
        
    setTimeout(() => {
      console.log(blue("LOADERS", `loading Class`))
      
      loadClass(client)

      function timers() {
        setTimeout(() => {
          verifier_timers(client);
          setTimeout(timers, 30000 + Math.floor(Math.random() * 100));
        }, 10);
      }
      timers()
  }, 4000)
  
  
}