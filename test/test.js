const supertest = require('supertest');
const app = require('../src/app');

test('Testing for / endpoint and get status 200', (done) => {
  supertest(app)
    .get('/')
    .expect(200)
    .expect('Content-Type', /html/)
    .end((err, res) => {
      if (err) done(err);
      expect(res.statusCode).toBe(200);
      done();
    });
});

test('Testing for /search-jobs endpoint and get status 200', (done) => {
  supertest(app)
    .get('/search-jobs')
    .expect(200)
    .expect('Content-Type', /json/)
    .end((err, res) => {
      if (err) done(err);
      // console.log(res.ok);
      expect(res.statusCode).toBe(200);
      expect(res.ok).toEqual(true);
      done();
    });
});

test('Testing for 404 endpoint and get status 404', (done) => {
  supertest(app)
    .get('/job-descriptionnn')
    .expect(404)
    .expect('Content-Type', /html/)
    .end((err, res) => {
      if (err) done(err);
      expect(res.ok).toEqual(false);
      done();
    });
});
