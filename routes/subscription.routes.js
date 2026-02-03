import { Router } from "express";

const subscriptionRouter = Router();

/// /subscriptions - GET
subscriptionRouter.get("/", (req, res) => {
  res.send("fetch all subscriptions");
});

/// /subscriptions/:id - GET
subscriptionRouter.get("/:id", (req, res) => {
  const { id } = req.params;
  res.send(`fetch subscription with id: ${id}`);
});

/// /subscriptions - POST
subscriptionRouter.post("/", (req, res) => {
  res.send("create a new subscription");
});

/// /subscriptions/:id - PUT
subscriptionRouter.put("/:id", (req, res) => {
  const { id } = req.params;
  res.send(`update subscription with id: ${id}`);
});

/// /subscriptions/:id - DELETE
subscriptionRouter.delete("/:id", (req, res) => {
  const { id } = req.params;
  res.send(`delete subscription with id: ${id}`);
});

subscriptionRouter.get("/user/:id", (req, res) => {
  const { id } = req.params;
  res.send(`fetch all subscriptions for user with id: ${id}`);
});

subscriptionRouter.put("/:id/cancel", (req, res) => {
  const { id } = req.params;
  res.send(`cancel subscription with id: ${id}`);
});

subscriptionRouter.get("/upcoming-renewals", (req, res) => {
  res.send("fetch all subscriptions with upcoming renewals");
});

export default subscriptionRouter;
