const express = require('express');
const router = express.Router({ mergeParams: true }); //for nested routes 3shan awl wa7da hy2abla hwa l hysht8l 3leeha

const { createMessage, deleteMessage, getMessage } = require('../handlers/messages');

// prefix - /api/users/:id/messages
router.route('/').post(createMessage);

// prefix - /api/users/:id/messages/:message_id
router.route('/:message_id').get(getMessage).delete(deleteMessage);

module.exports = router;
