import * as fs from 'fs';
import * as path from 'path';
export class customLogger{

    private logfile: string;

    constructor(){
        //Creating the log directory
        const logDir = path.join(process.cwd(), 'logs');
        if(!fs.existsSync(logDir)){
            fs.mkdirSync(logDir);
        }

        const fileName = `log_${new Date().toISOString().replace(/[:.]/g, '-')}.txt`
        this.logfile = path.join(logDir, fileName);

        //Creating an empty file
        fs.writeFileSync(this.logfile, '');
        }

    private timeStamp(): string{    
    return new Date().toISOString();
    }

    private WriteToFile(level: string, message:string, args: any[]){
        const logLine = `[${this.timeStamp}] ${level} ${args? JSON.stringify(args) : ''}\n`;
        fs.appendFileSync(this.logfile, logLine);
    }

    info(message: string, ...args: any[]){
        console.log(`[${this.timeStamp()}] INFO:  ${message}`, ...args);
        this.WriteToFile('INFO', message, args);
    }
    
    error(message: string, ...args: any[]){
        console.log(`[${this.timeStamp()}] ERROR:  ${message}`, ...args);
        this.WriteToFile('ERROR', message, args);
    }

    warn(message: string, ...args: any[]){
        console.log(`[${this.timeStamp()}] WARN:  ${message}`, ...args);
        this.WriteToFile('WARN', message, args);
    }
}