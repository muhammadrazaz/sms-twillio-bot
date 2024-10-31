import './App.css'
import AuthProvider from './Provider/AuthProvider';
import RightBarProvider from './Provider/RightBarProvider';
import ApiProvider from './Provider/ApiProvider';
import Routes from './Routes/index';


import MultiSelectProvider from './Context/MultiSelectProvider';
function App() {
  return (

    <AuthProvider>
      
      <ApiProvider>
      <RightBarProvider>
        <MultiSelectProvider>
          <Routes />
        </MultiSelectProvider>
      </RightBarProvider>
      </ApiProvider>


    </AuthProvider>

  );
}

export default App;
