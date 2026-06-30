export default async (req, res) => {
  const { reqHandler } = await import('../dist/src/server/server.mjs');
  return reqHandler(req, res);
};
