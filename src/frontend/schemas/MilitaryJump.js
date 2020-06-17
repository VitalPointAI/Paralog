export const militaryJumpSchema = {
    $id: 'https://vitalpoint.ai/militaryjump.schema.json',
    $schema: 'http://json-schema.org/draft-07/schema#',
    title: 'MilitaryJump',
    type: 'object',
    required: ['_id'],
    properties: {
      _id: {
        type: 'string',
      },
      jumper: {
        type: 'string',
      },
      jumpName: {
        type: 'string',
      },
      jumpDate: {
        type: 'integer',
        minimum: 0,
      },
      dropZone: {
        type: 'string',
      },
      dropAltitude: {
        type: 'integer',
        minimum: 0,
      },
      aircraftType: {
        type: 'string',
      },
      jumpType: {
        type: 'string',
      },
      milExitType: {
        type: 'string',
      },
      milMainCanopyType: {
        type: 'string',
      },
      milMainCanopySN: {
        type: 'string',
      },
      milResCanopyType: {
        type: 'string',
      },
      milResCanopySN: {
        type: 'string',
      },
      pullAltitude: {
        type: 'integer',
        minimum: 0,
      },
      freefall: {
        type: 'integer',
        minimum: 0,
      },
      milFFCanopyType: {
        type: 'string',
      },
      milFFCanopySN: {
        type: 'string',
      },
      milFFResCanopyType: {
        type: 'string',
      },
      milFFResCanopySN: {
        type: 'string',
      },
      jumpPhotos: {
        type: 'array',
        items: {
          },
      },
      jumpVideos: {
        type: 'string',
        contentEncoding: 'base64',
        contentMediaType: 'audio/mpeg',
      },
      verificationHash: {
        type: 'string',
      },
    },
}
   