import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod/v4';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

export const stubOutputSchema = {
    tool: z.string(),
    stub: z.boolean(),
    message: z.string(),
    receivedArgs: z.any(),
};

export function createStubResult(toolName, args) {
    const output = {
        tool: toolName,
        stub: true,
        message: `${toolName} executed successfully.`,
        receivedArgs: args || {},
    };

    return {
        content: [
            {
                type: 'text',
                text: JSON.stringify(output, null, 2),
            },
        ],
        structuredContent: output,
    };
}

export function buildServer() {
    const server = new McpServer({
        name: 'code-graph',
        version: '0.0.1',
    });

    server.registerTool(
        'index',
        {
            title: 'Index Codebase',
            description: 'Stub implementation of the main indexing tool.',
            inputSchema: {
                directory: z.string(),
                incremental: z.boolean().optional(),
                fullScan: z.boolean().optional(),
                reset: z.boolean().optional(),
            },
            outputSchema: stubOutputSchema,
        },
        async (args) => createStubResult('index', args),
    );

    server.registerTool(
        'clean_index',
        {
            title: 'Clean Index',
            description: 'Stub that simulates clean index: reset + full reindex.',
            inputSchema: {},
            outputSchema: stubOutputSchema,
        },
        async (args) => createStubResult('clean_index', args),
    );

    server.registerTool(
        'get_graph',
        {
            title: 'Get Graph',
            description: 'Stub that returns a fake graph snapshot.',
            inputSchema: {
                limit: z.number().int().positive().optional(),
            },
            outputSchema: stubOutputSchema,
        },
        async (args) => createStubResult('get_graph', args),
    );

    server.registerTool(
        'get_graph_stats',
        {
            title: 'Get Graph Stats',
            description: 'Stub that returns fake graph statistics.',
            inputSchema: {},
            outputSchema: stubOutputSchema,
        },
        async (args) => createStubResult('get_graph_stats', args),
    );

    server.registerTool(
        'get_graph_health',
        {
            title: 'Get Graph Health',
            description: 'Stub that simulates graph health diagnostics.',
            inputSchema: {},
            outputSchema: stubOutputSchema,
        },
        async (args) => createStubResult('get_graph_health', args),
    );

    server.registerTool(
        'list_file_entities',
        {
            title: 'List File Entities',
            description: 'Stub that lists entities for a given file path.',
            inputSchema: {
                filePath: z.string(),
            },
            outputSchema: stubOutputSchema,
        },
        async (args) => createStubResult('list_file_entities', args),
    );

    server.registerTool(
        'list_entity_relationships',
        {
            title: 'List Entity Relationships',
            description: 'Stub that lists relationships for a given entity.',
            inputSchema: {
                entityName: z.string(),
                relationshipTypes: z.array(z.string()).optional(),
            },
            outputSchema: stubOutputSchema,
        },
        async (args) => createStubResult('list_entity_relationships', args),
    );

    server.registerTool(
        'semantic_search',
        {
            title: 'Semantic Search',
            description: 'Stub that performs semantic search over the codebase.',
            inputSchema: {
                query: z.string(),
                limit: z.number().int().positive().optional(),
            },
            outputSchema: stubOutputSchema,
        },
        async (args) => createStubResult('semantic_search', args),
    );

    server.registerTool(
        'query',
        {
            title: 'Query Graph',
            description: 'Stub that executes a generic text-based query.',
            inputSchema: {
                query: z.string(),
            },
            outputSchema: stubOutputSchema,
        },
        async (args) => createStubResult('query', args),
    );

    server.registerTool(
        'analyze_code_impact',
        {
            title: 'Analyze Code Impact',
            description: 'Stub that analyzes the impact of changing a given entity or file.',
            inputSchema: {
                entityName: z.string(),
                filePath: z.string().optional(),
                changeDescription: z.string().optional(),
            },
            outputSchema: stubOutputSchema,
        },
        async (args) => createStubResult('analyze_code_impact', args),
    );

    server.registerTool(
        'detect_code_clones',
        {
            title: 'Detect Code Clones',
            description: 'Stub that detects structural/semantic code clones in the project.',
            inputSchema: {
                path: z.string().optional(),
                minLines: z.number().int().positive().optional(),
            },
            outputSchema: stubOutputSchema,
        },
        async (args) => createStubResult('detect_code_clones', args),
    );

    return server;
}

async function main() {
    const server = buildServer();
    const transport = new StdioServerTransport();
    await server.connect(transport);
}

const isMainModule = fileURLToPath(import.meta.url) === path.resolve(process.argv[1]);

if (isMainModule) {
    main().catch((err) => {
        console.error('Fatal error', err);
    });
}
