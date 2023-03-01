const {sequelize} = require('./db');
const {Band, Musician, Song} = require('./index')

describe('Band and Musician Models', () => {
    /**
     * Runs the code prior to all tests
     */
    beforeAll(async () => {
        // the 'sync' method will create tables based on the model class
        // by setting 'force:true' the tables are recreated each time the 
        // test suite is run
        await sequelize.sync({ force: true });
    })

    test('can create a Band', async () => {
        const sampleBand = await Band.create({
            name: "Cool Guys",
            genre: "Hot Tub Rock",
            showCount: 2
        });

        expect(sampleBand.name).toBe("Cool Guys");
        expect(sampleBand.showCount).toBe(2);
    })

    test('can delete a Band', async () => {
        const secondBand = await Band.create({
            name: "Uncool Guys",
            genre: "Ball Pit Rock",
            showCount: 0
        });

        await secondBand.destroy();

        const foundBand = await Band.findAll({
            where: {
                name: "Uncool Guys"
            }
        })
        
        expect(foundBand).toEqual([]);
    })

    test('can create a Musician', async () => {
        const sampleMusician = await Musician.create({
            name: "Tommy Coolguy",
            instrument: "Banjo"
        })
        expect(sampleMusician.instrument).toBe("Banjo");
    })

    test('can update a Musician', async () => {
        const foundMusician = await Musician.findByPk(1);

        await foundMusician.update({
            instrument: "Hurdy-gurdy"
        });

        expect(foundMusician.instrument).toBe("Hurdy-gurdy");
    })

    test('can add Musicians to band', async () => {
        const newMusician = await Musician.create({
            name: "Timmy Coolguy",
            instrument: "Banjo"
        });

        const currBand = await Band.findByPk(1);

        await currBand.addMusician(1);
        await currBand.addMusician(2);
        musicians = await currBand.getMusicians();

        expect(musicians.length).toBe(2);
    })

    test('can add Songs to multiple bands', async () => {
        const newSong = await Song.create({
            title: "Funky Business",
            year: 1976
        });

        const secondSong = await Song.create({
            title: "Sad Times for Pinky Patterson",
            year: 2001
        })

        const firstBand = await Band.findByPk(1);

        firstBand.addSong(1);
        firstBand.addSong(2);

        const secondBand = await Band.create({
            name: "The Unfriendly Folks",
            genre: "Angry Jazz",
            showCount: 5
        })

        secondBand.addSong(1);
        secondBand.addSong(2);

        firstBandSongs = await firstBand.getSongs();
        secondBandSongs = await secondBand.getSongs();

        expect(firstBandSongs.length).toEqual(secondBandSongs.length);

    })

    test("Eager loading", async () => {
        bandsList = await Band.findAll({
            include: [
                {model: Musician, as: "musicians"}
            ]
        })

        bandsSongList = await Band.findAll({
            include: [
                {model: Song, as: "songs"}
            ]
        })
    })
    
})