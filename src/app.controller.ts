import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Neo4jService } from 'nest-neo4j'


@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private readonly neo4jService: Neo4jService) { }

  @Get()
  async getMovies(): Promise<any> {
    const res = await this.neo4jService.read(
      `MATCH p=()-[r:KNOWS]->() RETURN p  `
    )
    // return res.records
    const data: any = res.records
    const nodes = {};
    const edges = [];

    for await (const record of data){
      const startNode = record._fields[0].start;
      const endNode = record._fields[0].end;

      const startNodeId = startNode.identity.low;
      const endNodeId = endNode.identity.low;

      // Add nodes if they don't exist
      if (!nodes[startNodeId]) {
        nodes[startNodeId] = {
          key: String(startNodeId),
          attributes: startNode.properties // Corrected the property name to "attributes"
        };
      }

      if (!nodes[endNodeId]) {
        nodes[endNodeId] = {
          key: String(endNodeId),
          attributes: endNode.properties // Corrected the property name to "attributes"
        };
      }

      // Extract edge information
      const edge = {
        key: record._fields[0].segments[0].relationship.identity.low,
        source: String(startNodeId), // Ensure the source and target keys are strings
        target: String(endNodeId),
        type: record._fields[0].segments[0].relationship.type,
        attributes:record._fields[0].segments[0].relationship.properties,
        undirected: true
      };

      edges.push(edge);
    }

    const graphData = {
      nodes: Object.values(nodes),
      edges,
    }
    return graphData
  }
}
