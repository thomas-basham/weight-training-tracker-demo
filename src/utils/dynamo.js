import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  ScanCommand,
  PutCommand,
  DeleteCommand,
  UpdateCommand,
} from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({
  region: import.meta.env.VITE_AWS_REGION,
  credentials: {
    accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY_ID,
    secretAccessKey: import.meta.env.VITE_AWS_SECRET_ACCESS_KEY,
  },
});

const docClient = DynamoDBDocumentClient.from(client);

export const listAllItems = async (tableName) => {
  try {
    const command = new ScanCommand({ TableName: tableName });
    const response = await docClient.send(command);
    console.log(response);

    return response.Items;
  } catch (err) {
    console.log(err.message);
  }
};

export const createItem = async (tableName, item) => {
  const command = new PutCommand({ TableName: tableName, Item: item });
  const response = await docClient.send(command);

  console.log(response);
};

// export const deleteTodoById = async (id) => {
//   const command = new DeleteCommand({
//     TableName: TABLE_NAME,
//     Key: {
//       id: id,
//     },
//   });

//   const response = await docClient.send(command);
//   console.log(response);
//   return response;
// };

// export const updateTodo = async (todo) => {
//   const { id, TodoText, IsComplete } = todo;

//   const command = new UpdateCommand({
//     TableName: TABLE_NAME,
//     Key: { id },
//     UpdateExpression: "SET #TodoText = :TodoText, #IsComplete = :IsComplete",

//     // Best practice to use place holders
//     ExpressionAttributeNames: {
//       "#TodoText": "TodoText",
//       "#IsComplete": "IsComplete",
//     },

//     ExpressionAttributeValues: {
//       ":TodoText": TodoText,
//       ":IsComplete": IsComplete,
//     },

//     // ReturnValues: "ALL_NEW",
//   });

//   const { Attributes } = await docClient.send(command);
//   console.log(Attributes);
//   return Attributes;
// };
