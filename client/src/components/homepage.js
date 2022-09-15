const Homepage = () => {
  return (<>
    <main className="homepage-wrapper">
      <div className="homepage-container">
        <h1 className="homepage-title" >I Got There First</h1>
        <div className="homepage-intro">
          <h3>Are You A Trendsetter? Prove it!</h3>
          <p> Add Discoveries and tag them with your comments</p>
          <p> Dates are automatically added to your comments to timestamp when you first heard about the next big thing!</p>
          <p> View our current discoveries <a href="/discoveries">Here.</a>   </p>
          <p> Or Register to add your own <a href="/register">Here.</a>   </p>
        </div>
      </div>
    </main>
  </>)
}

export default Homepage