import supertest from "supertest";

const requester = supertest("http://localhost:8080")

export default requester