import { Injectable } from '@nestjs/common';
import { Neo4jService } from 'nest-neo4j/dist';
@Injectable()
export class AppService {
  constructor(private readonly neo4jService: Neo4jService) { }
  async getMovies(cipherQuery: any): Promise<any> {
    try {
      const res = await this.neo4jService.read(cipherQuery)
      return res.records
    } catch (error) {
      throw error
    }
  }
}
