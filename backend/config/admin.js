module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', '0823bb6c030ad940eacd25330024bc9e'),
  },
});
