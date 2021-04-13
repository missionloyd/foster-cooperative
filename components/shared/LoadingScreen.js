import LoadingSpinner from './LoadingSpinner';

function Loading() {
  return(
    <center>
      <div>
        <img 
          src='/spock.gif'
          alt=''
          style={{ marginBottom: 10 }}
          height={200}
        />
        <LoadingSpinner />
      </div>
    </center>
  );
}

export default Loading;