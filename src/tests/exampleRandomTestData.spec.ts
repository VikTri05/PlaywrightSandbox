import{test, expect} from '@playwright/test'
import { testDataGenerator } from '../utils/testDataGenerator'
test('Test to fetch and display random test data @smoke', ()=> {

const randomString = testDataGenerator.generateRandomString(12);
console.log(`Random string generated is: ${randomString}`);

const randomAlphanumericString = testDataGenerator.generateAlphanumeric(15);
console.log(`Random Alphanumeric String generated is: ${randomAlphanumericString}`);

const randomNumber = testDataGenerator.generateRandomNumberInRange(12,150);
console.log(`Random number generated is: ${randomNumber}`);

const randomEmail = testDataGenerator.generateRandomEmail();
console.log(`Random email generated is: ${randomEmail}`);

const randomPhoneNumber = testDataGenerator.generateRandomPhoneNumber();
console.log(`Random Phone Number generated is: ${randomPhoneNumber}`);

const randomDate = testDataGenerator.generateRandomDate(new Date('12-12-2025'), new Date('10-10-2025'))
console.log(`Random date generated is: ${randomDate}`);

const randomDate1 = testDataGenerator.generateRandomDate(new Date('2024-12-01'), new Date('2025-12-12'))
console.log(`Random date new format generated is: ${randomDate1}`);
})