const registerRoute = `${process.env.REACT_APP_API_HOST}/api/auth/register`;
const loginRoute = `${process.env.REACT_APP_API_HOST}/api/auth/login`;
const setAvatarRoute = `${process.env.REACT_APP_API_HOST}/api/auth/set-avatar`;
const allUsersRoute = `${process.env.REACT_APP_API_HOST}/api/auth/all-users`;
const sendMessageRoute = `${process.env.REACT_APP_API_HOST}/api/messages/add-message`;
const getAllMessagesRoute = `${process.env.REACT_APP_API_HOST}/api/messages/all-messages`;

export { registerRoute, loginRoute, setAvatarRoute, allUsersRoute, sendMessageRoute, getAllMessagesRoute };
