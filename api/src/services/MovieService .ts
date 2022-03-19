import Movie from "../models/Movie";
import MongooseService from "./MongooseService";
import { Movie as MovieInterface } from "../interfaces/Movie.interface";


class MovieService {
   
    constructor() {
        this.movieModel = new MongooseService(Movie)
    }
    movieModel: any;
  
    async addMovie ( { name, description, image, director, genre }: MovieInterface ) {
      return await this.movieModel.create( { name, description, image, director, genre } );
    }
  
    async deleteById( id:string ) {
      return await this.movieModel.delete( {_id:id} )
    }

    async deleteMany(query={}) {
      return await this.movieModel.deleteMany( query )
    }

    async checkIfUserExit ( name: string ) {
      return !! await this.movieModel
        .findOne( {name} )
    }
  
    async getAll ( query={} ) {
      const populate = [
        {
          path: "director",
          select: "name"
        }
      ]
      const select = {"description":0}

        return await this.movieModel
        .find( query,select,populate )
    }

    async findById ( id:string ) {
      const populate = [
        {
          path: "director",
          select: "name"
        }
      ]
      return await this.movieModel
        .findById( id,undefined, populate )
    }
  
  }
  
export default MovieService;