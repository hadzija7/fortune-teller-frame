export function FortuneCard({ message, image }: { message: string; image?: string }) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      width: '1200px',
      height: '1200px',
      background: `black`,
      textAlign: 'center',
      alignItems: 'center',
    }}>
      <img src={image} alt="" style={{
        width: '800px',
        height: '800px',
        marginTop: '100px'
      }}/>
      {message && (
        <div
          style={{
            display: 'flex',
            padding: '10px',
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            color: '#00F6FF',
            fontFamily: 'Roboto, sans-serif',
            fontWeight: 'bolder',
            fontSize: '30px',
            marginTop: '30px',
          }}
        >
          <p style={{ margin: '0 auto', textAlign: 'center', width: '60%' }}>{message}</p>
        </div>
      )}
    </div>
  );
}