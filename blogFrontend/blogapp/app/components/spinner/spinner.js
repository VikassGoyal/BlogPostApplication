export  default function Spinner(){
    return(
        <div style={spinnerStyles.container}>
            <div style={spinnerStyles.spinner}></div>
        </div>

    )
}
const spinnerStyles = {
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
    },
    spinner: {
      border: '8px solid #f3f3f3',
      borderTop: '8px solid #3498db',
      borderRadius: '50%',
      width: '50px',
      height: '50px',
      animation: 'spin 2s linear infinite',
    },
  };
  