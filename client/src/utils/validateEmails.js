const emailRegex =
  // eslint-disable-next-line
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const validateEmails = (emails) => {
  // split emails, remove spaces, return invalid ones
  const invalidEmails = emails
    .split(",")
    .map((email) => email.trim())
    .filter((email) => emailRegex.test(email) === false);

  if (invalidEmails.length) return `These emails are invalid ${invalidEmails}`;
  return null;
};

export default validateEmails;
