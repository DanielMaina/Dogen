"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GET_ALL_STOP_LIMIT_ORDERS_BY_OWNER = exports.GET_ALL_CANCELLED_ORDERS_BY_OWNER = exports.GET_ALL_EXECUTED_ORDERS_BY_OWNER = exports.GET_ALL_PAST_ORDERS_BY_OWNER = exports.GET_ALL_OPEN_ORDERS_BY_OWNER = exports.GET_ALL_ORDERS_BY_OWNER = exports.GET_ORDER_BY_ID = void 0;
const graphql_request_1 = require("graphql-request");
exports.GET_ORDER_BY_ID = (0, graphql_request_1.gql) `
  query getOrdersByOwner($id: String) {
    orders(where: { id: $id }) {
      id
      owner
      inputToken
      outputToken
      minReturn
      module
      witness
      secret
      inputAmount
      vault
      bought
      auxData
      status
      createdTxHash
      executedTxHash
      cancelledTxHash
      blockNumber
      createdAt
      updatedAt
      updatedAtBlock
      updatedAtBlockHash
      data
      inputData
      handler
    }
  }
`;
exports.GET_ALL_ORDERS_BY_OWNER = (0, graphql_request_1.gql) `
  query getOrdersByOwner($owner: String) {
    orders(
      first: 1000
      orderBy: updatedAtBlock
      orderDirection: desc
      where: { owner: $owner }
    ) {
      id
      owner
      inputToken
      outputToken
      minReturn
      module
      witness
      secret
      inputAmount
      vault
      bought
      auxData
      status
      createdTxHash
      executedTxHash
      cancelledTxHash
      blockNumber
      createdAt
      updatedAt
      updatedAtBlock
      updatedAtBlockHash
      data
      inputData
      handler
    }
  }
`;
exports.GET_ALL_OPEN_ORDERS_BY_OWNER = (0, graphql_request_1.gql) `
  query getOpenOrdersByOwner($owner: String) {
    orders(
      first: 1000
      orderBy: updatedAtBlock
      orderDirection: desc
      where: { owner: $owner, status: open }
    ) {
      id
      owner
      inputToken
      outputToken
      minReturn
      module
      witness
      secret
      inputAmount
      vault
      bought
      auxData
      status
      createdTxHash
      executedTxHash
      cancelledTxHash
      blockNumber
      createdAt
      updatedAt
      updatedAtBlock
      updatedAtBlockHash
      data
      inputData
      handler
    }
  }
`;
exports.GET_ALL_PAST_ORDERS_BY_OWNER = (0, graphql_request_1.gql) `
  query getPastOrdersByOwner($owner: String) {
    orders(
      first: 1000
      orderBy: updatedAtBlock
      orderDirection: desc
      where: { owner: $owner, status_not: open }
    ) {
      id
      owner
      inputToken
      outputToken
      minReturn
      module
      witness
      secret
      inputAmount
      vault
      bought
      auxData
      status
      createdTxHash
      executedTxHash
      cancelledTxHash
      blockNumber
      createdAt
      updatedAt
      updatedAtBlock
      updatedAtBlockHash
      data
      inputData
      handler
    }
  }
`;
exports.GET_ALL_EXECUTED_ORDERS_BY_OWNER = (0, graphql_request_1.gql) `
  query getExecutedOrdersByOwner($owner: String) {
    orders(
      first: 1000
      orderBy: updatedAtBlock
      orderDirection: desc
      where: { owner: $owner, status: executed }
    ) {
      id
      owner
      inputToken
      outputToken
      minReturn
      module
      witness
      secret
      inputAmount
      vault
      bought
      auxData
      status
      createdTxHash
      executedTxHash
      cancelledTxHash
      blockNumber
      createdAt
      updatedAt
      updatedAtBlock
      updatedAtBlockHash
      data
      inputData
      handler
    }
  }
`;
exports.GET_ALL_CANCELLED_ORDERS_BY_OWNER = (0, graphql_request_1.gql) `
  query getCancelledOrdersByOwner($owner: String) {
    orders(
      first: 1000
      orderBy: updatedAtBlock
      orderDirection: desc
      where: { owner: $owner, status: cancelled }
    ) {
      id
      owner
      inputToken
      outputToken
      minReturn
      module
      witness
      secret
      inputAmount
      vault
      bought
      auxData
      status
      createdTxHash
      executedTxHash
      cancelledTxHash
      blockNumber
      createdAt
      updatedAt
      updatedAtBlock
      updatedAtBlockHash
      data
      inputData
      handler
    }
  }
`;
exports.GET_ALL_STOP_LIMIT_ORDERS_BY_OWNER = (0, graphql_request_1.gql) `
  query getOrdersByOwner($owner: String, $module: String) {
    orders(
      first: 1000
      orderBy: updatedAtBlock
      orderDirection: desc
      where: { owner: $owner, module: $module }
    ) {
      id
      owner
      inputToken
      outputToken
      minReturn
      maxReturn
      module
      witness
      secret
      inputAmount
      vault
      bought
      auxData
      status
      createdTxHash
      executedTxHash
      cancelledTxHash
      blockNumber
      createdAt
      updatedAt
      updatedAtBlock
      updatedAtBlockHash
      data
      inputData
      handler
    }
  }
`;
