export const alertObject = {
    'type': 'object',
    'properties': {
        'id': { 'type': 'string' },
        'heading': { 'type': 'string' },
        'content': { 'type': 'string' },
    },
    'required': ['id', 'heading', 'content'],
};

export const alertArray = {
    'type': 'array',
    'items': alertObject,
};
