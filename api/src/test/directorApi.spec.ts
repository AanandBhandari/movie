import expect from "expect";
import request from "supertest";
import app from "../server";
import DirectorService from "../services/DirectorService";
const director = {
  name: "test",
  image:
    "https://res.cloudinary.com/dttllxiw2/image/upload/v1646881744/q96i546zfx0l3fvdjbyb.jpg",
  description: "test",
};

const Director = new DirectorService();

before((done) => {
  Director.deleteMany({})
    .then(() => done())
    .catch(done);
});

describe("POST /director", () => {
  it("should create a director", (done) => {
    const testDirector = director;
    request(app)
      .post("/api/director")
      .send(testDirector)
      .expect(201)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.body.data.name).toBe(testDirector.name);
        expect(res.body.status).toBe("success");
        expect(res.body.data._id).toBeTruthy();
        return done();
      });
  });

  it("should not create a director with missing fields", (done) => {
    request(app)
      .post("/api/director")
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

  it("should not create a director with invalid image url", (done) => {
    const testDirector = director;
    testDirector.image = "test";
    request(app)
      .post("/api/director")
      .send(testDirector)
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

  it("should not create a director with same name", (done) => {
    const testDirector = director;
    request(app)
      .post("/api/director")
      .send(testDirector)
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

describe("GET /director", () => {
  it("should get all directors", (done) => {
    request(app)
      .get("/api/director")
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.body.status).toBe("success");
        expect(res.body.data).toBeTruthy();
        expect(res.body.data[0].name).toBe(director.name);
        return done();
      });
  });
});

//getDirector by id
describe("GET /director/:id", () => {
  it("should get a director by id", (done) => {
    Director.getAll()
      .then((res) => {
        const director = res[0];
        request(app)
          .get("/api/director/" + director._id)
          .expect(200)
          .end((err, res) => {
            if (err) {
              return done(err);
            }
            expect(res.body.data.name).toBe(director.name);
            expect(res.body.status).toBe("success");
            expect(res.body.data._id).toBeTruthy();
            return done();
          });
      })
      .catch(done);
  });

  it("should not get a director by random id", (done) => {
    request(app)
      .get("/api/director/62356d5732e9e3b600d6f5fc")
      .expect(404)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.body.status).toBe("error");
        expect(res.body.data).toEqual(null);
        return done();
      });
  });

  it("should not get a director by invalid id", (done) => {
    request(app)
      .get("/api/director/afafdg")
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

//delete director by id
describe("DELETE /director/:id", () => {
  it("should delete a director by id", (done) => {
    Director.getAll()
      .then((res) => {
        const director = res[0];
        request(app)
          .delete("/api/director/" + director._id)
          .expect(200)
          .end((err, res) => {
            if (err) {
              return done(err);
            }
            expect(res.body.status).toBe("success");
            expect(res.body.data).toEqual(null);
            expect(res.body.message).toBe("Successfully deleted director.");
            return done();
          });
      })
      .catch(done);
  });

  it("should not delete a director by invalid id", (done) => {
    request(app)
      .delete("/api/director/dfgsgeah")
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
