import { join } from 'path';
import swaggerJsDoc from 'swagger-jsdoc';

// Swagger setup
const swaggerOptions = {
  swaggerDefinition: {
    myapi: '3.0.0',
    info: {
      title: 'My API',
      version: '1.0.0',
      description: 'API documentation',
    },
    servers: [
      {
        url: 'http://localhost:8000',
      },
    ],
  },
  apis: [join(process.cwd(), 'src/routers/*route.ts')], // files containing annotations as above
};

export const swaggerDocs = swaggerJsDoc(swaggerOptions);
