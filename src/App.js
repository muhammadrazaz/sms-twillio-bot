import './App.css'
import AuthProvider from './Provider/AuthProvider';
import Routes from './Routes/index';
import RightBarProvider from './Context/RightBarContext';
import MultiSelectProvider from './Context/MultiSelectProvider';
function App() {
  return (

    <AuthProvider>
      <RightBarProvider>
        <MultiSelectProvider>
        <Routes />
        </MultiSelectProvider>
      </RightBarProvider>
      
    </AuthProvider>

  );
}

export default App;
