const UserView = ({ user }) => {
  if (!user) {
    return null;
  }

  return (
    <div>
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      <ul>
        {user.blogs.map((b) => {
          return <li key={b.id}>{b.title}</li>;
        })}
      </ul>
    </div>
  );
};

export default UserView;
