const Loading = ({ data, handleClick=()=>{} }) => {
  return (
    <div onClick={handleClick} style={styles.overlay}>
      <div style={styles.container}>
        <div style={styles.wrapper}>
          <img alt="modal-popup" src={data} height={300} width={600} style={{objectFit: "contain"}} />
        </div>
      </div>
    </div>
  );
}

export default Loading;

const styles = {
  overlay: {position: "absolute", zIndex: 999998, width: "100vw", height: "100vh", backgroundColor: "rgba(0,0,0,0.5)"},
  container: {position: "absolute", zIndex: 999999, width: "100vw", height: "100vh"},
  wrapper: {display: "flex", width: "100vw", height: "100vh", justifyContent: "center", alignItems: "center"}
}
