const NotFound = () => {
  return (
    <>
      <div className="error-page">
        <h1>Sorry, the page you are looking for does not exist.</h1>
        <h2> </h2>
        <div className="error-page-more-info">
          <h3>Create An Account <a href="/register">Here.</a></h3>
          <h3>Already Have One? Log In Here <a href="/login">Here.</a>  </h3>
          <h3>Or View Our Discoveries <a href="/discoveries">Here.</a>  </h3>
        </div>

      </div>
    </>
  )
}

export default NotFound