export const dropZoneSchema = {
    $id: 'https://example.com/dropzone.schema.json',
    $schema: 'http://json-schema.org/draft-07/schema#',
    title: 'DropZone',
    type: 'object',
    required: ['_id'],
    properties: {
      _id: {
        type: 'string',
      },
      name: {
        type: 'string',
      },
      latitude: {
        type: 'string',
      },
      longitude: {
        type: 'string',
      },
      city: {
        type: 'string',
      },
    },
}