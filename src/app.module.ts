import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Neo4jModule } from 'nest-neo4j'


@Module({
  imports: [
    Neo4jModule.forRoot({
      scheme: 'neo4j',
      host: '44.211.55.21',
      port: 7687,
      username: 'neo4j',
      password: 'vendors-feet-overlays'
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
