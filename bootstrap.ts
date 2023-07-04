import "reflect-metadata";
import supertest from "supertest";
import { App } from "./src/lib/app";
import { SuperTest, Test } from "supertest";


/**
 * Get an Application instance wrapped in SuperTest
 * for use in unit tests
 */
export function getTestApp(): Promise<SuperTest<Test>|void> {
    return App.getApp()
        .then(app => supertest(app))
        .catch(e => console.error(e));

}
