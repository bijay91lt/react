import conf from '../conf.js'

import { Client, Account, ID} from "appwrite";

export class Authservice{ 
    client = new Client();
    account;

    constructor(){
        this.client
            .setEndpoint(conf.appwriteEndpoint)
            .setProject(conf.appwriteProjectId);
        
        this.account = new Account(this.client);
            
    }

    async creatAccount({email, password, name}){
        const userAccount = await this.account.create(ID.unique(), email, password, name);
            if(userAccount) {
                //call another method
                return this.login({email, password});
            } else {
                return userAccount;
            }
    }

    async login({email, password}){
        return await this.account.createEmailPasswordSession({email, password});
    }

    async getCurrentUser(){
        return await this.account.get();
    }

    async logout(){
        await this.account.deleteSessions() 
    }
}

const authService = new Authservice();

export default authService