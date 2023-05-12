const lowerCaseHandler = (body) => {
  const newBody = {};
  for (const key in body) {
    const lowerCaseKey = key.toLowerCase();
    newBody[lowerCaseKey] = body[key];
  }
  return newBody;
};

module.exports = { lowerCaseHandler };
