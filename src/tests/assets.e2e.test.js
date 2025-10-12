process.env.NODE_ENV = 'test';
require('dotenv').config({ path: '.env.test' });

const request = require('supertest');
const { app } = require('../app');
const { pool, ensureSchema, truncateAll } = require('../db');

beforeAll(async () => {
    await ensureSchema();
});

beforeEach(async () => {
    await truncateAll();
});


afterAll(async () => {
    await pool.end();
});


describe('Assets API', () => {
    test('GET /api/assets -> [] inicialmente', async () => {
        const res = await request(app).get('/api/assets');
        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBe(0);
    });


    test('POST /api/assets validar name vacío', async () => {
        const res = await request(app).post('/api/assets').send({ name: '' });
        expect(res.status).toBe(400);
        expect(res.body.errors).toBeDefined();
    });


    test('CRUD completo', async () => {
        const create = await request(app)
            .post('/api/assets')
            .send({ name: 'Logitect', type: 'Mouse', owner: 'Juan' });
        expect(create.status).toBe(201);
        expect(create.body.id).toBeDefined();

        const id = create.body.id;

        const list = await request(app).get('/api/assets');
        expect(list.status).toBe(200);
        expect(list.body.length).toBe(1);


        const getOne = await request(app).get(`/api/assets/${id}`);
        expect(getOne.status).toBe(200);
        expect(getOne.body.name).toBe('Logitect');


        const upd = await request(app)
            .put(`/api/assets/${id}`)
            .send({ name: 'Logitect G305', type: 'Mouse', owner: 'María' });
        expect(upd.status).toBe(200);
        expect(upd.body.name).toBe('Logitect G305');


        const del = await request(app).delete(`/api/assets/${id}`);
        expect(del.status).toBe(204);


        const list2 = await request(app).get('/api/assets');
        expect(list2.body.length).toBe(0);
    });


    test('GET/PUT/DELETE 404 cuando no existe', async () => {
        const id = 9999;
        expect((await request(app).get(`/api/assets/${id}`)).status).toBe(404);
        expect(
            (await request(app).put(`/api/assets/${id}`).send({ name: 'X' })).status
        ).toBe(404);
        expect((await request(app).delete(`/api/assets/${id}`)).status).toBe(404);
    });
});