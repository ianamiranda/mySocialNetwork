function Home() {
    return (
      <div className="home">
        <h2>Welcome to the Social Network!</h2>
        <button onClick={() => alert('This button will let you post something!')}>
          Post something
        </button>
      </div>
    );
  }
  
  export default Home;
  