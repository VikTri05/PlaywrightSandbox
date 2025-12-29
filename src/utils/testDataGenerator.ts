export class testDataGenerator{
static generateRandomString(length: number): string{
    const character = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let result = '';
    for(let i=0; i<length; i++){
        result += character.charAt(Math.floor(Math.random()* length));
    }
    return result;
}

static generateAlphanumeric(length: number):string{
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let result = '';
    for(let i=0; i<length; i++){
        result += characters.charAt(Math.floor(Math.random()*length));
    }
    return result;
}

static generateRandomNumberInRange(min: number, max:number): number{
    return Math.floor(Math.random() * (max - min + 1) +1) + min;
}

static generateRandomEmail(): string{
    const username = this.generateAlphanumeric(10);
    let domains = ['@gmail.com', '@outlook.com', '@example.com', 'yahoo.com', '@hotmail.com'];
    let randomDomain = domains[Math.floor(Math.random()*domains.length)];
    return `${username}@${randomDomain}`;
}

static generateRandomPhoneNumber(): string{
    // return `+91${Array.from({length: 10}, ()=> Math.floor(Math.random() * 10)).join('')}`;
    return `+1${Array.from({length: 10}, ()=> Math.floor(Math.random()*10)).join('')}`;
}

static generateRandomDate(start: Date, end: Date): Date{
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

}