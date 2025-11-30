import test from 'node:test';
import assert from 'node:assert/strict';
import { createStubResult } from '../../src/index.mjs';

const tools = [
    'index',
    'clean_index',
    'get_graph',
    'get_graph_stats',
    'get_graph_health',
    'list_file_entities',
    'list_entity_relationships',
    'semantic_search',
    'query',
    'analyze_code_impact',
    'detect_code_clones',
];

for (const toolName of tools) {
    test(`tool ${toolName} returns consistent stub contract`, () => {
        const args = { example: `args for ${toolName}` };

        const result = createStubResult(toolName, args);

        assert.equal(result.structuredContent.tool, toolName);
        assert.equal(result.structuredContent.stub, true);
        assert.match(result.structuredContent.message, /executed successfully/);
        assert.deepEqual(result.structuredContent.receivedArgs, args);
    });
}
