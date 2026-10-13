
const client = require("prom-client");

const register = new client.Registry();

client.collectDefaultMetrics({ register });

const httpRequests = new client.Counter({
  name: "schemasync_http_requests_total",
  help: "Total HTTP requests handled by SchemaSync",
  labelNames: ["method", "route", "status"],
  registers: [register],
});

module.exports = { register, httpRequests };
