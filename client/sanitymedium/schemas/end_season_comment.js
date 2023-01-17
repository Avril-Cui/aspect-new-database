export default {
    name: 'end_season_comment',
    title: 'end_season_comment',
    type: 'document',
    fields: [
      {
        name: 'name',
        type: 'string',
      },
      {
        name: 'approved',
        title: 'Approved',
        type: 'boolean',
        description: "Comments won't show on the site without approval",
      },
      {
        name: 'email',
        type: 'string',
      },
      {
        name: 'comment',
        type: 'text',
      }
    ],
};