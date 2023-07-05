
/**
 * Get an Application instance wrapped in SuperTest
 * for use in unit tests
 */
import 'reflect-metadata';
import supertest from 'supertest';
import { App } from './src/lib/app';
import { SuperTest, Test } from 'supertest';


/**
 * Get the App for use in unit tests. Initialized with database connection and express server
 */
export function getTestApp(): Promise<SuperTest<Test>|void> {
    return App.getApp()
        .then(app => supertest(app))
        .catch(e => console.error(e));

}
/**
 * Close the App for use in unit tests. Closes the connection with database and express server
 */
export async function closeApp():Promise<void> {
   await App.closeApp();
}
