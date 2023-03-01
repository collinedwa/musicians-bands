const {sequelize} = require('./db');
const {Band, Musician} = require('./index')

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
            genre: "Hot Tub Rock"
        });

        expect(sampleBand.name).toBe("Cool Guys");
    })

    test('can create a Musician', async () => {
        const sampleMusician = await Musician.create({
            name: "Tommy Coolguy",
            instrument: "Banjo"
        })
        expect(sampleMusician.instrument).toBe("Banjo");
    })
})