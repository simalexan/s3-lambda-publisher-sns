module.exports = (event) => {
	if (!event || !event.body) {
		return undefined;
  }
	return event.body;
};
