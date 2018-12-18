export const userData = {
    'type': 'object',
    'properties': {
        'version': {
            'type': 'string',
            'value': 'version 1.0',
        },
        'chosenAnswers': {
            'type': 'array',
            'items': 'string',
        },
        'savedTasks': {
            'type': 'array',
            'items': 'string',
        },
        'completedTasks': {
            'type': 'array',
            'items': 'string',
        },
    },
    'required': [
        'version',
        'chosenAnswers',
        'savedTasks',
        'completedTasks',
    ],
};
