export const announcementObject = {
    'type': 'object',
    'properties': {
        'id': { 'type': 'string' },
        'heading': { 'type': 'string' },
        'content': { 'type': 'string' },
    },
    'required': ['id', 'heading', 'content'],
};

export const announcementArray = {
    'type': 'array',
    'items': announcementObject,
};
