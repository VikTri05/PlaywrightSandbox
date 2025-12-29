import fs from 'fs';
import { testFilePath } from '../constants/constants';

const testDataPath = testFilePath;

function loadTestData(): any {
if(!fs.existsSync(testDataPath)){
        throw new Error(`Test Data file not found at path: ${testDataPath}`);    
    }
   const rawData = fs.readFileSync(testDataPath, 'utf-8');
   return  JSON.parse(rawData);
}

//Method to fetch a simple JSON value
export function getTestDataKey(key: string): string{
    const testData = loadTestData();
    if(!(key in testData)){
        throw new Error(`Key ${key} not found in the file`);
    }

    return testData[key];
}

//Method to fetch JSON object
export function getJSONValue(key: string): Record<string, any>{
    const testData = loadTestData();
    if(!(key in testData)){
        throw new Error(`Key ${key} not found in the file`);
    }

    const value = testData[key];
    if(typeof value != "object" || Array.isArray(value)){
        throw new Error(`No JSON Object found for the key ${key}`);
    }

    return value;
}

//Method to return JSON array
export function getJSONArray(key: string): any[]{
const testData = loadTestData();
    if(!(key in testData)){
        throw new Error(`Key ${key} not found in the file`);
    }

    const value = testData[key];
    if(!Array.isArray(value)){
        throw new Error(`No JSON Array found for the key ${key}`);
    }

    return value;
}