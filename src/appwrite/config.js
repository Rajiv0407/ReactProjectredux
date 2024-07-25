import conf from "../conf/conf";
import { Client,Databases,Storage,Query,ID } from "appwrite";


export class Service{

    client= new Client();
    databases;
    bucket;

    constructor(){
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId);
        this.databases=new Databases(this.client);
        this.bucket=new Storage(this.client);

    }

    async createPost({title,content,status,image,userId,slug}){
        try {
           await this.databases.createDocument(
            conf.appwriteUrl,
            conf.appwriteCollectrionId,
            slug,
            {
                title,
                content,
                image,
                status,
                userId,
            }
           ) 
        } catch (error) {
            console.log("Appwrite Service :: createPost :: error",error);
            
        }

    }

    async updatePost(slug,{title,content,status,image}){
        try {

            return await this.updateDocuemnt(
                conf.appwriteDatabaseId,
                conf.appwriteCollectrionId,
                slug,
                {
                    title,
                    status,
                    image,
                    content,
                }
            )
            
        } catch (error) {
            console.log("Appwrite Service :: updatePost :: error",error)  
        }
    }

    async deletePost({slug}){
        try {
            return await this.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectrionId,
                slug,   
            )   
        } catch (error) {
            console.log("Appwrite Service :: deletePost :: error",error)    
        }
    }

    async getPost({slug}){
        try {
            return await this.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectrionId,
                slug,   
            )
            return true;   
        } catch (error) {
            console.log("Appwrite Service :: deletePost :: error",error)   
            return false; 
        }
    }

    async getPosts(query=[Query.equal('status','active')]){

        try {
          return await this.databases.listDocuments(
            conf.appwriteDatabaseId,
            conf.appwriteCollectrionId,
            query,

          )  
        } catch (error) {
            console.log("Appwrite Service :: getPosts :: error",error);
            return false;
        }
    }

    //File upload method

    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file,
            )
            
        } catch (error) {
            console.log("Appwrite Service :: uploadFile :: error",error);
            return false;
        }

    }

    async deleteFile(fileid){
       try {

        return await this.bucket.deleteFile(
            conf.appwriteBucketId,
            fileid
        )
        return true;
       } catch (error) {
        console.log("Appwrite Service :: deleteFile :: error",error)
        return false;
       }

    }
    getfilePreview(fileId){

        return this.bucket.getFilePreview(
            conf.appwriteBucketId,
            fileId,
        )

    }

}

 const service=new Service();

export default service;