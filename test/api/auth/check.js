const chai = require("chai"),
    expect = chai.expect,
    server = require("@server/bin/www"),
    faker = require("faker"),
    UserDB = require("@DB").UserDriver.model,
    URLSignin = "/api/v1/auth/signin",
    URLSignup = "/api/v1/auth/signup",
    URLCheck = "/api/v1/auth/check",
    URLLogout = "/api/v1/auth/logout";

function generateUser() {
    return {
        name: faker.name.firstName(),
        email: faker.internet.email(),
        password: faker.internet.password()
    };
}

function runBearerTest(name) {
    describe(`/${name}`, () => {
        let USER = generateUser();
        let token;
        before((done) => {
            chai.request(server)
                .post(URLSignup)
                .send(USER)
                .end((err, res) => {
                    token = res.body.tokens[name];
                    done();
                });
        });
        describe("valid args", () => {
            it("should return true, if token is correct and actual", (done) => {
                chai.request(server)
                    .post(URLCheck)
                    .set("authorization", `Bearer ${token}`)
                    .end((err, res) => {
                        expect(res).have.status(200);
                        done();
                    });
            });
            it("should return true, even user created new token", (done) => {
                chai.request(server)
                    .post(URLSignin)
                    .auth(USER.email, USER.password)
                    .end(() => {
                        chai.request(server)
                            .post(URLCheck)
                            .set("authorization", `Bearer ${token}`)
                            .end((err, res) => {
                                expect(res).have.status(200);
                                done();
                            });
                    });
            });
        });
        describe("invalid args", () => {
            it("should reject, if token invalid", (done) => {
                chai.request(server)
                    .post(URLCheck)
                    .set("authorization", "Bearer 123")
                    .end((err, res) => {
                        expect(res).have.status(401);
                        done();
                    });
            });
            it("should reject, if user had set secret", (done) => {
                chai.request(server)
                    .post(URLLogout)
                    .auth(USER.email, USER.password)
                    .end(() => {
                        chai.request(server)
                            .post(URLCheck)
                            .set("authorization", `Bearer ${token}`)
                            .end((err,res) => {
                                expect(res).have.status(401);
                                done();
                            });
                    });
            });
        });
        after((done) => {
            UserDB.remove({}, err => done(err));
        });
    });
}
describe("/check", () => {
    runBearerTest('access');
    runBearerTest('refresh');
});