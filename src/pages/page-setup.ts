import { Page, test as baseTest } from "@playwright/test";

/*
This setup is called before every test to setup contexts needed for every test
*/
baseTest.beforeEach(({page} : {page: Page})=>{
console.log('Setting up context before each test');
})

baseTest.afterEach(({page}: {page: Page}) =>{
console.log('Tearing down context before each test');
})
export const test = baseTest;