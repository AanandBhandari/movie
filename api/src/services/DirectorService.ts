import Director from "../models/Director";
import MongooseService from "./MongooseService";
import { Director as DirectorInterface } from "../interfaces/Director.interface";
class DirectorService {
   
    constructor() {
        this.directorModel = new MongooseService(Director)
    }
    directorModel: any;
  
    async addDirector ( { name, description, image }: DirectorInterface ) {
      return await this.directorModel.create( { name, description, image } );
    }
  
    async deleteById( id:string ) {
      return await this.directorModel.delete( {_id:id} )
    }

    async deleteMany(query={}) {
      return await this.directorModel.deleteMany( query )
    }

    async checkIfUserExit ( name: string ) {
      return !! await this.directorModel
        .findOne( {name} )
    }
  
    async getAll ( query={} ) {
        return await this.directorModel
        .find( query )
    }

    async findById ( id:string ) {
      return await this.directorModel
        .findById( id )
    }  
  }
  
export default DirectorService;