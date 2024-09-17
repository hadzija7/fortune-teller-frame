import { Syncopate } from 'next/font/google'
const syncopate = Syncopate({
  weight: "700",
  subsets: ["latin"],
});


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
          className={syncopate.className}
          style={{
            display: 'flex',
            padding: '10px',
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            color: '#00F6FF',
            fontSize: '35px',
            marginTop: '30px',
            overflow: 'auto'
          }}
        >
          <p style={{ margin: '0 auto', textAlign: 'center', width: '60%' }}>{message}</p>
        </div>
      )}
    </div>
  );
}