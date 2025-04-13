import { useState } from 'react';

function Profile() {
  const [name, setName] = useState('John Doe');
  const [email, setEmail] = useState('johndoe@example.com');

  return (
    <div className="profile">
      <h2>Profile</h2>
      <p>Name: {name}</p>
      <p>Email: {email}</p>
      <button onClick={() => alert('Edit your profile here')}>Edit Profile</button>
    </div>
  );
}

export default Profile;
