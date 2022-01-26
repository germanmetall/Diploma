module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', '60c199db938a91b4e9921db8c9a0b193'),
  },
});
