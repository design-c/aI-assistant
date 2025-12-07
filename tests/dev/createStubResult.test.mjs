import test from 'node:test';
import assert from 'node:assert/strict';
import { z } from 'zod/v4';
import { createStubResult, stubOutputSchema } from '../../src/index.mjs';

test('createStubResult wraps tool name, args and text content correctly', () => {
    const args = {
        directory: '/repo',
        fullScan: true,
    };

    const result = createStubResult('index', args);

    assert.deepEqual(result.structuredContent, {
        tool: 'index',
        stub: true,
        message: 'index executed successfully.',
        receivedArgs: args,
    });

    assert.ok(Array.isArray(result.content));
    assert.equal(result.content[0].type, 'text');

    const parsed = JSON.parse(result.content[0].text);
    assert.deepEqual(parsed, result.structuredContent);
});

test('createStubResult output matches stubOutputSchema via zod', () => {
    const schema = z.object(stubOutputSchema);

    const result = createStubResult('semantic_search', {
        query: 'find controllers',
        limit: 5,
    });

    schema.parse(result.structuredContent);
});
