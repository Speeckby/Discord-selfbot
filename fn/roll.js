module.exports = async client => {    
  setInterval(() => {
    client.class.mudae.timers(client);
  }, 60000);
}