import { mockClient } from "aws-sdk-client-mock";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { describe, it, expect, beforeEach } from "vitest";
import { PutCommand } from "@aws-sdk/lib-dynamodb";
import { createItem } from "./dynamo";

const ddbMock = mockClient(DynamoDBDocumentClient);

beforeEach(() => {
  ddbMock.reset();
});

describe("CRUD unit tests with mock", () => {
  it("createItem returns the same item", async () => {
    ddbMock.on(PutCommand).resolves({}); // dynamodb put command returns a {} when successful

    const item = { id: "1", username: "superman35" };

    const output = await createItem("Test", item);

    expect(output).toEqual(item);
  });

  // write more tests here
});
