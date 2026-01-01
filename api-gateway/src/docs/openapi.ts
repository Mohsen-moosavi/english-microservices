// docs/openapi.ts
import { OpenApiGeneratorV3 } from "@asteasolutions/zod-to-openapi";
import { registry } from "./paths/registry";
import "./paths/index";
import { OpenAPIObject } from "openapi3-ts/oas30";
import { configs } from "@/configs/env.config";

export const openApiDoc : OpenAPIObject = new OpenApiGeneratorV3(
  registry.definitions
).generateDocument({
  openapi: "3.0.3",
  info: {
    title: "API Gateway",
    version: "1.0.0"
  },
  servers: [
    { url: `${configs.url.swaggerUiUrl}/api/v1`, description: "Local server" },
  ],
});
