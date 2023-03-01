const {Band} = require('./Band')
const {Musician} = require('./Musician')
const {Song} = require("./Song")

Musician.belongsTo(Band);
Band.hasMany(Musician);

Song.belongsToMany(Band, {through: "bands_songs"});
Band.belongsToMany(Song, {through: "bands_songs"});

module.exports = {
    Band,
    Musician,
    Song
};
