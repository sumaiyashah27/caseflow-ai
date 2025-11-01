import { Client } from '@elastic/elasticsearch';

const node = process.env.ELASTICSEARCH_NODE || 'http://localhost:9200';
const indexName = process.env.ELASTICSEARCH_INDEX || 'caseflow_docs';

export const es = new Client({ node });

export async function ensureIndex() {
  const exists = await es.indices.exists({ index: indexName });
  if (!exists) {
    await es.indices.create({
      index: indexName,
      body: {
        mappings: {
          properties: {
            title: { type: 'text' },
            content: { type: 'text' },
            status: { type: 'keyword' },
            case_id: { type: 'integer' }
          }
        }
      }
    });
  }
}

export async function indexDocument(doc: any) {
  await es.index({ index: indexName, id: String(doc.id), document: doc, refresh: 'wait_for' });
}

export async function search(q: string) {
  if (!q) return [];
  const { hits } = await es.search({
    index: indexName,
    query: {
      multi_match: { query: q, fields: ['title^2', 'content'] }
    },
    size: 20
  });
  return hits.hits.map((h: any) => ({ id: h._id, score: h._score, ...h._source }));
}
