export default async (req, res) => {
  const { requestHandler } = await import('../dist/src/server/server.mjs');
  return requestHandler(req, res);
};
