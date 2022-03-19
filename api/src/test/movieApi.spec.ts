import expect from "expect";
import request from "supertest";
import app from "../server";
import DirectorService from "../services/DirectorService";
import MovieService from "../services/MovieService ";

const movie = {
  name: "test",
  image:
    "https://res.cloudinary.com/dttllxiw2/image/upload/v1646881744/q96i546zfx0l3fvdjbyb.jpg",
  description: "test",
  genre: "test",
  director: null,
};

const director: any = {
  name: "test",
  image:
    "https://res.cloudinary.com/dttllxiw2/image/upload/v1646881744/q96i546zfx0l3fvdjbyb.jpg",
  description: "test",
};

const Director = new DirectorService();
const Movie = new MovieService();

before((done) => {
  Director.deleteMany({})
    .then(() => {
      Movie.deleteMany({}).then(() => {
        Director.addDirector(director).then((doc) => {
          movie.director = doc._id;
          return done();
        });
      });
    })
    .catch(done);
});

describe("POST /movie", () => {
  it("should create a movie", (done) => {
    const testMovie = movie;
    request(app)
      .post("/api/movie")
      .send(testMovie)
      .expect(201)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.body.data.name).toBe(testMovie.name);
        expect(res.body.status).toBe("success");
        expect(res.body.data._id).toBeTruthy();
        return done();
      });
  });

  it("should not create a movie with missing fields", (done) => {
    request(app)
      .post("/api/movie")
      .send({})
      .expect(403)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.body.status).toBe("error");
        expect(res.body.data).toEqual(null);
        return done();
      });
  });

  it("should not create a movie with invalid image url", (done) => {
    const testMovie = movie;
    testMovie.image = "test";
    request(app)
      .post("/api/movie")
      .send(testMovie)
      .expect(403)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.body.status).toBe("error");
        expect(res.body.data).toEqual(null);
        return done();
      });
  });

  it("should not create a movie with same name", (done) => {
    const testMovie = movie;
    request(app)
      .post("/api/movie")
      .send(testMovie)
      .expect(403)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.body.status).toBe("error");
        expect(res.body.data).toEqual(null);
        return done();
      });
  });
});

describe("GET /movie", () => {
  it("should get all movies", (done) => {
    request(app)
      .get("/api/movie")
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.body.status).toBe("success");
        expect(res.body.data).toBeTruthy();
        expect(res.body.data[0].name).toBe(movie.name);
        return done();
      });
  });
});

//getDirector by id
describe("GET /movie/:id", () => {
  it("should get a movie by id", (done) => {
    Movie.getAll()
      .then((res) => {
        const movie = res[0];
        request(app)
          .get("/api/movie/" + movie._id)
          .expect(200)
          .end((err, res) => {
            if (err) {
              return done(err);
            }
            expect(res.body.data.name).toBe(movie.name);
            expect(res.body.status).toBe("success");
            expect(res.body.data._id).toBeTruthy();
            return done();
          });
      })
      .catch(done);
  });

  it("should not get a movie by random id", (done) => {
    request(app)
      .get("/api/movie/62356d5732e9e3b600d6f5fc")
      .expect(404)
      .end((err, res) => {
        if (err) {
          console.log(err);
          return done(err);
        }
        expect(res.body.status).toBe("error");
        expect(res.body.data).toEqual(null);
        return done();
      });
  });

  it("should not get a movie by invalid id", (done) => {
    request(app)
      .get("/api/movie/afafdg")
      .expect(500)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.body.status).toBe("error");
        expect(res.body.data).toEqual(null);
        return done();
      });
  });
});

describe("DELETE /movie/:id", () => {
  it("should delete a movie by id", (done) => {
    Movie.getAll()
      .then((res) => {
        const movie = res[0];
        request(app)
          .delete("/api/movie/" + movie._id)
          .expect(200)
          .end((err, res) => {
            if (err) {
              return done(err);
            }
            expect(res.body.status).toBe("success");
            expect(res.body.data).toEqual(null);
            expect(res.body.message).toBe("Successfully deleted movie.");
            return done();
          });
      })
      .catch(done);
  });

  it("should not get a movie by invalid id", (done) => {
    request(app)
      .delete("/api/movie/afafdg")
      .expect(500)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.body.status).toBe("error");
        expect(res.body.data).toEqual(null);
        return done();
      });
  });
});
