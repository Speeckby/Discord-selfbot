module.exports = async (client, e) => {

    let mudae_daily = 1707110532000
    while (mudae_daily < Date.now()) {
        mudae_daily += 72000010
    }

    return [true, "Daily mudae", "$daily", mudae_daily, "1099737720026300576", 72000010]
}